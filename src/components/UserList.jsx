import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (users.length > 0) {
      const results = users.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    }
  }, [searchTerm, users]);

  const fetchUsers = async (page) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://reqres.in/api/users/${id}`);
        // Remove user from local state (API doesn't actually delete the user)
        setUsers(users.filter(user => user.id !== id));
        setFilteredUsers(filteredUsers.filter(user => user.id !== id));
        setSuccessMessage('User deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading && users.length === 0) {
    return <div className="container">Loading users...</div>;
  }

  return (
    <div>
      <h2>User Management</h2>
      
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-grid">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="user-card-img" />
              <div className="user-card-body">
                <h3 className="user-card-title">{user.first_name} {user.last_name}</h3>
                <p className="user-card-text">{user.email}</p>
                <div className="user-card-actions">
                  <Link to={`/users/${user.id}/edit`} className="btn">Edit</Link>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className="pagination-item">
              <button
                onClick={() => setCurrentPage(page)}
                className={`pagination-link ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;