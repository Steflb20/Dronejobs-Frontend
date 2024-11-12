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

        stage("Deploy") {
            steps {
                sh "rm /var/www/virtual/kadrone1/html/*"
                sh "mv build/* /var/www/virtual/kadrone1/html/"
            }
        }
    }
}