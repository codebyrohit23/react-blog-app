import React from 'react'
import { Container, Navbar, Button,Image } from 'react-bootstrap';

const BlogNavbar = (props) => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" sticky="top"> 
            <Container>
                <Navbar.Brand href="#home" className="text-warning">BlogForge</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    {props.loginToken && `Signed in as : `}
                       {props.loginToken ? <span className="text-warning ms-1 btn-submit">{props.username}</span>:''}
                       {props.loginToken && <Image src={props.userImage} roundedCircle style={{height:'40px', width:'40px;'}} className='mx-2'/>}
                       {props.loginToken ?<Button variant="outline-success" className="ms-3" onClick={props.logOutUser}> Log Out </Button> : <Button variant="warning" className="text-light text-uppercase">Sign In</Button> }
                       
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default BlogNavbar
