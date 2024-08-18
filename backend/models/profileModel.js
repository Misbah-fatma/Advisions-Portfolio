const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String },
  address: { type: String },
  profilePicture: { type: String },
  bio: { type: String },
  experience: { type: String },
  services: [{ type: String }],
  testimonials: [{ type: String }]
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
