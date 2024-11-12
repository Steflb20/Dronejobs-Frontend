pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Heyy'
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