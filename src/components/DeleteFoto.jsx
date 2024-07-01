import React, { useState } from 'react';
import styles from '../styles/CreateUser.module.css';

const DeleteFoto = ({ kosId, onClose }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = async () => {
        setErrorMessage('');
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Access token not available');
            }
    
            const response = await fetch(`http://127.0.0.1:5000/api/galleries/delete/detail/${kosId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({})
            });
    
            const responseText = await response.text();
    
            if (!response.ok) {
                console.error('Server response:', responseText);
                throw new Error(`Failed to delete galleries: ${responseText}`);
            }
    
            alert('Galleries deleted successfully');
            onClose(); // Close the modal after successful deletion
        } catch (error) {
            console.error('Error deleting galleries:', error);
            setErrorMessage(`Failed to delete galleries: ${error.message}`);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <img 
                    src="reject.png" 
                    alt="Close Button" 
                    className={styles.closeButtonImg} 
                    onClick={onClose} 
                />
                <h2 className={styles.title}>DELETE GALLERIES</h2>
                <div className={styles.content}>
                    <p>Are you sure you want to delete all photos for this kos?</p>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.deleteButton} onClick={handleDelete}>YES</button>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>NO</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteFoto;
