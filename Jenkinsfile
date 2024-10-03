pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                dir('Frontend/LegacyFrontEnd') {
                    bat '''
                    npm install
                    npm run build
                    pm2 delete LegacyFrontEnd || true
                    pm2 start npm --name "LegacyFrontEnd" -- start
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
                    pm2 delete stripe-payment || true
                    pm2 start java --name "stripe-payment" -- -jar target/stripe-payment-app.jar
                    '''
                    echo 'Deploying Stripe'
                }
            }
        }

        stage('Test') {
            steps {
                // Make sure to test in each directory containing a pom.xml
                dir('Backend/LegacyCodeItems') {
                    bat 'mvn test'
                }
                dir('Backend/LegacyCodeCart') {
                    bat 'mvn test'
                }
                dir('Backend/stripe-payment') {
                    bat 'mvn test'
                }
            }
        }

        stage('Deploy to Testing') {
            steps {
                echo 'Deploying to Testing Environment'
                bat '''
                xcopy Frontend\\LegacyFrontEnd\\build C:\\Users\\User\\Desktop\\Project2TESTEnv\\frontend /E /I /Y
                xcopy Backend\\LegacyCodeItems\\target\\*.jar C:\\Users\\User\\Desktop\\Project2TESTEnv\\backend /Y
                xcopy Backend\\LegacyCodeCart\\target\\*.jar C:\\Users\\User\\Desktop\\Project2TESTEnv\\backend /Y
                xcopy Backend\\stripe-payment\\target\\*.jar C:\\Users\\User\\Desktop\\Project2TESTEnv\\backend /Y
                '''
            }
        }

        stage('Deploy to Production') {
            steps {
                input message: 'Deploy to Production?', ok: 'Deploy'
                echo 'Deploying to Production Environment'
                bat '''
                xcopy Frontend\\LegacyFrontEnd\\build C:\\Users\\User\\Desktop\\Project2PRODEnv\\frontend /E /I /Y
                xcopy Backend\\LegacyCodeItems\\target\\*.jar C:\\Users\\User\\Desktop\\Project2PRODEnv\\backend /Y
                xcopy Backend\\LegacyCodeCart\\target\\*.jar C:\\Users\\User\\Desktop\\Project2PRODEnv\\backend /Y
                xcopy Backend\\stripe-payment\\target\\*.jar C:\\Users\\User\\Desktop\\Project2PRODEnv\\backend /Y
                '''
            }
        }
    }
}
