import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 60px);
    background-color: #f0f4f8;
    padding: 2rem;
`;

const RegisterForm = styled.form`
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

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { register, error } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await register(email, password);
            navigate('/builder');
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <RegisterContainer>
            <RegisterForm onSubmit={handleSubmit}>
                <Title>Register</Title>
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
                <InputGroup>
                    <Label htmlFor="confirmPassword">Confirm Password:</Label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </InputGroup>
                <Button type="submit">Register</Button>
                <StyledLink to="/login">Already have an account? Login here</StyledLink>
            </RegisterForm>
        </RegisterContainer>
    );
};

export default Register;
