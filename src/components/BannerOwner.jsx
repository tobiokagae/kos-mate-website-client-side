// components/Banner.tsx
import React from 'react';
import styles from '../styles/BannerOwner.module.css';

const BannerOwner = () => {
  return (
    <section className={styles.banner}>
      <img src="/house.jpg" alt="Boarding House" className={styles.image} />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Promote Your Own Kost Here</h1>
        <a href="./EditDetail">
          <button className={styles.startButton}>START</button>
        </a>
      </div>
    </section>
  );
};

export default BannerOwner;
