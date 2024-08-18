import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Grid, Container, Box } from '@mui/material';
import Header from './Header';

const AdminDashboard = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    profilePicture: '',
    bio: '',
    experience: '',
    services: [],
    testimonials: []
  });
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingService, setEditingService] = useState('');
  const [editingTestimonial, setEditingTestimonial] = useState('');

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
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blogs');
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

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
      const { data } = await axios.get('/api/profile'); // Fetch the updated profile
      setProfile(data);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/profile/${profile._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile({
        name: '',
        email: '',
        contact: '',
        address: '',
        profilePicture: '',
        bio: '',
        experience: '',
        services: [],
        testimonials: []
      });
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const addService = () => {
    setProfile({ ...profile, services: [...profile.services, editingService] });
    setEditingService('');
  };

  const removeService = (index) => {
    const newServices = profile.services.filter((_, i) => i !== index);
    setProfile({ ...profile, services: newServices });
  };

  const addTestimonial = () => {
    setProfile({ ...profile, testimonials: [...profile.testimonials, editingTestimonial] });
    setEditingTestimonial('');
  };

  const removeTestimonial = (index) => {
    const newTestimonials = profile.testimonials.filter((_, i) => i !== index);
    setProfile({ ...profile, testimonials: newTestimonials });
  };

  const createBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('content', blogContent);
    formData.append('image', blogImage);

    try {
      await axios.post('/api/blogs', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBlogTitle('');
      setBlogContent('');
      setBlogImage(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('content', blogContent);
    formData.append('image', blogImage);

    try {
      await axios.put(`/api/blogs/${editingBlog._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setBlogTitle('');
      setBlogContent('');
      setBlogImage(null);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const startEdit = (blog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title);
    setBlogContent(blog.content);
    setBlogImage(null);
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmitService = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) formData.append('image', image);

    try {
      await axios.post('/api/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Clear form fields after submission
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`/api/services/${id}`);
      setServices(services.filter(service => service._id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setEditForm({ name: service.name, description: service.description, price: service.price, image: null });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentService(null);
  };

  const handleChangeService = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setEditForm({ ...editForm, image: e.target.files[0] });
  };

  const handleSubmitEditServices = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('description', editForm.description);
    formData.append('price', editForm.price);
    if (editForm.image) formData.append('image', editForm.image);

    try {
      const response = await axios.put(`/api/services/${currentService._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setServices(services.map(service => service._id === response.data._id ? response.data : service));
      handleClose();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };



  return (
    <>
    <Header />
    <Container maxWidth="lg">
      <Box mt={3}>
        <Typography variant="h4" gutterBottom className='text-center'><strong>Admin Dashboard</strong></Typography>
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} sx={{ padding: 3, marginBottom: 5 }}>
            {/* Profile Form */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  value={profile.contact}
                  onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  multiline
                  rows={3} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  multiline
                  rows={3} />
              </Grid>

              {/* Services */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Services</Typography>
                {profile.services.map((service, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={2}>
                    <Typography>{service}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ marginLeft: 'auto' }}
                      onClick={() => removeService(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <TextField
                  fullWidth
                  placeholder="Add new service"
                  value={editingService}
                  onChange={(e) => setEditingService(e.target.value)} />
                <Button variant="contained" color="primary" onClick={addService} sx={{ mt: 2 }}>Add Service</Button>
              </Grid>

              {/* Testimonials */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Testimonials</Typography>
                {profile.testimonials.map((testimonial, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={2}>
                    <Typography>{testimonial}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ marginLeft: 'auto' }}
                      onClick={() => removeTestimonial(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <TextField
                  fullWidth
                  placeholder="Add new testimonial"
                  value={editingTestimonial}
                  onChange={(e) => setEditingTestimonial(e.target.value)} />
                <Button variant="contained" color="primary" onClick={addTestimonial} sx={{ mt: 2 }}>Add Testimonial</Button>
              </Grid>

              {/* Profile Picture */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Profile Picture URL"
                  name="profilePicture"
                  value={profile.profilePicture}
                  onChange={handleChange} />
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  Upload File
                  <input type="file" hidden onChange={uploadFileHandler} />
                </Button>
                {uploading && <Typography>Uploading...</Typography>}
                {profile.profilePicture && (
                  <Box
                    mt={3}
                  >
                    <img
                      src={profile.profilePicture}
                      alt={profile.name}
                      className="img-fluid mt-3 profile-image" />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>Save Profile</Button>
                {profile._id && (
                  <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ mt: 3, ml: 2 }}>Delete Profile</Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        </form>

        {/* Manage Blogs */}
        <Typography variant="h5" gutterBottom className="mt-4 text-center"><strong>Manage Blogs</strong></Typography>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 5 }}>
          <form onSubmit={editingBlog ? updateBlog : createBlog}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  multiline
                  rows={4}
                  required />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" hidden onChange={(e) => setBlogImage(e.target.files[0])} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Blog List */}
          <TableContainer component={Paper} className="mt-3">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      <Typography variant="h6">{blog.title}</Typography>
                    </TableCell>
                    <TableCell>{blog.content}</TableCell>
                    <TableCell>
                      {blog.image && <img src={blog.image} alt={blog.title} style={{ maxWidth: '100px', height: 'auto' }} />}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => startEdit(blog)} sx={{ mr: 1 }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => deleteBlog(blog._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Manage Services */}
        <Typography variant="h5" gutterBottom className='text-center'><strong>Manage Services</strong></Typography>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 5 }}>
          <form onSubmit={handleSubmitService}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={3}
                  required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Create Service</Button>
              </Grid>
            </Grid>
          </form>

          {/* Service List */}
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>
                      <Avatar src={service.image} alt={service.name} />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleEdit(service)} sx={{ mr: 1 }}>Edit</Button>
                      <Button variant="contained" color="error" onClick={() => handleDeleteService(service._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Edit Service Modal */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmitEditServices}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={editForm.name}
                      onChange={handleChangeService}
                      required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={editForm.description}
                      onChange={handleChangeService}
                      multiline
                      rows={3}
                      required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Price"
                      name="price"
                      type="number"
                      value={editForm.price}
                      onChange={handleChangeService}
                      required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" component="label">
                      Upload Image
                      <input type="file" hidden onChange={handleImageChange} />
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmitEditServices} color="primary">Save</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </Container></>
  );
};

export default AdminDashboard;
