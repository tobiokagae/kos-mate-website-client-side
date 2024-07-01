import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
       <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className={styles.title}>
        <h1>KosMate</h1>
      </div>
      <div className={styles.actions}>
        <Link href="/Login">Become a Kos Owner</Link>
      </div>
    </header>
  );
};

export default Header;
