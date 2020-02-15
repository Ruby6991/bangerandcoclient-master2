import React from 'react'
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const ContactUs = () => {
    return (
        <div className="contact-us">
            <Navbar/>
            <section class="contact-page-sec">
                <div class="container">
                <div class="row">
                    <div class="col-md-4">
                    <div class="contact-info">
                        <div class="contact-info-item">
                        <div class="contact-info-icon">
                            <i className="material-icons">location_city</i>
                        </div>
                        <div class="contact-info-text">
                            <h2>address</h2>
                            <span>Banger & Co (Pvt.) Ltd.</span> 
                            <span>No 49/3 Pamankada Road,</span> 
                            <span>Colombo 6,</span> 
                            <span>Sri Lanka.</span> 
                        </div>
                        </div>            
                    </div>          
                    </div>          
                    <div class="col-md-4">
                    <div class="contact-info">
                        <div class="contact-info-item">
                        <div class="contact-info-icon">
                            <i className="material-icons">email</i>
                        </div>
                        <div class="contact-info-text">
                            <h2>E-mail</h2>
                            <span>Banger&Co@gmail.com</span>
                        </div>
                        </div>            
                    </div>                
                    </div>     
                    <div class="col-md-4">
                    <div class="contact-info">
                        <div class="contact-info-item">
                        <div class="contact-info-icon">
                            <i className="material-icons">local_phone</i>
                        </div>
                        <div class="contact-info-text">
                            <h2>Phone </h2>
                            <span>+94 77 7567123</span>
                            <span>+94 11 5867123</span>
                        </div>
                        </div>            
                    </div>                
                    </div>           
                    <div class="col-md-4">
                    <div class="contact-info">
                        <div class="contact-info-item">
                        <div class="contact-info-icon">
                            <i className="material-icons">access_time</i>
                        </div>
                        <div class="contact-info-text">
                            <h2>Operating times</h2>
                            <span>Mon - Sun  8:00 am - 6.00 pm</span>
                        </div>
                        </div>            
                    </div>          
                    </div>          
                </div>
                <div class="row">
                    <div class="col-md-4">        
                    <div class="contact-page-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.108251221584!2d79.86911871382942!3d6.877632395030061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bb58d9216c3%3A0x6b47dda679e11ae5!2sPamankada%20Rd%2C%20Colombo!5e0!3m2!1sen!2slk!4v1578334226975!5m2!1sen!2slk"></iframe>
                    </div>          
                    </div>        
                </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default ContactUs;
