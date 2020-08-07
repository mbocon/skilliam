import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/Footer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './loginPage.css';

function LoginPage(props) {

	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validated, setValidated] = useState(false);
	const [loginError, setError] = useState('');

	const handleSubmit = e => {

		e.preventDefault();

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		setValidated(true);

		let dataToSubmit = {
			email: email,
			password: password,
		};

		dispatch(loginUser(dataToSubmit)).then(response => {
			console.log(response.payload)
			if (response.payload.loginSuccess) {
				localStorage.setItem('user', response.payload.userId.name)
				localStorage.setItem('userId', response.payload.userId._id)
				localStorage.setItem('email', response.payload.userId.email)
				localStorage.setItem('github', response.payload.userId.github)
				localStorage.setItem('linkedin', response.payload.userId.linkedin)
				localStorage.setItem('avatar', response.payload.userId.avatar)
				props.history.push('/home')
			} else {
				console.log(response.payload);
				setValidated(false);
				form.reset()
				setError('Wrong email and/or password')
				setTimeout(()=>{
					setError('')
				}, 2000)
			}
		});
	};

	const handleChange = e => {
		if (e.target.id === 'email') setEmail(e.target.value);
		if (e.target.id === 'password') setPassword(e.target.value);
	};

	return (
		<Fragment>
			<div className='login-page app'>
				<h2>Login</h2>
				{loginError === '' ? null : <h6 className='login-error'>{loginError}</h6> }
				<Form className='register-form' noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Row>
						<Form.Group controlId='email' onChange={handleChange}>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' placeholder='Enter email' required />
							<Form.Control.Feedback type='invalid'>Please enter your email.</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId='password' onChange={handleChange}>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' placeholder='Password' required />
							<Form.Control.Feedback type='invalid'>Please enter your password.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					<Button variant='primary' className='login-btn' type='submit'>
						Login
					</Button>
				</Form>
			</div>
			<Footer />
		</Fragment>
	);
}

export default withRouter(LoginPage);
