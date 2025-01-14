pipeline {
    agent any

    tools {
        nodejs 'NODE23'  // Ensures the right Node.js version is available
    }

    environment {
        CI = false  // Disables the CI flag if needed
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
                // Start the server in the background and wait for it to be ready
                sh 'nohup npm start &'

                // Optionally, wait for the server to fully start
                echo 'Waiting for the server to be available...'
                sleep 10  // Adjust as needed to ensure the server is up
            }
        }

        stage('Cypress E2E') {
            steps {
                echo 'Running Cypress tests...'
                // Run Cypress tests
                sh 'npm run e2e'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying build to the server...'
                // Remove old build files
                sh 'rm -r /var/www/virtual/kadrone1/html/*'
                // Move the new build to the deployment directory
                sh 'mv build/* /var/www/virtual/kadrone1/html/'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up after pipeline...'
            // Any additional cleanup can go here
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
