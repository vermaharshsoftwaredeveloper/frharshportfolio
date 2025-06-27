// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { API_URL, API_BASE_URL } from '../apiConfig'; // <-- IMPORT
import '../styles/Hero.css';
import defaultProfilePic from '../assets/profile-pic.jpg';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';


function Hero() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(defaultProfilePic); 
  
  useEffect(() => {
    const fetchResume = async () => {
        try {
            const response = await fetch(`${API_URL}/resume`);
            if (response.ok) {
                const data = await response.json();
                if (data && data.url) {
                    setResumeUrl(data.url);
                }
            }
        } catch (error) { console.error("Could not fetch resume", error); }
    };
    const fetchProfile = async () => {
        console.log("Attempting to fetch profile...");
        try {
            const response = await fetch(`${API_URL}/profile`);
            console.log("Fetch response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Data received from API:", data);
                if (data && data.imageUrl) {
                    console.log("Setting profile picture to:", data.imageUrl);
                    setProfilePicUrl(data.imageUrl);
                } else {
                    console.log("No imageUrl found in data, using default.");
                }
            } else {
                console.log("Response not OK, server returned an error.");
            }
        } catch (error) { 
            console.error("A network or other error occurred while fetching profile:", error); 
        }
    };
    fetchResume();
    fetchProfile();
  }, []);

  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/harxhhexe2706/',
    github: 'https://github.com/Harshverma00/',
    instagram: 'https://instagram.com/geek.who.died/',
    whatsapp: 'https://wa.me/+919893171773/'
  };

  return (
    <header className="hero-container">
        <div className="hero-header">
            <h1 className="hero-title">
                Hello. <br />
                I'm Harsh Verma
            </h1>
            <br />
            <h2 className="hero-subtitle">A passionate full-stack developer skilled in the MERN stack. I love building clean, modern web apps and solving real-world problems through code.</h2>
        </div>
        
        <div className="hero-centered-content">
            <div className="hero-image-container">
                <img 
                    src={profilePicUrl}
                    alt="A portrait of Harsh Verma"
                    className="hero-image"
                    // onError={(e) => { e.target.onerror = null; e.target.src = defaultProfilePic; }}
                />
            </div>
            
            <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">Got a project?</a>
                {resumeUrl && (
                     <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">My resume</a>
                )}
            </div>

            <div className="social-links">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedin />
                </a>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaGithub />
                </a>
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaWhatsapp />
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaInstagram />
                </a>
            </div>
        </div>
    </header>
  );
}

export default Hero;