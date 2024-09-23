pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls the latest code from the repository
                checkout scm /* Takes latest code from GitHub repo set up in Jenkins configuration */
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('LegacyFrontEnd') {
                    // Installs dependencies for the frontend
                    bat 'npm install'
                }
            }
        }

        stage('Start Development Server') {
            steps {
                dir('LegacyFrontEnd') {
                    // Starts the React development server
                    bat 'npm start' // Starts the server on localhost:3000 by default
                }
            }
        }
    }
}
