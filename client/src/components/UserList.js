import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Ошибка получения пользователей');
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/registration', {
        name,
        password,
      });
      console.log(response.data)
      setUsers([...users, response.data]);
      setName('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Ошибка регистрации');
    }
  };

  const updateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/`, {
        id,
        name: newName,
      });
      const updatedUsers = users.map((user) =>
        user.id === id ? response.data : user
      );
      setUsers(updatedUsers);
      setNewName('');
      setError('');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Ошибка при изменении имени');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/id`, { data: { id: parseInt(id, 10) } });
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
      setError('');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Ошибка при удалении пользователя');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.user_uid}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>Удалить</button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser(user.id);
              }}
            >
            </form>
          </li>
        ))}
      </ul>
      <h2>Register New User</h2>
      <form onSubmit={registerUser}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserComponent;
