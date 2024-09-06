// import { useState } from 'react';

// const LoginRegister = () => {


 
//         const { setItems, fetchItems } = useLogin(); 
//         const [name, setName] = useState('');
//         const [city, setCity] = useState('');
//         const [email, setEmail] = useState('');
//         const [password, setPassword] = useState(''); 
//         const [role, setRole] = useState(''); 
//         const [errors, setErrors] = useState({});
      
//         const validateFields = () => {
//           const newErrors = {};
//           if (!name) newErrors.name = 'Your full name is required';
//           if (!password) newErrors.password = 'Password is required';
//           if (!email) newErrors.email = 'Email is required';
//           if (!email) newErrors.email = 'Address is required';
            
//           setErrors(newErrors);
//           return Object.keys(newErrors).length === 0;
//           setRole = "USER"
//         };
      
//         const handleAddNewItem = () => {
//           if (!validateFields()) return;
      
//           const newItem = {
//             name: name,
//             email: email,
//             password: password,
//             role: role,
//             city: city
          
//           };
      
//           saveNewItemToBackend(newItem);
//         };
      
//         const saveNewItemToBackend = (newItem) => {
//           fetch('http://localhost:1010/auth/register/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newItem),
//           })
//           .then(response => {
//             if (!response.ok) {
//               throw new Error('Failed to add new item');
//             }
//             return response.json();
//           })
//           .then(savedItem => {
//             setItems(prevItems => [...prevItems, savedItem]); 
//             setName('');
//             setCity('');
//             setEmail('');
//             setPassword(''); 
//             setRole(''); 

//             setErrors({});
//             fetchItems(); 
//           })
//           .catch(error => {
//             console.error('Failed to add new user:', error);
//             setErrors({ submit: 'Failed to add new user. Please try again.' });
//           });
//         };
      
//         return (
//           <div className="add-new-item-card">
//             <h2>register</h2>
//             <div className="form-field">
//               <label>Item Name:</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 style={{ borderColor: errors.name ? 'red' : '' }}
//               />
//             </div>
//             {errors.name && <span style={{ color: 'red' }}>{errors.email}</span>}
//             <div className="form-field">
//               <label>Email Address:</label>
//               <input
//                 type="text"
//                 value={email}
//                 onChange={(e) => setName(e.target.email)}
              
//                 style={{ borderColor: errors.email ? 'red' : '' }}
//               />
//             </div>
//             {errors.name && <span style={{ color: 'red' }}>{errors.password}</span>}
//             <div className="form-field">
//               <label>Password:</label>
//               <input
//                 type="text"
//                 value={password}
//                 onChange={(e) => setName(e.target.password)}
              
//                 style={{ borderColor: errors.email ? 'red' : '' }}
//               />
//             </div>
//             {errors.name && <span style={{ color: 'red' }}>{errors.city}</span>}
//             <div className="form-field">
//               <label>Address:</label>
//               <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => setName(e.target.city)}
              
//                 style={{ borderColor: errors.city ? 'red' : '' }}
//               />
//             </div>
             
//             {errors.submit && <span style={{ color: 'red' }}>{errors.submit}</span>}
//             <button onClick={handleAddNewItem} className="add-item-button">
//               Register
//             </button>
//           </div>
//         );
//       };
      