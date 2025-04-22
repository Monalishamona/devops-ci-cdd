pipeline {
    agent {
        docker {
            image 'node:18-bullseye'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker'
        }
    }

    environment {
        DOCKER_REGISTRY = 'Monalishaa'
        GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }

    stages {
        stage('Setup Tools') {
            steps {
                sh '''
                    apt-get update -y
                    apt-get install -y docker-compose-plugin
                '''
            }
        }

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
                sh "docker build -t ${DOCKER_REGISTRY}/frontend:${GIT_COMMIT_SHORT} ./frontend"
                sh "docker build -t ${DOCKER_REGISTRY}/backend:${GIT_COMMIT_SHORT} ./backend"
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose -f docker-compose.yml down --remove-orphans'
                sh 'docker compose -f docker-compose.yml up -d --build'
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