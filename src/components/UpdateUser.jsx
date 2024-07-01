import React, { useState } from 'react';
import styles from '../styles/CreateUser.module.css';

const UpdateUser = ({ user, onClose }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhoneNumber] = useState(user.phone);
  const [password, setPassword] = useState(user.password);

  const handleUpdate = async () => {
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      email : email,
      phone : phone,
      password : password

    };

    try {

      const token = localStorage.getItem('accessToken');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch(`http://127.0.0.1:5000/api/users/update/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert('User updated successfully');
        onClose(); // Close the UpdateUser component
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src="reject.png" alt="Close Button" className={styles.closeButtonImg} onClick={onClose} />
        <h2 className={styles.title}>UPDATE USER</h2>
        <form className={styles.form}>
          <div className={styles['form-group']}>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className={styles['form-group']}>
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles['form-group']}>
            <label>Phone Number</label>
            <input type="text" value={phone} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" className={styles.saveButton} onClick={handleUpdate}>SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
