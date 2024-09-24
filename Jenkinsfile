pipeline {
    agent any
    stages {
        stage('Build Frontend') {
            steps {
                dir('Frontend/LegacyFrontEnd') { 
                    bat '''
                    npm install
                    npm run build
                    '''
                    echo 'Deploying Frontend'
                }
            }
        }

        stage('Build Stockroom') {
            steps {
                dir('Backend/LegacyCodeItems') { 
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
                dir('Backend/LegacyCodeCart') {
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
                dir('Backend/stripe-payment') { 
                    echo 'Building Stripe payment interface'
                    bat '''
                    mvn clean install
                    '''
                }
            }
        }
    }
}
