import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/BoardingHouseList.module.css';
import { useRouter } from 'next/router';

const BoardingHouseList = () => {
  const [boardingHouses, setBoardingHouses] = useState([]);
  const [galleries, setGalleries] = useState([]);
  
  const router = useRouter();

  useEffect(() => {
    const fetchBoardingHouses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/detail_kos'); // Adjust the endpoint as necessary
        if (response.ok) {
          const data = await response.json();
          setBoardingHouses(data);
        } else {
          console.error('Failed to fetch boarding houses');
        }
      } catch (error) {
        console.error('Error fetching boarding houses:', error);
      }
    };

    const fetchGalleries = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/galleries');
        if (response.ok) {
          const data = await response.json();
          setGalleries(data);
        } else {
          console.error('Failed to fetch galleries');
        }
      } catch (error) {
        console.error('Error fetching galleries:', error);
      }
    };
    
    fetchBoardingHouses();
    fetchGalleries();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/BoardingHouseDetail?id=${id}`);
  };

  const combinedData = boardingHouses.map((house) => {
    const gallery = galleries.find((gallery) => gallery.id_kos === house.id);
    return {
      ...house,
      foto_url: gallery ? gallery.foto_url : '/default-image.jpg', // Ganti dengan URL gambar default jika tidak ada gambar
    };
  });

  return (
    <section className={styles.boardingHouseList}>
      <h2>EXPLORE YOUR KOST</h2>
      <p>Find the best kost based on your needs. Enjoy the comfort of living complete facilities and affordable prices. Start your new adventure with us!!</p>
      <div className={styles.grid}>
        {combinedData.map((house, index) => (
          <div key={index} className={styles.card} onClick={() => handleCardClick(house.id)}>
            <img src={house.foto_url} alt="Boarding House" />
            <h3>{house.kos_name}</h3>
            <p>{house.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoardingHouseList;
