pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('E2E') {
            steps {
                sh "npx cypress run"
            }
        }
    }
}