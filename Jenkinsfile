pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                dir('Frontend/LegacyFrontEnd') {
                    bat '''
                    npm install
                    npm run build
                    pm2 delete LegacyFrontEnd || exit 0
                    pm2 start npm --name "LegacyFrontEnd" -- start
                    '''
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
                }
            }
        }

        stage('Build Stripe') {
            steps {
                dir('Backend/stripe-payment') {
                    echo 'Installing stripe-payment'
                    bat '''
                    mvn clean install
                    pm2 delete stripe-payment || exit 0
                    pm2 start java --name "stripe-payment" -- -jar target/stripe-payment-app.jar
                    '''
                }
            }
        }

        stage('Test') {
            steps {
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
                if not exist C:\\Users\\User\\Desktop\\Project2TESTEnv\\ (mkdir C:\\Users\\User\\Desktop\\Project2TESTEnv\\)
                if not exist C:\\Users\\User\\Desktop\\Project2TESTEnv\\backend (mkdir C:\\Users\\User\\Desktop\\Project2TESTEnv\\backend)
                xcopy Frontend\\LegacyFrontEnd\\build C:\\Users\\User\\Desktop\\Project2TESTEnv\\frontend /E /I /Y || echo xcopy failed
                xcopy Backend\\LegacyCodeItems\\target\\*.jar C:\\Users\\User\\Desktop\\Project2TESTEnv\\backend /Y || echo xcopy failed
                xcopy Backend\\LegacyCodeCart\\target\\*.jar C:\\Users\\User\\Desktop\\Project2TESTEnv\\backend /Y || echo xcopy failed
                xcopy Backend\\stripe-payment\\target\\*.jar C:\\Users\\User\\Desktop\\Project2TESTEnv\\backend /Y || echo xcopy failed
                '''
            }
        }

        stage('Deploy to Production') {
            steps {
                input message: 'Deploy to Production?', ok: 'Deploy'
                echo 'Deploying to Production Environment'
                bat '''
                if not exist C:\\Users\\User\\Desktop\\Project2PRODEnv\\ (mkdir C:\\Users\\User\\Desktop\\Project2PRODEnv\\)
                if not exist C:\\Users\\User\\Desktop\\Project2PRODEnv\\backend (mkdir C:\\Users\\User\\Desktop\\Project2PRODEnv\\backend)
                xcopy Frontend\\LegacyFrontEnd\\build C:\\Users\\User\\Desktop\\Project2PRODEnv\\frontend /E /I /Y || echo xcopy failed
                xcopy Backend\\LegacyCodeItems\\target\\*.jar C:\\Users\\User\\Desktop\\Project2PRODEnv\\backend /Y || echo xcopy failed
                xcopy Backend\\LegacyCodeCart\\target\\*.jar C:\\Users\\User\\Desktop\\Project2PRODEnv\\backend /Y || echo xcopy failed
                xcopy Backend\\stripe-payment\\target\\*.jar C:\\Users\\User\\Desktop\\Project2PRODEnv\\backend /Y || echo xcopy failed
                '''
            }
        }
    }
}
