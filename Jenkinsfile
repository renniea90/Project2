pipeline {
    agent any
    stages {
        stage('Build Front End') {
            steps {
                dir('front_end') { // Avoid spaces in folder names
                    bat '''
                    npm install
                    npm run build
                    '''
                    echo 'Deploying Front End'
                }
            }
        }

        stage('Build Stockroom') {
            steps {
                dir('back_end/LegacyCodeItems') { // Navigate to items directory
                    echo 'Installing Items Dependencies'
                    bat '''
                    mvn clean install
                    '''
                    echo 'Deploying Items'
                }
            }
        }

        stage('Build Cart') {
            steps {
                dir('back_end/LegacyCodeCart') { // Navigate to Cart directory
                    echo 'Installing Cart Dependencies'
                    bat '''
                    mvn clean install
                    '''
                    echo 'Deploying Cart'
                }
            }
        }

        stage('Build Payments (Stripe)') {
            steps {
                dir('back_end/stripe-payment') { // Navigate to Stripe location
                    echo 'Building Stripe payment interface'
                    bat '''
                    mvn clean install
                    '''
                }
            }
        }
    }
}
