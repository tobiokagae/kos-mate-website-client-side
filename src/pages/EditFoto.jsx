import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/HeaderOwner';
import style from '../styles/EditFoto.module.css';

const EditFoto = () => {
    const [foto_url, setFotoUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log("No access token found");
        }
    }, [id]);

    const handleSave = async () => {
        setErrorMessage('');
        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                throw new Error('Access token not available');
            }

            const galleryData = {
                id_kos: id,
                foto_url: foto_url
            };

            const response = await fetch('http://127.0.0.1:5000/api/galleries/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(galleryData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Server response:', errorResponse);
                throw new Error(`Failed to save gallery: ${errorResponse.message}`);
            }

            alert('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
            setErrorMessage(`Failed to save data: ${error.message}`);
        }
    };

    return (
        <div>
            <Header />
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Foto URL"
                            value={foto_url}
                            onChange={(e) => setFotoUrl(e.target.value)}
                        />
                    </div>
                    <button className={style.saveButton} onClick={handleSave}>
                        SAVE
                    </button>
                    {errorMessage && <p className={style.error}>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default EditFoto;
