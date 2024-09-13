import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useWebsite } from '../contexts/WebsiteContext';
import { getUserWebsites, deleteWebsite, logout } from '../services/api';

const UserAccount = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setCurrentWebsite } = useWebsite();
    const [websites, setWebsites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                const userWebsites = await getUserWebsites();
                setWebsites(userWebsites);
            } catch (error) {
                console.error('Error fetching user websites:', error);
            }
        };

        if (user) {
            fetchWebsites();
        }
    }, [user]);

    const handleDeleteWebsite = async (websiteId) => {
        try {
            await deleteWebsite(websiteId);
            setWebsites(websites.filter((website) => website.id !== websiteId));
        } catch (error) {
            console.error('Error deleting website:', error);
        }
    };

    const handleEditWebsite = (website) => {
        setCurrentWebsite(website);
        navigate('/builder');
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (!user) {
        return (
            <div className="user-account">
                <h1>User Account</h1>
                <p>Please log in to view your account.</p>
                <Link to="/login">Login</Link>
            </div>
        );
    }

    return (
        <div className="user-account">
            <h1>User Account</h1>
            <p>Welcome, {user.email}!</p>
            <button onClick={handleLogout}>Logout</button>
            <h2>Your Websites</h2>
            {websites.length > 0 ? (
                <ul className="website-list">
                    {websites.map((website) => (
                        <li key={website.id} className="website-item">
                            <h3>{website.name}</h3>
                            <button onClick={() => handleEditWebsite(website)}>Edit</button>
                            <Link to="/preview" onClick={() => setCurrentWebsite(website)}>
                                Preview
                            </Link>
                            <button onClick={() => handleDeleteWebsite(website.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You haven't created any websites yet.</p>
            )}
            <Link to="/templates" className="create-new-button">
                Create New Website
            </Link>
        </div>
    );
};

export default UserAccount;
