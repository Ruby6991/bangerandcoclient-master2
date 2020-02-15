import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Banger & Co</h5>
                <p class="grey-text text-lighten-4">With over 10 years of experience in the industry, you can be sure that whether you are looking for a family car, 
                    sedan or prestige car for your business or leisure trips or need a van or truck for a job, Banger & Co has the vehicle to meet every car rental need. 
                    Make the most out of our large range of services to make car rental experience a unique experience.
                </p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><NavLink to='/contact'>Contact Us</NavLink></li>
                  <li><NavLink to='/'>FAQ</NavLink></li>
                  <li><NavLink to='/'>About</NavLink></li>
                  <li><NavLink to='/'>Help</NavLink></li>
                  <li><NavLink to='/account'>My Account</NavLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2020  Banger & Co Ltd.
            </div>
          </div>
        </footer>
    )
}

export default Footer;