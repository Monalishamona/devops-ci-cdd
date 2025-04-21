pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        BACKEND_URL = 'http://backend:1000'
        DOCKER_REGISTRY = 'your-registry'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Monalishamona/devops-ci-cdd'
            }
        }

        stage('Install & Test') {
            parallel {
                stage('Frontend') {
                    steps {
                        sh 'npm install --prefix frontend'
                        sh 'npm test --prefix frontend'
                    }
                }
                stage('Backend') {
                    steps {
                        sh 'npm install --prefix backend'
                        sh 'npm test --prefix backend'
                    }
                }
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t frontend-image:${GIT_COMMIT_SHORT_SHA} ./frontend'
                sh 'docker build -t backend-image:${GIT_COMMIT_SHORT_SHA} ./backend'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down --remove-orphans'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}