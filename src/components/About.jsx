import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <section id="about" className="about-container">
      <h3 className="section-title">About me</h3>
      <div className="about-content">
        <p>
          Hi, I'm Harsh Verma, a passionate Software Developer from Indore. I hold a Bachelor of Technology degree in Information Technology from Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore (2019–2025).
        </p>
      </div>
      <br/> <br/> <br />
      <div>  
        <h3 className="section-title">Skills</h3>
        <div className="skills-content">  
          Frontend :- 
          <div className="skills-title"> 
            <span>HTML5</span>
            <span>CSS3</span>
            <span>JavaScript</span>
            <span>React.js</span>
            <span>Vue.js</span>
            <span>Bootstrap</span>
            <span>MaterialUI</span>
            <span>Flexbox</span>
            <span>CSS Grid</span>
          </div>
          <br />
          Backend :- 
          <div className="skills-title"> 
            <span>Node.js</span>
            <span>Express.js</span>
            <span>Restful APIs</span>
            <span>JWT Authentication</span>
            <span>Java</span>
            <span>Python</span>
          </div>
          <br />
          Database :- 
          <div className="skills-title">
            <span>MySQL</span> 
            <span>MongoDB</span>
            <span>PostgreSQL</span>
          </div>
          <br />
          Tools & Dev :- 
          <div className="skills-title">
            <span>Git</span>
            <span>GitHub</span>
            <span>VS Code</span>
            <span>Postman</span>
            <span>Chrome DevTools</span>
          </div>
          <br />
          Cloud :- 
          <div className="skills-title">
            <span>AWS (Basic)</span>
            <span>Vercel</span>
            <span>Render</span>
            <span>Firebase</span>
            <span>Heruku</span>
          </div>
          <br />
          Soft Skills :- 
          <div className="skills-title"> 
            <span>Problem-Solving</span>
            <span>Team Collaboration</span>
            <span>Time Management</span>
            <span>Continuous Learning</span>
            <span>Teamwork</span>
            <span>Communication</span>
            <span>Adaptability</span>
          </div>
      </div>
      <br /> <br /> <br />

      <div>
        <h3 className="section-title">Certifications</h3>
        <div className='skills-content'>
          1. Deloitte Technology Virtual Internship (May 2025) <br />
          2. Certificate of Internship at NullClass Edtech Pvt Ltd (May 2024)
        </div>
      </div>
       <br />
        {/* <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number">120+</span>
            <span className="stat-label">Completed Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
        </div> */}
      </div>
    </section>
    
  );
}

export default About;