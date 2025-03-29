import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to fetch user details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
      
      setSuccess('User updated successfully!');
      setTimeout(() => {
        navigate('/users');
      }, 2000);
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container">Loading user details...</div>;
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Edit User</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        {user.avatar && (
          <div className="text-center mb-4">
            <img 
              src={user.avatar} 
              alt={`${user.first_name} ${user.last_name}`} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 20px' }}
            />
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label" htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="form-input"
            value={user.first_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="form-input"
            value={user.last_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/users')}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;