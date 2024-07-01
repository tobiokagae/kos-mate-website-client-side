import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import styles from '../styles/BoardingHouseDetails.module.css';

const BoardingHouseDetail = () => {
  const [houseDetails, setHouseDetails] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', review: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/detail_kos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setHouseDetails(data);
        } else {
          console.error('Failed to fetch house details');
        }
      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    };

    const fetchGalleries = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/galleries/');
        if (response.ok) {
          const data = await response.json();
          setGalleries(data);
        } else {
          console.error('Failed to fetch gallery images');
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews kos');
        }
      } catch (error) {
        console.error('Error fetching reviews kos:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/users/`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (id) {
      fetchHouseDetails();
      fetchGalleries();
      fetchReviews();
      fetchUser();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_kos: houseDetails.id,
          name: newReview.name,
          review: newReview.review,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setReviews((prevReviews) => [...prevReviews, data]);
        setNewReview({ name: '', review: '' });
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!houseDetails) return <p>Loading...</p>;

  const gallery = galleries.find(gallery => gallery.id_kos === houseDetails.id);
  const user = users.find(user => user.id === houseDetails.id_pengelola_kos);
  const foto_url = gallery ? gallery.foto_url : '/default-image.jpg';
  const ownerPhone = user ? user.phone : 'Not available'; // Display owner's phone number

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.details}>
          <div className={styles.imageAndInfo}>
            <div className={styles.imagePlaceholder}>
              <img src={foto_url} alt="Boarding House" />
            </div>
            <div className={styles.info}>
              <h1>{houseDetails.kos_name}</h1>
              <div className={styles.infoItem}>
                <p>Kos Type : {houseDetails.kos_type}</p>
                <p>Room Size : {houseDetails.room_size} m</p>
                <p>Price : Rp. {houseDetails.price}/bulan</p>
                <p>Address : {houseDetails.address}</p>
                <p>Phone Number : {ownerPhone}</p>
                {/* <p>Shared Facilities : {houseDetails.shared_facilities}</p>
                <p>Room Facilities : {houseDetails.room_facilities}</p>
                <p>Available Room : {houseDetails.available_room}</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.facilities}>
          <div className={styles.facilityBox}>
            <h3>Shared Facilities</h3>
            <p>{houseDetails.shared_facilities}</p>
          </div>
          <div className={styles.facilityBox}>
            <h3>Room Facilities</h3>
            <p>{houseDetails.room_facilities}</p>
          </div>
          <div className={styles.facilityBox}>
            <h3>Available Room</h3>
            <p>{houseDetails.available_room}</p>
          </div>
        </div>

        <div className={styles.reviews}>
          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <strong>{review.name}:</strong> {review.review}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}

          <form onSubmit={handleSubmit} className={styles.reviewForm}>
            <h3>Leave a Review</h3>
            <input
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
            />
            <textarea
              name="review"
              value={newReview.review}
              onChange={handleInputChange}
              placeholder="Your Review"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BoardingHouseDetail;
