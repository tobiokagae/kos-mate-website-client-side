import React from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import BannerAdmin from '../components/BannerAdmin';
import styles from '../styles/AdminHome.module.css';


const HomeAdmin = () => {
  return (
    <div className={styles.homeContainer}>
      <HeaderAdmin />
      <main className={styles.mainContent}>
        <BannerAdmin />
      </main>
    </div>
  );
};

export default HomeAdmin;