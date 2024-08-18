const Service = require('../models/serviceModel');

exports.addService = async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const image = req.file ? req.file.path : null;
      const newService = new Service({
        name,
        description,
        price,
        image,
      });
      await newService.save();
      res.status(201).json({ message: 'Service added successfully', service: newService });
    } catch (error) {
      res.status(500).json({ message: 'Error adding service', error });
    }
  };

exports.getAllServices = async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services', error });
    }
  };

  exports.updateService = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;
      const image = req.file ? req.file.path : null;
  
      const updatedService = await Service.findByIdAndUpdate(
        id,
        { name, description, price, image },
        { new: true }
      );
  
      if (!updatedService) return res.status(404).json({ message: 'Service not found' });
      res.status(200).json(updatedService);
    } catch (error) {
      res.status(500).json({ message: 'Error updating service', error });
    }
  };
  
  exports.deleteService = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedService = await Service.findByIdAndDelete(id);
      if (!deletedService) return res.status(404).json({ message: 'Service not found' });
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting service', error });
    }
  };
