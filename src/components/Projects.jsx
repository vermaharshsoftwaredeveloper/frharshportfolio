import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Your backend server is running on port 5001
        const response = await fetch('http://localhost:5001/api/projects');
        if (!response.ok) {
          throw new Error('Network response was not ok. Is the backend server running?');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // The empty array means this effect runs once on component mount

  if (loading) {
    return <section id="projects" className="projects-container"><p>Loading projects...</p></section>;
  }

  if (error) {
    return <section id="projects" className="projects-container"><p>Error: {error}</p></section>;
  }

  return (
    <section id="projects" className="projects-container">
      <h3 className="section-title">Projects</h3>
      {projects.length === 0 ? (
        <div className="no-projects">
            <p>No projects found in the database.</p>
            <p>You can add projects via MongoDB Atlas to see them appear here.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            // Use project._id from MongoDB as the key
            <div key={project._id} className="project-card">
              <div className="project-image-container">
                <img src={project.imageUrl} alt={project.title} className="project-image"/>
              </div>
              <div className="project-content">
                <h4 className="project-title">{project.title}</h4>
                <p className="project-description">{project.description}</p>
                <h4>Tech-Stack -</h4>
                <p className="project-techstack">{project.techstack}</p>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;