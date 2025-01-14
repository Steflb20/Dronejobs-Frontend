pipeline {
    agent any

    tools {
        nodejs 'NODE23'
    }

    environment {
        CI = false
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                echo 'Building project...'
                sh 'npm run build'
            }
        }

        stage('Start Application Server') {
            steps {
                echo 'Starting application server...'
                sh 'nohup npm run start &'

                echo 'Waiting for the server to be available...'
                sleep 10
            }
        }

        stage('Cypress E2E') {
            steps {
                echo 'Running Cypress tests...'
                sh 'npm run e2e'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying build to the server...'
                sh 'rm -r /var/www/virtual/kadrone1/html/*'
                sh 'mv build/* /var/www/virtual/kadrone1/html/'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up after pipeline...'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
