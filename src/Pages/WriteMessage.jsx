import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from '../components/SuccessModal';
import './Styles/WriteMessage.css';

export default function WriteMessage() {
    const [receipientDetail, setReceipientDetail] = React.useState({
        name: "",
        email: "",
        phone: ""
    });
    const [message, setMessage] = React.useState("");
    const [CID, setCID] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);

    function sendMessage(event) {
        event.preventDefault();
        const URL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
        let file = {
            pinataMetadata: {
                name: "Message_JSON"
            },
            pinataContent: {
                receipient: receipientDetail,
                message: message
            }
        };

        fetch(URL, {
            method: "POST",
            body: JSON.stringify(file),
            headers: {
                "Content-type": "application/json",
                pinata_api_key: process.env.REACT_APP_IPFS_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_IPFS_PRIVATE_KEY
            }
        })
        .then(response => response.json())
        .then(result => {
            setCID(result.IpfsHash);
            setShowModal(true);
        })
        .catch(err => console.error(err));

        setReceipientDetail({
            name: "",
            email: "",
            phone: ""
        });

        setMessage("");
    }

    function changeReceipient(event) {
        let { name, value } = event.target;
        setReceipientDetail(oldReceipient => {
            return {
                ...oldReceipient,
                [name]: value
            };
        });
    }

    return (
        <Card className="write-message-container">
            <Card.Body className="write-message-card">
                <Card.Title className="message-box-title" color="gray">
                    Message Box
                </Card.Title>
                <Form onSubmit={(event) => sendMessage(event)}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name" className="form-title">Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={receipientDetail.name} 
                            placeholder="Enter recipient's name" 
                            onChange={(event) => changeReceipient(event)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email" className="form-title">Email:</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={receipientDetail.email} 
                            placeholder="Enter recipient's email" 
                            onChange={(event) => changeReceipient(event)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form-title">Phone Number:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="phone" 
                            id="phone" 
                            value={receipientDetail.phone}
                            placeholder="Enter recipient's phone number"
                            onChange={(event) => changeReceipient(event)} 
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="form-title">Message Content:</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} name="message" 
                            className="message-box mb-3"
                            value={message}
                            placeholder="Type your message here"
                            onChange={(event) => setMessage(event.target.value)}
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
            </Card.Body>

            {/* Success Modal */}
            <SuccessModal showModal={showModal} setShowModal={setShowModal} CID={CID} mode={'upload'} />
        </Card>
    );
}