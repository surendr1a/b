import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [users, setUsers] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the URL to your backend's deployed URL
            await axios.post('https://b-two-sooty.vercel.app/api/users', { firstName, lastName });
            alert('User saved successfully');
        } catch (error) {
            alert('Error saving user');
        }
    };

    const handleFetch = async () => {
        try {
            // Update the URL to your backend's deployed URL
            const response = await axios.get('https://b-two-sooty.vercel.app/api/users');
            setUsers(response.data);
        } catch (error) {
            alert('Error fetching users');
        }
    };

    return (
        <div>
            <h1>Submit Name</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

            <button onClick={handleFetch}>Give me</button>

            {users.length > 0 && (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>{user.firstName} {user.lastName}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
