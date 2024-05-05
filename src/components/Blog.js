import React, { useState } from 'react'
import { Button, Container, Row, Form,Modal,Col,Image } from 'react-bootstrap';
import BlogCard from './Card';
import  '../App.css';   

// import crudAppImage from '../images/crud-app.jpg'
const Blog = (props) => {
    let allLocalBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const userBlog = allLocalBlogs.filter(blog=>blog.author === props.loginToken);
    const otherBlog =  allLocalBlogs.filter(blog=>blog.author !== props.loginToken);

    const [blog, setBlog] = useState({ title: '', slug: '', content: '', createdOn : new Date().toDateString(), author : props.loginToken});
    const [blogs, setBlogs] = useState(userBlog);

    // set blog value on chnge input 
    const changeBlogValue = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }
    // cretae blog on form submit 
    const createBlog = (e) => {
        e.preventDefault();
        if (!blog.title || !blog.slug || !blog.content) return props.showAlert("warning" , "Please fill all the field");
        let allBlogs = blogs.concat(blog);
        setBlogs(allBlogs);
        localStorage.setItem('blogs', JSON.stringify(allBlogs));
        setBlog({ title: '', slug: '', content: '' });
        props.showAlert("success" , "Your blog is successfully added");
    }
    //delete blog on click of delete button
    const deleteBlog = (id) => {
        const allBlogs = blogs.filter((value, index) => index !== id);
        localStorage.setItem('blogs', JSON.stringify(allBlogs));
        const userBlog = allBlogs.filter(blog=>blog.author === props.loginToken);
        setBlogs(userBlog);
        props.showAlert("success" , "Your blog is deleted successfully !");
    }

    // value of edit notes 
    const [eblog, seteBlog ] = useState({eindex : '', etitle : '', eslug : '', econtent : '' });
    const changeEditValue = (e)=>{
        seteBlog({...eblog, [e.target.name] : e.target.value});
    }

    //edit blog on click of delete button
        
    const editBlog = () => {
        let allBlogs = JSON.parse(JSON.stringify(blogs));       
        if (!eblog.etitle || !eblog.eslug || !eblog.econtent) return props.showAlert("warning" , "Please fill all the field");

        for (let index = 0; index <= allBlogs.length; index ++){
            if(index === eblog.eindex){
                allBlogs[index].title = eblog.etitle;
                allBlogs[index].slug = eblog.eslug;
                allBlogs[index].content = eblog.econtent;
                break;
            }
        }
        localStorage.setItem('blogs', JSON.stringify(allBlogs));
        const userBlog = allBlogs.filter(blog=>blog.author === props.loginToken);
        setBlogs(userBlog);
        props.showAlert("success" , "Your blog is edit successfully !");
        handleClose();
    }
    // open modal and hide 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // show modal 
    const handleShow = (eIndes) =>{
        const editBlog = blogs.filter((blog,index)=>  eIndes === index);
        let {title , slug , content  } = editBlog[0];
        seteBlog({eindex : eIndes, etitle : title, eslug : slug , econtent : content });
        setShow(true);
    } 

    
    return (
        <Container >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createBlog}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><strong>Title</strong></Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="etitle" value={eblog.etitle} onChange={changeEditValue} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label><strong>Slug</strong></Form.Label>
                            <Form.Control type="text" placeholder="Enter Slug" name="eslug" value={eblog.eslug} onChange={changeEditValue} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label><strong>Content</strong> </Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter content" name="econtent" value={eblog.econtent} onChange={changeEditValue} required/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editBlog}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
            <Col>
                <Form onSubmit={createBlog} className="col-md-10">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label><strong className='text-light'>Title</strong></Form.Label>
                        <Form.Control type="text" placeholder="Title" name="title" value={blog.title} onChange={changeBlogValue}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label><strong className='text-light'>Slug</strong></Form.Label>
                        <Form.Control type="text" placeholder="Slug" name="slug" value={blog.slug} onChange={changeBlogValue} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label><strong className='text-light'>Content </strong></Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Write here..." name="content" value={blog.content} onChange={changeBlogValue} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Button type="submit" variant='success' >Create Blog</Button>
                    </Form.Group>
                </Form>
                </Col>
                <Col>
                    <Image src="https://tse4.explicit.bing.net/th?id=OIP.Q95RFFlMIMZHuO9vKAyDrgAAAA&pid=Api&P=0&h=180" rounded className="mt-4 blog-image"/>
                </Col>
                </Row>
    
            <Row>
                {blogs.map((blog, index) =>
                    <BlogCard key={index} title={blog.title} slug={blog.slug} content={blog.content} createdOn ={blog.createdOn} action={{ edit: handleShow, delete: deleteBlog }} index={index} />
                )}
            </Row>
        </Container>
    )
}

export default Blog
