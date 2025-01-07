pipeline {
    agent any


    tools {
        nodejs 'NODE23'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Locally') {
            steps {
                sh 'npm run start'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npm run e2e'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy on Server') {
            steps {
                sh 'mkdir ~/test_uwu_123'
                sh 'mv build ~/test_uwu_123'
            }
        }
    }

    post {
        success {
            echo 'Build and Deploy succeeded!'
        }
        failure {
            echo 'Build or Deploy failed!'
        }
    }
}