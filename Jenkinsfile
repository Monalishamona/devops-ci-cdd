pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'Monalishaa'
        GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', 
                url: 'https://github.com/Monalishamona/devops-ci-cdd.git'
            }
        }

        stage('Install & Test') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                            sh 'npm run test'
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                            sh 'npm run test'
                        }
                    }
                }
            }
        }

        stage('Build Images') {
            steps {
                script {
                    docker.build("frontend:${env.GIT_COMMIT_SHORT}", "./frontend")
                    docker.build("backend:${env.GIT_COMMIT_SHORT}", "./backend")
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down --remove-orphans'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            cleanWs()
            sh 'docker system prune -f'
        }
        failure {
            slackSend channel: '#ci-alerts', 
                     message: "Build Failed: ${env.BUILD_URL}"
        }
    }
}