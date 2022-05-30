import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function FileForm({ formValue, formChange, formAction}) {
    return (
        <Container>
            <Container className="edit-message-container">
                <h3 className="form-big-title">File form</h3>
                <Form onSubmit={(event) => formAction(event)}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name" className="form-title">Receipient Name:</Form.Label>
                        <Form.Control type="text" name="name" id="name" value={formValue.receipient.name} onChange={(event) => formChange(event)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email" className="form-title">Receipient Email:</Form.Label>
                        <Form.Control type="email" name="email" id="email" value={formValue.receipient.email} onChange={(event) => formChange(event)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form-title">Receipient Phone Number:</Form.Label>
                        <Form.Control type="text" name="phone" id="phone" value={formValue.receipient.phone} onChange={(event) => formChange(event)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="form-title">Message Content:</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} name="message" 
                            className="message-box mb-3"
                            value={formValue.message}
                            onChange={(event) => formChange(event.target.value)}
                        />
                    </Form.Group>

                    <div className="send-button-container">
                        <Button 
                            type="submit" 
                            className="send-message-button"
                        >
                            Send
                        </Button>
                    </div>
                </Form>
            </Container>
        </Container>
    );
}