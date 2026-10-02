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

                bat 'docker build -t ev-smartcharge-frontend ./frontend'

            }

        }


        stage('Build Backend') {

            steps {

                bat 'docker build -t ev-smartcharge-backend ./backend'

            }

        }


        stage('Deploy') {

            steps {

                bat 'docker compose down || exit 0'

                bat 'docker compose up -d --build'

            }

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