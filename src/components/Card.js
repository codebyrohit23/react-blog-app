import { Card, Col, Button } from 'react-bootstrap';
import  '../App.css';
function BlogCard(props) {
    return (
        <div className="col-md-4 mt-4">
            <Card className="shadow-sm bg-light rounded blog-card-container">
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.slug}</Card.Subtitle>
                    <Card.Text className="blog-card">
                        {props.content}
                    </Card.Text>
                    <Col className="gap-2">
                        <i className="float-start">{props.createdOn}</i>
                        
                        <Button variant='danger' onClick={()=>props.action.delete(props.index)} className="float-end me-2"><i className="fa fa-trash"></i></Button>
                        <Button onClick={ ()=>props.action.edit(props.index)} className="float-end me-2"><i className="fa fa-edit"></i></Button>
                    </Col>
                </Card.Body>
            </Card>
        </div>

    );
}

export default BlogCard;