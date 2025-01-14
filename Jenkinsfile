pipeline {
    agent any

    tools {
        nodejs 'NODE23'
    }

    environment {
        CI=false
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Project')  {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'rm -r /var/www/virtual/kadrone1/html/*'
                sh 'mv build/* /var/www/virtual/kadrone1/html/'
            }
        }

    }
}
