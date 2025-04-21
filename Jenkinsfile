pipeline {
  agent {
    docker {
      image 'node:18'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

  environment {
    BACKEND_URL = 'http://backend:1000'
    DOCKER_REGISTRY = 'your-registry' // Optional for production
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'master', url: 'https://github.com/Monalishamona/devops-ci-cdd'
      }
    }

    stage('Install & Test') {
      parallel {
        stage('Frontend') { ... }
        stage('Backend') { ... }
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
    failure {
      slackSend channel: '#devops', message: "Pipeline Failed"
    }
  }
}