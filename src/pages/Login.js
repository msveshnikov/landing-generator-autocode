import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { loginUser } from '../services/api';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f4f8;
`;

const LoginForm = styled.form`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
`;

const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #357abd;
    }
`;

const ErrorMessage = styled.p`
    color: #d32f2f;
    text-align: center;
    margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
    display: block;
    text-align: center;
    margin-top: 1rem;
    color: #4a90e2;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userData = await loginUser(email, password);
            setUser(userData);
            navigate('/builder');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Login</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <InputGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputGroup>
                <Button type="submit">Login</Button>
                <StyledLink to="/register">Don't have an account? Register here</StyledLink>
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;
