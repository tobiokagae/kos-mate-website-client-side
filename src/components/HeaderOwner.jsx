import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/HeaderOwner.module.css';

const HeaderOwner = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/OwnerHome');  // Navigasi ke halaman Home
  };

  const handleAddClick = () => {
    router.push('/EditDetail');  // Navigasi ke halaman Dashboard Admin
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>
      <nav className={styles.nav}>
        <button className={styles.navButton} onClick={handleHomeClick}>Home</button>
        <button className={styles.navButton} onClick={handleAddClick}>Add Kost</button>
      </nav>
      <div className={styles.actions}>
        <a href="/Profile">
          <img src="/profile.png" alt="Profile" />
        </a>
      </div>
    </header>
  );
};

export default HeaderOwner;
