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

        stage('Build Items') {
            steps {
                dir('Backend/LegacyCodeItems') { 
                    echo 'Installing Items'
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
                    echo 'Installing Cart'
                    bat '''
                    mvn clean install
                    '''
                    echo 'Deploying Cart'
                }
            }
        }

        stage('Build Stripe') {
            steps {
                dir('Backend/stripe-payment') { 
                    echo 'Installing stripe-payment'
                    bat '''
                    mvn clean install
                    '''
                    echo 'Deploying Stripe'
                }
            }
        }
    }
}
