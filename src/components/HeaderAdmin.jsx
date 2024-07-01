import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/HeaderAdmin.module.css';

const HeaderAdmin = () => {
  const router = useRouter();

  const handleLogoutClick = () => {
    const isConfirmed = window.confirm('Apakah Anda yakin ingin logout?');
    if (isConfirmed) {
        router.push('/');
    }
};
  const handleHomeClick = () => {
    router.push('/AdminHome');  // Navigasi ke halaman Home
  };

  const handleDashboardClick = () => {
    router.push('/DashboardAdmin');  // Navigasi ke halaman Dashboard Admin
  };

  return (
    <header className={styles.header}>
      <img src="logo.png" alt="Logo" className={styles.logo} />
      <nav className={styles.nav}>
        <button className={styles.navButton} onClick={handleHomeClick}>Home</button>
        <button className={styles.navButton} onClick={handleDashboardClick}>Dashboard</button>
        <button className={styles.logoutButton} onClick={handleLogoutClick}>Logout</button>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
