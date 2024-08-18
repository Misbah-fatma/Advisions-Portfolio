import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileForm.css';

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    profilePicture: '',
    bio: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/profile');
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile({ ...profile, profilePicture: data });
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (profile._id) {
        await axios.put(`/api/profile/${profile._id}`, profile, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('/api/profile', profile, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      window.location.reload();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/profile/${profile._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={profile.contact}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={profile.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            placeholder="Bio"
            value={profile.bio}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="text"
            name="profilePicture"
            placeholder="Profile Picture URL"
            value={profile.profilePicture}
            onChange={handleChange}
            className="form-control"
          />
          <input type="file" onChange={uploadFileHandler} className="form-control-file mt-2" />
          {uploading && <p>Uploading...</p>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">Save Profile</button>
        {profile._id && (
          <button type="button" onClick={handleDelete} className="btn btn-danger mt-3 ml-3">
            Delete Profile
          </button>
        )}
      </form>
      {profile.profilePicture && <img src={profile.profilePicture} alt={profile.name} className="img-fluid mt-3 profile-image" />}
    </div>
  );
};

export default ProfileForm;
