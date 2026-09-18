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

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withCredentials([
                        string(
                            credentialsId: 'sonarqube-token',
                            variable: 'SONAR_TOKEN'
                        )
                    ]) {
                        withSonarQubeEnv(
                            installationName: 'SonarQube',
                            envOnly: true
                        ) {
                            bat "\"${scannerHome}\\bin\\sonar-scanner.bat\" -Dsonar.projectKey=Streaming-Platform-React -Dsonar.projectName=\"Streaming Platform React\" -Dsonar.sources=src"
                        }
                    }
                }
            }
        }

        stage('Prepare Environment') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'react-env',
                        variable: 'REACT_ENV_CONTENT'
                    )
                ]) {
                    bat 'echo %REACT_ENV_CONTENT% > .env'
                }
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

        stage('Docker Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {

                    bat 'echo %DOCKERHUB_TOKEN%| docker login -u %DOCKERHUB_USERNAME% --password-stdin'

                    bat 'docker tag streaming-platform-react:%BUILD_NUMBER% %DOCKERHUB_USERNAME%/streaming-platform-react:%BUILD_NUMBER%'

                    bat 'docker tag streaming-platform-react:%BUILD_NUMBER% %DOCKERHUB_USERNAME%/streaming-platform-react:latest'

                    bat 'docker push %DOCKERHUB_USERNAME%/streaming-platform-react:%BUILD_NUMBER%'

                    bat 'docker push %DOCKERHUB_USERNAME%/streaming-platform-react:latest'

                    bat 'docker logout'
                }
            }
        }
    }

    post {
        always {
            bat 'if exist .env del /q .env'
            bat 'if exist streaming-platform-react.tar del /q streaming-platform-react.tar'
        }

        success {
            echo 'CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD pipeline failed. Check the console output.'
        }
    }
}
