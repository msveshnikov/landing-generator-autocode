import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { registerUser } from '../services/api';
import Header from '../components/Header';

const RegisterContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #357abd;
    }
`;

const ErrorMessage = styled.p`
    color: #d32f2f;
    text-align: center;
    margin-bottom: 10px;
`;

const LoginLink = styled(Link)`
    display: block;
    text-align: center;
    margin-top: 15px;
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
    const [error, setError] = useState('');

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userData = await registerUser(email, password);
            setUser(userData);
            navigate('/builder');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <>
            <Header />
            <RegisterContainer>
                <Title>Register</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmPassword">Confirm Password:</Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Button type="submit">Register</Button>
                </Form>
                <LoginLink to="/login">Already have an account? Login here</LoginLink>
            </RegisterContainer>
        </>
    );
};

export default Register;