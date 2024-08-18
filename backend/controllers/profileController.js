const asyncHandler = require('express-async-handler');
const Profile = require('../models/profileModel'); // Ensure this path is correct

// Get profile
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

// Create profile
const createProfile = asyncHandler(async (req, res) => {
  const { name, email, contact, address, profilePicture, bio, experience, services, testimonials } = req.body;

  const profile = new Profile({
    name,
    email,
    contact,
    address,
    profilePicture,
    bio,
    experience,
    services,
    testimonials
  });

  const createdProfile = await profile.save();
  res.status(201).json(createdProfile);
});

// Update profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, contact, address, profilePicture, bio, experience, services, testimonials } = req.body;

  const profile = await Profile.findById(req.params.id);

  if (profile) {
    profile.name = name || profile.name;
    profile.email = email || profile.email;
    profile.contact = contact || profile.contact;
    profile.address = address || profile.address;
    profile.profilePicture = profilePicture || profile.profilePicture;
    profile.bio = bio || profile.bio;
    profile.experience = experience || profile.experience;
    profile.services = services || profile.services;
    profile.testimonials = testimonials || profile.testimonials;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// Delete profile
const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);

  if (profile) {
    await profile.deleteOne(); // Use deleteOne instead of remove
    res.json({ message: 'Profile removed' });
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});


module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
};
