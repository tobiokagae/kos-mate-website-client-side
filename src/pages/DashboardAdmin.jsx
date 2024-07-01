  import React, { useEffect, useState } from 'react';
  import HeaderAdmin from '../components/HeaderAdmin';
  import CreateUser from '../components/CreateUser';
  import DeleteUser from '../components/DeleteUser';
  import UpdateUser from '../components/UpdateUser';
  import styles from '../styles/DashboardAdmin.module.css';

  const DashboardAdmin = () => {
    const [users, setUsers] = useState([]);
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const token = localStorage.getItem('accessToken');

          if (!token) {
            throw new Error('Token not found');
          }

          const response = await fetch('http://127.0.0.1:5000/api/users', {
            // headers: {
            //   'Content-Type': 'application/json',
            //   'Authorization': `Bearer ${token}`
            // }
          });

          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Unauthorized: Invalid token');
            } else {
              throw new Error('Failed to fetch users');
            }
          }

          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
          alert('Failed to fetch users. Please try again later.');
        }
      };

      fetchUsers();
    }, []);

    const openCreateUser = () => {
      setIsCreateUserOpen(true);
    };

    const closeCreateUser = () => {
      setIsCreateUserOpen(false);
    };

    const openEditUser = (user) => {
      setCurrentUser(user);
      setIsEditUserOpen(true);
    };

    const closeEditUser = () => {
      setIsEditUserOpen(false);
      setCurrentUser(null);
    };

    const openDeleteUser = (user) => {
      setCurrentUser(user);
      setIsDeleteUserOpen(true);
    };

    const closeDeleteUser = () => {
      setIsDeleteUserOpen(false);
      setCurrentUser(null);
    };

  return (
      <div className={styles.body}>
        <HeaderAdmin />
        <h1 className={styles.header}>User</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>First Name</th>
              <th className={styles.th}>Last Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Phone Number</th>
              <th className={styles.th}>Password</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.tbodyRowEven : styles.tbodyRowOdd}>
                <td className={styles.tbodyTd}>{user.first_name}</td>
                <td className={styles.tbodyTd}>{user.last_name}</td>
                <td className={styles.tbodyTd}>{user.email}</td>
                <td className={styles.tbodyTd}>{user.phone}</td>
                <td className={styles.tbodyTd}>{user.password}</td>
                <td className={styles.actionTd}>
                  <button className={styles.button} onClick={() => openEditUser(user)}>
                    <img src="edit.png" alt="Edit" />
                  </button>
                  <button className={styles.button} onClick={() => openDeleteUser(user)}>
                    <img src="delete.png" alt="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={`${styles.createButton}`} onClick={openCreateUser}>Create</button>

        {isCreateUserOpen && <CreateUser onClose={closeCreateUser} />}
        {isEditUserOpen && currentUser && <UpdateUser onClose={closeEditUser} user={currentUser} />}
        {isDeleteUserOpen && currentUser && <DeleteUser onClose={closeDeleteUser} user={currentUser} />}
      </div>
    );
  };

  export default DashboardAdmin;
