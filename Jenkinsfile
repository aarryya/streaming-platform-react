pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test -- --watchAll=false --passWithNoTests'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t streaming-platform-react:%BUILD_NUMBER% .'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                bat 'docker save streaming-platform-react:%BUILD_NUMBER% -o streaming-platform-react.tar'
                bat 'docker run --rm -v "%WORKSPACE%:/work" aquasec/trivy:latest image --input /work/streaming-platform-react.tar --timeout 15m'
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD pipeline failed. Check the console output.'
        }
    }
}
