import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/profile');
        console.log('Profile data:', data); // Log the profile data
        console.log('Profile picture URL:', data.profilePicture); // Log the profile picture URL
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);


  return (

    <div>
      <Header />
      {/* <section
        className="hero-wrap hero-wrap-2 js-fullheight"
        style={{ backgroundImage: backgroundImageUrl }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end">
            <div className="col-md-9 pb-5">
              <h2 className="mb-3 bread">About Us</h2>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="index.html">Home <i className="ion-ios-arrow-forward"></i></a>
                </span>
                <span>About us <i className="ion-ios-arrow-forward"></i></span>
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="ftco-section ftco-intro">
  <div className="container">
    <div className="row justify-content-end">
      <div className="col-md-4">
        <div className="card">
          <img src= {profile?.profilePicture} className="card-img-top" alt="Background" />
        </div>
      </div>
      <div class="col-md-8 py-md-5 pt-4 p-md-5 mt-4">
            <h2 className="card-title">{profile?.bio || 'Default Bio'}</h2>
            <p className="card-text mt-4">{profile?.experience || 'Default Experience'}</p>
            <a href="/contact" className="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </div>
  
</section>

      <section class="bg-light py-5 py-xl-8">
  <div class="container overflow-hidden">
    <div class="row gy-4 gy-xl-0">
      {(profile?.services || []).map((service, index) => (
        <div key={index} class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card border-0 border-bottom border-primary shadow-sm">
            <div class="card-body text-center p-4 p-xxl-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-chat-text text-primary mb-4" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
              </svg>
         
              <p>{service}</p>
              <a href="#!" class="fw-bold text-decoration-none link-primary">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section class="ftco-section ftco-portfolio">
    <div class="container">
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card portfolio-wrap">
                    <div class="card-body">
                        <div class="text">
                            <div class="px-0 pt-5">
                                <div class="desc">
                                    <div class="top top-relative">
                                        <span class="subheading">LMS Development</span>
                                        <h2 class="mb-4">Learning Management System</h2>
                                    </div>
                                    <div class="absolute relative">
                                        <p>Our LMS platform integrates advanced analytics, adaptive learning, and a user-friendly interface to enhance educational experiences. Tailored for educational institutions, it supports robust course management, assessments, and real-time tracking.</p>
                                        <p><a href="single.html" class="custom-btn">View Portfolio</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card portfolio-wrap">
                    <div class="card-body">
                        <div class="text">
                            <div class="px-0 pt-5">
                                <div class="desc">
                                    <div class="top top-relative">
                                        <span class="subheading">Hospital System</span>
                                        <h2 class="mb-4">Next-Generation Healthcare Solutions</h2>
                                    </div>
                                    <div class="absolute relative">
                                        <p>We developed a comprehensive hospital management system that streamlines operations, from patient registration to discharge, ensuring optimal care delivery. Our solution includes EHR, appointment scheduling, and billing integration.</p>
                                        <p><a href="single.html" class="custom-btn">View Portfolio</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card portfolio-wrap">
                    <div class="card-body">
                        <div class="text">
                            <div class="px-0 pt-5">
                                <div class="desc">
                                    <div class="top top-relative">
                                        <span class="subheading">Robotic Automation</span>
                                        <h2 class="mb-4">Text to Text</h2>
                                    </div>
                                    <div class="absolute relative">
                                        <p>Our robotic automation systems enhance productivity and precision in manufacturing and healthcare. We provide customized solutions that integrate seamlessly with existing infrastructure to automate repetitive tasks.</p>
                                        <p><a href="single.html" class="custom-btn">View Portfolio</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card portfolio-wrap">
                    <div class="card-body">
                        <div class="text">
                            <div class="px-0 pt-5">
                                <div class="desc">
                                    <div class="top top-relative">
                                        <span class="subheading">OCR Technology</span>
                                        <h2 class="mb-4"> Optical Character Recognition</h2>
                                    </div>
                                    <div class="absolute relative">
                                        <p>Our OCR technology enables the digitization of printed and handwritten documents with high accuracy. This solution is ideal for streamlining data entry, archiving, and document management in various industries.</p>
                                        <p><a href="single.html" class="custom-btn">View Portfolio</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
{/* 
 <div class="container">
     	<div class="row">
			 
			    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
               
					<div class="box-part text-center">
                        
                        <i class="fa fa-instagram fa-3x" aria-hidden="true"></i>
                        
						<div class="title">
							<h4>Instagram</h4>
						</div>
                        
						<div class="text">
							<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
						</div>
                        
						<a href="#">Learn More</a>
                        
					 </div>
				</div>	 
				
				 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
               
					<div class="box-part text-center">
					    
					    <i class="fa fa-twitter fa-3x" aria-hidden="true"></i>
                    
						<div class="title">
							<h4>Twitter</h4>
						</div>
                        
						<div class="text">
							<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
						</div>
                        
						<a href="#">Learn More</a>
                        
					 </div>
				</div>	 
				
				 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
               
					<div class="box-part text-center">
                        
                        <i class="fa fa-facebook fa-3x" aria-hidden="true"></i>
                        
						<div class="title">
							<h4>Facebook</h4>
						</div>
                        
						<div class="text">
							<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
						</div>
                        
						<a href="#">Learn More</a>
                        
					 </div>
				</div>	 
				
				<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
               
					<div class="box-part text-center">
                        
                        <i class="fa fa-pinterest-p fa-3x" aria-hidden="true"></i>
                        
						<div class="title">
							<h4>Pinterest</h4>
						</div>
                        
						<div class="text">
							<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
						</div>
                        
						<a href="#">Learn More</a>
                        
					 </div>
				</div>	 
				
				 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
               
					<div class="box-part text-center">
					    
					    <i class="fa fa-google-plus fa-3x" aria-hidden="true"></i>
                    
						<div class="title">
							<h4>Google</h4>
						</div>
                        
						<div class="text">
							<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
						</div>
                        
						<a href="#">Learn More</a>
                        
					 </div>
				</div>	 
				
				 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
               
					<div class="box-part text-center">
                        
                        <i class="fa fa-github fa-3x" aria-hidden="true"></i>
                        
						<div class="title">
							<h4>Github</h4>
						</div>
                        
						<div class="text">
							<span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
						</div>
                        
						<a href="#">Learn More</a>
                        
					 </div>
           </div>
           </div>
</div> */}






      {/* <section className=" ftco-intro bg-light m-4">
 
          <div className="row justify-content-center">
            <div className="col-md-10 text-center">
              <h2 className="mb-0 font-primary">We've done work of <span className="number" data-number="300">10</span> Portfolio</h2>
            </div>
          </div>
        
      </section> */}
      <Footer/>
    </div>
  );
};

export default Home;
