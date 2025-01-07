pipeline {
    agent any

    tools {
        nodejs 'NODE23'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Run Locally') {
            steps {
                echo 'Starting the application...'
                sh '''
                    # Start the app in the background
                    npm run start &
                    # Save the process ID to a file for later termination
                    echo $! > .app_pid
                '''
            }
        }
        stage('E2E Tests') {
            steps {
                echo 'Executing end-to-end tests...'
                sh 'npm run e2e'
            }
        }
        stage('Stop Local Server') {
            steps {
                echo 'Stopping the local server...'
                sh '''
                    # Kill the server process using the saved PID
                    if [ -f .app_pid ]; then
                        kill $(cat .app_pid) || true
                        rm .app_pid
                    fi
                '''
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm run build'
            }
        }
        stage('Deploy on Server') {
            steps {
                echo 'Deploying application to server...'
                sh '''
                    DEPLOY_DIR=~/test_uwu_123
                    mkdir -p $DEPLOY_DIR
                    cp -r build/* $DEPLOY_DIR/
                '''
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
        cleanup {
            echo 'Cleaning up resources...'
            sh '''
                if [ -f .app_pid ]; then
                    kill $(cat .app_pid) || true
                    rm .app_pid
                fi
            '''
        }
    }
}
