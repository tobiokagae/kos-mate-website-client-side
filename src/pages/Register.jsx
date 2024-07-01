import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css';

const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const user = {
      first_name,
      last_name,
      email,
      phone,
      password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Registration successful');
        router.push('/Login'); // Adjust the path as necessary
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>KosMate</h1>
        <input
          type="text"
          placeholder="First Name"
          className={styles.input}
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className={styles.input}
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.registerButton} onClick={handleRegister}>
          REGISTER
        </button>
        <div className={styles.signUp}>
          Already have an account? <a href="/Login">Log in Here</a>
        </div>
        <div className={styles.demoAccount}>
          <p>Demo Account</p>
          <p>Email: Rezarezz@user.com & Pass: Rezarezz</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
