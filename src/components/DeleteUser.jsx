import React from 'react';
import styles from '../styles/DeleteUser.module.css';

const DeleteUser = ({ onClose, user }) => {
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/delete/${user.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('User deleted successfully');
        onClose(); // Close the DeleteUser component
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleCloseModal = () => {
    onClose(); // Close the DeleteUser component
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src="reject.png" alt="Close Button" className={styles.closeButtonImg} onClick={onClose} />
        <h2 className={styles.title}>DELETE USER</h2>
        <div className={styles.content}>
          <p>Are you sure you want to delete user {user.first_name} {user.last_name}?</p>
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.deleteButton} onClick={handleDeleteUser}>YES</button>
            <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>NO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
