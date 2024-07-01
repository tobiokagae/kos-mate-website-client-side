import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const credentials = {
      email,
      password,
    };

    try {
      // Extract domain from email
      const domain = email.split('@')[1];

      // Determine endpoint based on domain
      let endpoint = '';
      if (domain === 'admin.com') {
        endpoint = 'http://127.0.0.1:5000/auth/loginAdmin'; // Endpoint for admin login
      } else {
        endpoint = 'http://127.0.0.1:5000/auth/login'; // Default endpoint for regular user login
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const result = await response.json();
        const {access_token, user_id} = result;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('user_id', user_id);
        alert('Login successful');

        // Redirect based on domain
        if (domain === 'admin.com') {
          router.replace('/AdminHome'); // Redirect to admin page for admin.com
        } else {
          router.replace('/OwnerHome'); // Redirect to main page for user.com and other domains
        }
      } else {
        const result = await response.json();
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>KosMate</h1>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
        />
        <button className={styles.loginButton} onClick={handleLogin}>
          LOG IN
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.signUp}>
          Don't have an account? <a href="/Register">Register Here</a>
        </div>
        <div className={styles.demoAccount}>
          <p>Demo Account</p>
          <p>Email: Rezarezz@user.com & Pass: Rezarezz</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
