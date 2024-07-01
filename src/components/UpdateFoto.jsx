import React, { useEffect, useState } from 'react';
import styles from '../styles/CreateUser.module.css';

const UpdateFoto = ({ kosId, onClose }) => {
    const [foto_url, setFotoUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log("No access token found");
            return;
        }

        const fetchFotoUrl = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/galleries/detail/${kosId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error('Server response:', errorResponse);
                    throw new Error(`Failed to fetch foto URL: ${errorResponse.message}`);
                }

                const data = await response.json();
                setFotoUrl(data.foto_url); // Assuming the response contains a field named foto_url
            } catch (error) {
                console.error('Error fetching foto URL:', error);
                setErrorMessage(`Failed to fetch foto URL: ${error.message}`);
            }
        };

        fetchFotoUrl();
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

            const response = await fetch(`http://127.0.0.1:5000/api/galleries/update/detail/${kosId}`, {
                method: 'PUT',
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
                <h2 className={styles.title}>UPDATE FOTO</h2>
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

export default UpdateFoto;
