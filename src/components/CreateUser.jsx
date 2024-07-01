import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/CreateUser.module.css';

const CreateUser = ({ onClose }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();

    const user = {
      first_name,
      last_name,
      email,
      phone,
      password,
    };

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Token tidak tersedia');
      }

      const response = await fetch('http://127.0.0.1:5000/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Registration successful');
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src="reject.png" alt="Close Button" className={styles.closeButtonImg} onClick={onClose} />
        <h2 className={styles.title}>CREATE USER</h2>
        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles['form-group']}>
            <label>First Name</label>
            <input 
              type="text" 
              placeholder="First Name" 
              value={first_name} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
          </div>
          <div className={styles['form-group']}>
            <label>Last Name</label>
            <input 
              type="text" 
              placeholder="Last Name" 
              value={last_name} 
              onChange={(e) => setLastName(e.target.value)} 
            />
          </div>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className={styles['form-group']}>
            <label>Phone Number</label>
            <input 
              type="text" 
              placeholder="Phone Number" 
              value={phone} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className={styles.saveButton}>SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
