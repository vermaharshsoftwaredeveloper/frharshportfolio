// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import '../styles/Admin.css';

// UPDATED: This line now dynamically checks for the deployment URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function Admin() {
    const [projects, setProjects] = useState([]);
    const [projectFormData, setProjectFormData] = useState({ title: '', description: '',techstack: '', imageUrl: '', liveUrl: '', githubUrl: '' });
    const [editingId, setEditingId] = useState(null);
    const [resumeUrl, setResumeUrl] = useState('');
    const [currentResumeUrl, setCurrentResumeUrl] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [currentProfilePicUrl, setCurrentProfilePicUrl] = useState('');
    
    const { user } = useAuthContext();
    const { logout } = useLogout();

    useEffect(() => {
        // FIXED: This function now correctly fetches projects as well as other data.
        const fetchAllData = async () => {
            try {
                // Fetch Projects
                const projectsResponse = await fetch(`${API_URL}/projects`);
                const projectsData = await projectsResponse.json();
                if (projectsResponse.ok) {
                    setProjects(projectsData);
                }

                // Fetch Resume
                const resumeResponse = await fetch(`${API_URL}/resume`);
                if (resumeResponse.ok) {
                   const resumeData = await resumeResponse.json();
                   setCurrentResumeUrl(resumeData.url);
                }

                // Fetch Profile
                const profileResponse = await fetch(`${API_URL}/profile`);
                if (profileResponse.ok) {
                   const profileData = await profileResponse.json();
                   setCurrentProfilePicUrl(profileData.imageUrl);
                }
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        fetchAllData();
    }, []);

    // All handler functions remain the same
    const handleProjectInputChange = (e) => { setProjectFormData({ ...projectFormData, [e.target.name]: e.target.value }); };
    const handleProjectSubmit = async (e) => { 
        e.preventDefault();
        if (!user) return;
        const method = editingId ? 'PATCH' : 'POST';
        const url = editingId ? `${API_URL}/projects/${editingId}` : `${API_URL}/projects`;
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify(projectFormData),
        });
        const updatedProject = await response.json();
        if(response.ok){
            if (editingId) {
                setProjects(projects.map(p => p._id === editingId ? updatedProject : p));
            } else {
                setProjects([updatedProject, ...projects]);
            }
            setProjectFormData({ title: '', description: '',techstack: '', imageUrl: '', liveUrl: '', githubUrl: '' });
            setEditingId(null);
        }
     };
    const handleEdit = (project) => { 
        setEditingId(project._id);
        setProjectFormData(project);
     };
    const handleDelete = async (id) => { 
        if (!user) return;
        if(window.confirm('Are you sure you want to delete this project?')) {
             const response = await fetch(`${API_URL}/projects/${id}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
             if(response.ok){
                setProjects(projects.filter(p => p._id !== id));
            }
        }
     };
    const handleResumeSubmit = async (e) => {
        e.preventDefault();
        if (!resumeUrl || !user) return;
        const response = await fetch(`${API_URL}/resume`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({ url: resumeUrl }),
        });
        const data = await response.json();
        if(response.ok){
            setCurrentResumeUrl(data.url);
            setResumeUrl('');
        }
    };
    const handleResumeDelete = async () => {
        if (!user || !currentResumeUrl) return;
        if(window.confirm('Are you sure you want to delete the resume link?')) {
             const response = await fetch(`${API_URL}/resume`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
             if(response.ok){
                setCurrentResumeUrl('');
            }
        }
    };
    const handleProfilePicSubmit = async (e) => {
        e.preventDefault();
        if (!profilePicUrl || !user) return;
        const response = await fetch(`${API_URL}/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
            body: JSON.stringify({ imageUrl: profilePicUrl }),
        });
        const data = await response.json();
        if(response.ok){
            setCurrentProfilePicUrl(data.imageUrl);
            setProfilePicUrl('');
        }
    };

    return (
        <>
            <header className="admin-header">
                <div className="container">
                    <Link to="/" className="admin-header-link">← Back to Portfolio</Link>
                    <button onClick={logout} className="btn-logout">Logout</button>
                </div>
            </header>
            <div className="admin-container container">
                <h1>Admin Panel</h1>
                <div className="profile-pic-management project-form">
                     <h2>Manage Profile Picture Link</h2>
                     {currentProfilePicUrl && (
                         <div className="current-resume-info">
                            <p>Current Image:</p>
                            <img src={currentProfilePicUrl} alt="Current profile" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                         </div>
                     )}
                     <form onSubmit={handleProfilePicSubmit}>
                        <label htmlFor="profile-pic-url-input">New Image URL:</label>
                        <input 
                            id="profile-pic-url-input" 
                            type="url" 
                            value={profilePicUrl}
                            onChange={(e) => setProfilePicUrl(e.target.value)}
                            placeholder="https://i.imgur.com/..." 
                            required 
                        /> <br/>
                        <button type="submit" className="btn btn-primary">
                            Update Profile Picture
                        </button>
                     </form>
                </div>
                <div className="resume-management project-form">
                     <h2>Manage Resume Link</h2>
                     {currentResumeUrl ? (
                         <div className="current-resume-info">
                            <p>Current Link: <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer">{currentResumeUrl}</a></p>
                            <button onClick={handleResumeDelete} className="btn-delete">Delete Link</button>
                         </div>
                     ) : ( <p>No resume link set.</p> )}
                     <form onSubmit={handleResumeSubmit}>
                        <label htmlFor="resume-url-input">Google Drive Link:</label>
                        <input 
                            id="resume-url-input" 
                            type="url" 
                            value={resumeUrl}
                            onChange={(e) => setResumeUrl(e.target.value)}
                            placeholder="https://docs.google.com/..." 
                            required 
                        />
                        <button type="submit" className="btn btn-primary">
                            {currentResumeUrl ? 'Update Link' : 'Save Link'}
                        </button>
                     </form>
                </div>
                <form onSubmit={handleProjectSubmit} className="project-form">
                     <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                    <input type="text" name="title" value={projectFormData.title} onChange={handleProjectInputChange} placeholder="Project Title" required />
                    <textarea name="description" value={projectFormData.description} onChange={handleProjectInputChange} placeholder="Project Description" required />
                    <textarea name="techstack" value={projectFormData.techstack} onChange={handleProjectInputChange} placeholder="Project Tech-Stack" required />
                    <input type="text" name="imageUrl" value={projectFormData.imageUrl} onChange={handleProjectInputChange} placeholder="Image URL" required />
                    <input type="text" name="liveUrl" value={projectFormData.liveUrl} onChange={handleProjectInputChange} placeholder="Live Demo URL" />
                    <input type="text" name="githubUrl" value={projectFormData.githubUrl} onChange={handleProjectInputChange} placeholder="GitHub URL" />
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update Project' : 'Add Project'}</button>
                    {editingId && <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); setProjectFormData({ title: '', description: '',techstack: '', imageUrl: '', liveUrl: '', githubUrl: '' }); }}>Cancel Edit</button>}
                </form>
                <div className="projects-list">
                     <h2>Existing Projects</h2>
                    {projects.map(project => (
                        <div key={project._id} className="project-item">
                            <h3>{project.title}</h3>
                            <div className="project-actions">
                                <button onClick={() => handleEdit(project)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDelete(project._id)} className="btn-delete">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Admin;