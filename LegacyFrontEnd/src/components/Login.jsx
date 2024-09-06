// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CustomAlert from './CustomAlert';
// import { useLogin } from './UserContext';

// const Login = () => {
    
//     const [userDetails, setUserdetails] = useState([]);
//     const [name, setName] = useState('');
//     const [city, setCity] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState(''); 
//     const [role, setRole] = useState(''); 
//     const [showAlert, setShowAlert] = useState(false);
//     const [alertMessage, setAlertMessage] = useState('');
    

//     const handleRetrieve = async () => {
//         try {
//             console.log(`http://localhost:1010/admin/get-users/1`)
//             const response = await axios.get(`http://localhost:1010/admin/get-users/${userID}`);
//             if (response.status === 200) {
//                 console.log(`user retrieved: ${userID}`);
//                 setUserID(userID)
//                 setUserDetails(response.data) 
//                 // onRetrieve(response.data); 
//                 setAlertMessage('User successfully retrieved. hello');
//             } else {
//                 setAlertMessage('Failed to retrieve user.');
//             }
//         } catch (error) {
//             console.error('Error retrieving user:', error);
//             setAlertMessage('Failed to retrieve user.');
//         }
//         setShowAlert(true);
//     };

//     const closeAlert = () => {
//         setShowAlert(false);
//     };

//     return (
//         <div className="retrieve-cart">
//             <input
//                 type="text"
//                 placeholder="Enter Cart ID"
//                 value={userID}
//                 onChange={
//                     (e) => {
//                         setUserID(e.target.value);
//                         console.log(`Hey set to: ${e.target.value}`);
//                     }
//                 }
//             />
//             <button className="retrieve-cart-btn" onClick={handleRetrieve}>Retrieve Cart</button>
//             {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
//         </div>
//     );
// };

// export default Login;
