pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t ev-smartcharge-frontend ./frontend'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t ev-smartcharge-backend ./backend'
            }
        }

       stage('Deploy') {
    steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d --build'
    }
}

    post {
        success {
            echo 'EV SmartCharge deployed successfully!'
        }

        failure {
            echo 'Deployment failed. Check Jenkins console.'
        }
    }

}