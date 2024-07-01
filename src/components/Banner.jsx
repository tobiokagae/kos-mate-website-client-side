import React from 'react';
import styles from '../styles/Banner.module.css';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <img src="/house.jpg" alt="Boarding House" className={styles.image} />
      <h1 className={styles.title}>Find Your Dream Kost</h1>
    </section>
  );
};

export default Banner;
