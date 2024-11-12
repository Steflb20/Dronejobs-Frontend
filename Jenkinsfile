pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'echo test'
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