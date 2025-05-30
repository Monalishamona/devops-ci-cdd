pipeline {
    agent {
        docker {
            image 'node:18-bullseye'
            args '-v /var/run/docker.sock:/var/run/docker.sock --privileged'
        }
    }

    environment {
        DOCKER_REGISTRY = 'Monalishaa'
        GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }

    stages {
        stage('Setup') {
            steps {
                sh '''
                    apt-get update
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

        // Add your other stages here (Install & Test, Build Images, Deploy)
    }

    post {
        always {
            script {
                node('') {  // Fixed: Added empty label parameter
                    cleanWs()
                    sh 'docker system prune -f'
                }
            }
        }
        failure {
            script {
                node('') {  // Fixed: Added empty label parameter
                    slackSend channel: '#ci-alerts', 
                             message: "Build Failed: ${env.BUILD_URL}"
                }
            }
        }
    }
}
