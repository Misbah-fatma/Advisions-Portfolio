import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Avatar, Typography } from '@mui/material';
import "../App.css";
import Header from "./Header";
import Footer from './Footer';

const ServiceForm = () => {
    const [services, setServices] = useState([]);

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

    return (
        <>
            <Header />
            <div className="home-container">
                <section className="bg-light py-5 py-xl-8">
                    <div className="container overflow-hidden">
                        <div className="row gy-4 gy-xl-0">
                            {services.map((service) => (
                                <div key={service._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div className="card border-0 border-bottom border-primary shadow-sm d-flex flex-column">
                                        <div className="card-body text-center p-4 p-xxl-5 d-flex flex-column">
                                            <Avatar
                                                src={`/${service.image}`}
                                                alt={service.name}
                                                sx={{ width: 56, height: 56, margin: '0 auto', marginBottom: 2 }} />
                                            <h4 className="mb-4">{service.name}</h4>
                                            <p>{service.description}</p>
                                            <p className="price">
                                            ₹{service.price.toFixed(2)}
                                            </p>
                                            <a href="#!" className="fw-bold text-decoration-none link-primary mt-auto">
                                                Learn More
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default ServiceForm;
