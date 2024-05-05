import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Form, Col, Image } from 'react-bootstrap';

const SignIn = (props) => {
    const [haveError, setHaveError] = useState(false);
    const signInImage = 'https://t3.ftcdn.net/jpg/03/99/24/82/360_F_399248286_Ogm0T8CFeauN4Hdn42FqWfsCE02dJBbX.jpg';

    const [userImage, setUserImage] = useState(signInImage);

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

    const [login, setLogin] = useState('login');
    // regex for email and password 
    const isValidPassword = (password) => {
        const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])/;
        return passwordFormat.test(password);
    };
    const isValidEmail = (email) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return emailRegex.test(email);
    };
    // error message 
    const [error, setError] = useState({ username: '', email: '', password: '', confirmPassword: '', image: '' });
    // set login and sign up form 
    const setsignUp = () => {
        setLogin(login === 'login' ? 'signup' : 'login');
    }

    const [user, setUser] = useState({ username: '', password: '', confirmPassword: '', userImage: '' });
    //chaneUserValue on input change 
    const chaneUserValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (haveError) {
            let errors = {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                image: ''
            }
            if (!user.email) {
                errors.email = 'Please enter email required field.';
            } else if (!isValidEmail(user.email)) {
                errors.email = 'Enter a valid email address';
            } else {
                errors.email = '';
            }
            if (user.username.length === '') {
                errors.username = 'Please Enter a username field is required';
            } else if (user.username.length < 3) {
                errors.username = 'Enter a valid username';
            }
            else {
                errors.username = '';
            }
            if (user.password === '') {
                errors.password = 'Please enter password';
            } else if (!isValidPassword(user.password)) {
                errors.password = 'Password contain at least 8 character at least 1  (Upper case, lower case number and special character)';
            } else {
                errors.password = '';
            }
            if (userImage === '') {
                errors.image = "Please choose a profile picture";
                
            } else {
                errors.image = '';
            }
            
            if(!errors.password && user.password !== user.confirmPassword){
              errors.confirmPassword = 'password not matched';
    
            } else {
                errors.confirmPassword = '';
            }
             setError(errors);
             console.log(user);
        }

    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (login === 'login') {
            const userToken = btoa(user.email + user.password);
            if (users.indexOf(userToken) === -1) {
                props.showAlert('warning', 'Please Login with valid credentials !');
                setUser({ username: '', email: '', password: '', confirmPassword: '' });
                return;
            }
            localStorage.setItem('loginToken', userToken);
            props.setLoginToken(userToken);
            for (let i = 0; i < allUsers.length; i++) {
                const userAuth = allUsers[i];
                if (userAuth.loginToken === userToken) {
                    props.setUserName(userAuth.username);
                    setUserImage(userAuth.image);
                    props.showAlert('success', 'Login Successfully!');
                    break;
                }
            }
        }
        else {
            let ValidationErrors = false;
            let errors = {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                image: ''
            }
            if (!user.email) {
                errors.email = 'Please enter email address.';
                setHaveError(true);
                ValidationErrors = true;
            } else if (!isValidEmail(user.email)) {
                errors.email = 'Enter a valid email address';
                setHaveError(true);
                ValidationErrors = true;
            }
            if (user.username.length < 3) {
                errors.username = 'Enter a valid username';
                setHaveError(true);
                ValidationErrors = true;
            }
            if (!user.password) {
                errors.password = 'Please enter password';
                setHaveError(true);
            } else if (!isValidPassword(user.password)) {
                errors.password = 'Password contain at least 8 character at least 1  (Upper case, lower case number and special character)';
                setHaveError(true);
                ValidationErrors = true;
            }
            if (!userImage) {
                errors.image = "Please choose a profile picture";
                setHaveError(true);
                ValidationErrors = true;
            }
            if (!errors.password && user.password !== user.confirmPassword) {
                errors.confirmPassword = "Password does`t match";
                setHaveError(true);
                ValidationErrors = true;
            }
            if (ValidationErrors) {
                setError(errors);
                return;
            }
            for (let i = 0; i < allUsers.length; i++) {
                const { email } = allUsers[i];
                if (email === user.email) {
                    props.showAlert("warning", "Already have an account on this email address !");
                    return;
                }
            }
            const userToken = btoa(user.email + user.password);
            localStorage.setItem('loginToken', userToken);
            users.push(userToken);
            localStorage.setItem('users', (JSON.stringify(users)))
            props.setLoginToken(userToken);
            // create new user detail
            const newUser = {
                username: user.username,
                email: user.email,
                loginToken: userToken,
                image: userImage
            }
            allUsers.push(newUser);
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
            props.setUserName(user.username);
            props.setUserImage(userImage);
            props.showAlert('success', 'Your account is created Successfully!');
        }

    }
    // set user image on sign up
    useEffect(() => {
        setUserImage(login === 'login' ? signInImage : '');
        setUser({ username: '', email: '', password: '', confirmPassword: '', userImage: '' });
    }, [login]);
    //on chnage of image show in image box 
    const onImageChange = (e) => {
        const UserImage = URL.createObjectURL(e.target.files[0]);
        console.log(UserImage);
        setUserImage(UserImage);
    }


    return (
        <Container>
            <Row>
                <Col>

                    <Form onSubmit={handleSubmitForm} className="col-md-10 mt-4">
                        <h1 className="text-warning d-flex justify-content-center me-4">Sign {login === 'login' ? 'In' : 'Up'}</h1>
                        {/* name */}
                        {login !== 'login' &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><strong className='text-warning'>Username</strong></Form.Label>
                                <Form.Control type="text" placeholder="username" name="username" value={user.username} onChange={chaneUserValue} />
                                <p className="text-danger">{error.username}</p>
                            </Form.Group>
                        }
                        {/* Profile */}
                        {login !== 'login' &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><strong className='text-warning'>User Profile</strong></Form.Label>
                                <Form.Control type="file" name="userImage" value={user.userImage} onChange={onImageChange} />
                                <p className="text-danger">{error.image}</p>
                            </Form.Group>
                        }

                        {/* Email */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><strong className='text-warning'>Email</strong></Form.Label>
                            <Form.Control type="email" placeholder="email@gmail.com" name="email" value={user.email} onChange={chaneUserValue} />
                            <p className="text-danger">{error.email}</p>
                        </Form.Group>
                        {/* Password */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><strong className='text-warning'>Password</strong></Form.Label>
                            <Form.Control type="pasword" placeholder="pasword" name="password" value={user.password} onChange={chaneUserValue} />
                            <p className="text-danger">{error.password}</p>
                        </Form.Group>
                        {/* Password */}
                        {login !== 'login' &&
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><strong className='text-warning'>Confirm Password</strong></Form.Label>
                                <Form.Control type="pasword" placeholder="confirm password" name="confirmPassword" value={user.confirmPassword} onChange={chaneUserValue} />
                                <p className="text-danger">{error.confirmPassword} </p>
                            </Form.Group>
                        }
                        <Form.Group className="mb-3 d-flex justify-content-between" controlId="exampleForm.ControlInput1">
                            <p>
                                <Button type="submit" variant='warning' className='btn-submit text-light'> Sign {login === 'login' ? 'In' : 'Up'}</Button>
                            </p>

                            <p className="ms-2 text-warning">  {login === 'login' ? `Don't have an Account ? ` : 'Already have Account ? '}<span variant="outline-warning" className="ms-2 btn-submit" onClick={setsignUp}>{login === 'login' ? 'SignUp' : 'SignIn'}</span></p>
                        </Form.Group>

                    </Form>
                </Col>
                <Col className="d-flex align-items-center">
                    <Image src={userImage} rounded className='signin-image' />
                </Col>
            </Row>
        </Container>
    )
}

export default SignIn
