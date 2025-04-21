pipeline {
    agent any

    

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the 'main' branch
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install frontend dependencies
                sh 'npm install --prefix frontend'
                // Install backend dependencies
                sh 'npm install --prefix backend'
            }
        }

        stage('Run Tests') {
            steps {
                // Run frontend tests
                sh 'npm test --prefix frontend'
                // Run backend tests
                sh 'npm test --prefix backend'
            }
        }

        stage('Build Docker Images') {
            steps {
                // Build Docker image for frontend
                sh 'docker build -t frontend-image ./frontend'
                // Build Docker image for backend
                sh 'docker build -t backend-image ./backend'
            }
        }

        stage('Deploy Containers') {
            steps {
                // Deploy containers using Docker Compose
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            // Optional: Clean up unused Docker resources
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