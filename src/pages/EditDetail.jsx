import React, { useEffect, useState } from 'react';
import Header from '../components/HeaderOwner';
import style from '../styles/EditDetail.module.css';

const EditDetail = () => {
    const [idPengelolaKos, setIdPengelolaKos] = useState('');
    const [kosName, setKosName] = useState('');
    const [kosType, setKosType] = useState('');
    const [roomSize, setRoomSize] = useState('');
    const [prize, setPrize] = useState('');
    const [address, setAddress] = useState('');
    const [sharedFacilities, setSharedFacilities] = useState('');
    const [roomFacilities, setRoomFacilities] = useState('');
    const [availableRooms, setAvailableRooms] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('user_id');
        if (token && userId) {
            setIdPengelolaKos(userId);
        } else {
            console.log("tidak ada akses token atau user id ditemukan");
        }
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            const userId = localStorage.getItem('user_id');

            if (!token || !userId) {
                throw new Error('Token access atau User Id tidak tersedia');
            }

            const detailKosData = {
                id_pengelola_kos: userId,
                kos_name: kosName,
                kos_type: kosType,
                room_size: roomSize,
                price: prize,
                address: address,
                shared_facilities: sharedFacilities,
                room_facilities: roomFacilities,
                available_room: availableRooms,
            };

            const responseDetailKos = await fetch('http://127.0.0.1:5000/api/detail_kos/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(detailKosData),
            });

            if (!responseDetailKos.ok) {
                const errorDetailKos = await responseDetailKos.json();
                console.error('Server response:', errorDetailKos);
                throw new Error(`Failed to save detail_kos: ${errorDetailKos.message}`);
            }

            alert('Data saved successfully');

        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to save data. Please try again later.');
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
                            placeholder="Kos name"
                            value={kosName}
                            onChange={(e) => setKosName(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <select
                            className={style.select}
                            value={kosType}
                            onChange={(e) => setKosType(e.target.value)}
                        >
                            <option value="">Kos type</option>
                            <option value="type1">Putra</option>
                            <option value="type2">Putri</option>
                            <option value="type3">Campur</option>
                        </select>
                    </div>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Room size"
                            value={roomSize}
                            onChange={(e) => setRoomSize(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Prize"
                            value={prize}
                            onChange={(e) => setPrize(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <textarea
                            className={style.textarea}
                            placeholder="Shared facilities"
                            value={sharedFacilities}
                            onChange={(e) => setSharedFacilities(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <textarea
                            className={style.textarea}
                            placeholder="Room facilities"
                            value={roomFacilities}
                            onChange={(e) => setRoomFacilities(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Available rooms"
                            value={availableRooms}
                            onChange={(e) => setAvailableRooms(e.target.value)}
                        />
                    </div>
                    <button className={style.saveButton} onClick={handleSave}>
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditDetail;
