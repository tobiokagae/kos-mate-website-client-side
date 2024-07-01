import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/HeaderOwner';
import Footer from '../components/Footer';
import CreateFoto from '@/components/CreateFoto';
import EditFoto from '@/components/UpdateFoto';
import DeleteFoto from '@/components/DeleteFoto';
import style from '../styles/Profile.module.css';

const EditProfile = () => {
    const router = useRouter();

    const handleLogoutClick = () => {
        const isConfirmed = window.confirm('Apakah Anda yakin ingin logout?');
        if (isConfirmed) {
            router.push('/');
        }
    };
    

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [kosList, setKosList] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [selectedKosId, setSelectedKosId] = useState(null);
    const [modalType, setModalType] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const userId = localStorage.getItem('user_id');

                if (!token || !userId) {
                    throw new Error('Token access atau User Id tidak tersedia');
                }

                // Fetch user profile data
                const userProfileResponse = await fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!userProfileResponse.ok) {
                    throw new Error('Failed to fetch user profile data');
                }

                const userProfile = await userProfileResponse.json();
                setFirstName(userProfile.first_name);
                setLastName(userProfile.last_name);
                setEmail(userProfile.email);
                setPhoneNumber(userProfile.phone);
                setPassword(userProfile.password);

                // Fetch kos data
                const kosResponse = await fetch(`http://127.0.0.1:5000/api/detail_kos/by_pengelola/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!kosResponse.ok) {
                    throw new Error('Failed to fetch kos data');
                }

                const kosData = await kosResponse.json();
                setKosList(kosData);

                const response = await fetch('http://127.0.0.1:5000/api/galleries');
                if (response.ok) {
                    const data = await response.json();
                    setGalleries(data);
                } else {
                    console.error('Failed to fetch galleries');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data. Please try again later.');
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (id) => {
        setSelectedKosId(id);
        setModalType('create');
    };

    const handleEditClick = (id) => {
        setSelectedKosId(id);
        setModalType('edit');
    };

    const handleDeleteClick = (id) => {
        setSelectedKosId(id);
        setModalType('delete');
    };

    const getFirstGalleryImage = (kosId) => {
        const kosGalleries = galleries.filter(gallery => gallery.id_kos === kosId);
        return kosGalleries.length > 0 ? kosGalleries[0].foto_url : '';
    };

    return (
        <div>
            <Header />
            <div className={style.container}>
                <h1>PROFILE</h1>
                <div className={style.content}>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            readOnly
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            readOnly
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="email"
                            placeholder="Email"
                            value={email}
                            readOnly
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            readOnly
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button className={style.logoutButton} onClick={handleLogoutClick}>Logout</button>
                    <h2 className={style.sectionTitle}>Your Kos</h2>
                    <div className={style.cardContainer}>
                        {kosList.map((kos) => (
                            <div className={style.card} key={kos.id}>
                                <img
                                    src={getFirstGalleryImage(kos.id)}
                                    alt={`Image of ${kos.kos_name}`}
                                    className={style.galleryImage}
                                    onClick={() => handleCardClick(kos.id)}
                                />
                                <div className={style.cardText}>{kos.kos_name}, {kos.address}</div>
                                <div className={style.cardButtons}>
                                    <button className={style.editButton} onClick={() => handleEditClick(kos.id)}>
                                        <img src="/edit.png" alt="Edit" />
                                    </button>
                                    <button className={style.deleteButton} onClick={() => handleDeleteClick(kos.id)}>
                                        <img src="/delete.png" alt="Delete" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedKosId && modalType === 'create' && (
                <div className={style.modal}>
                    <CreateFoto kosId={selectedKosId} onClose={() => setSelectedKosId(null)} />
                </div>
            )}
            {selectedKosId && modalType === 'edit' && (
                <div className={style.modal}>
                    <EditFoto kosId={selectedKosId} onClose={() => setSelectedKosId(null)} />
                </div>
            )}
            {selectedKosId && modalType === 'delete' && (
                <div className={style.modal}>
                    <DeleteFoto kosId={selectedKosId} onClose={() => setSelectedKosId(null)} />
                </div>
            )}
        </div>
    );
};

export default EditProfile;
