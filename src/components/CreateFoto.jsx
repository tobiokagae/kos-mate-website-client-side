import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/CreateUser.module.css';

const CreateFoto = ({ kosId, onClose }) => {
    const [foto_url, setFotoUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log("No access token found");
        }
    }, [kosId]);

    const handleSave = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                throw new Error('Access token not available');
            }

            const galleryData = {
                id_kos: kosId,
                foto_url: foto_url
            };

            const response = await fetch('http://127.0.0.1:5000/api/galleries/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(galleryData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Server response:', errorResponse);
                throw new Error(`Failed to save gallery: ${errorResponse.message}`);
            }

            alert('Data saved successfully');
            onClose();  // Close the modal after successful save
        } catch (error) {
            console.error('Error saving data:', error);
            setErrorMessage(`Failed to save data: ${error.message}`);
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
                <h2 className={styles.title}>CREATE FOTO</h2>
                <form className={styles.form} onSubmit={handleSave}>
                    <div className={styles['form-group']}>
                        <label>Foto Url</label>
                        <input 
                            type="text" 
                            placeholder="Foto Url" 
                            value={foto_url} 
                            onChange={(e) => setFotoUrl(e.target.value)} 
                        />
                    </div>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    <button type="submit" className={styles.saveButton}>SAVE</button>
                </form>
            </div>
        </div>
    );
};

export default CreateFoto;
