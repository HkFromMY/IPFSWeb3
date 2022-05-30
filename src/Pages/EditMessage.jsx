import React from 'react';
import './Styles/EditMessage.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import SucessModal from '../components/SuccessModal';
import FailModal from '../components/FailModal';

export default function EditContent() {
    const [toggleEdit, setToggleEdit] = React.useState(false);
    const [receipient, setReceipient] = React.useState({
        name: "",
        email: "",
        phone: ""
    });
    const [CID, setCID] = React.useState("");
    const [newCID, setNewCID] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [showFailModal, setShowFailModal] = React.useState(false);

    function changeReceipient(event) {
        let { name, value } = event.target;
        setReceipient(oldReceipient => {
            return {
                ...oldReceipient,
                [name]: value
            };
        });
    }

    function getMessage(event) {
        event.preventDefault();
        fetch(`https://gateway.pinata.cloud/ipfs/${CID}`)
            .then(res => res.json())
            .then(result => {
                setMessage(result.message);
                setReceipient(result.receipient);
                setToggleEdit(true);
            })
            .catch(err => {
                setShowFailModal(true);
                console.error(err);
            })
    }

    function editMessage(event) {
        event.preventDefault();

        // delete content first
        fetch(`https://api.pinata.cloud/pinning/unpin/${CID}`, {
            method: 'DELETE',
            headers: {
                pinata_api_key: process.env.REACT_APP_IPFS_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_IPFS_PRIVATE_KEY
            }
        })
        .then(res => {
            if (res.status === 200) {
                // then upload
                let file = {
                    pinataMetadata: {
                        name: "Message_JSON"
                    },
                    pinataContent: {
                        receipient: receipient,
                        message: message
                    }
                };

                fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
                    method: 'POST',
                    body: JSON.stringify(file),
                    headers: {
                        "Content-Type": "application/json",
                        pinata_api_key: process.env.REACT_APP_IPFS_API_KEY,
                        pinata_secret_api_key: process.env.REACT_APP_IPFS_PRIVATE_KEY
                    }
                })
                .then(res => res.json())
                .then(result => {
                    setReceipient({
                        name: "",
                        email: "",
                        phone: ""
                    });
                    setMessage("");
                    setCID("");
                    setNewCID(result.IpfsHash);
                    setToggleEdit(false);
                    setShowSuccessModal(true);
                })
                .catch(err => {
                    setShowFailModal(true);
                    console.error(err);
                });
            } else {
                setShowFailModal(true);
            }
        })
        .catch(err => {
            setShowFailModal(true);
            console.error(err);
        });
    }

    return (
        <Container className="edit-message-container">
            <h3 className="form-big-title">Edit Message</h3>

            <Form onSubmit={(event) => getMessage(event)} className="edit-form">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name" className="form-title">Enter your CID here:</Form.Label>
                    <Form.Control type="text" name="CID" id="CID" value={CID} placeholder="Enter content's CID to be edited" onChange={(event) => setCID(event.target.value)} />
                </Form.Group>

                {
                    !toggleEdit && 
                    <div className="send-button-container">
                        <Button 
                            type="submit" 
                            className="send-message-button"
                            variant="success"
                        >
                            Search
                        </Button>
                    </div>
                }
            </Form>

            {
                toggleEdit && 
                <Form onSubmit={(event) => editMessage(event)}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name" className="form-title">Receipient Name:</Form.Label>
                        <Form.Control type="text" name="name" id="name" value={receipient.name} onChange={(event) => changeReceipient(event)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email" className="form-title">Receipient Email:</Form.Label>
                        <Form.Control type="email" name="email" id="email" value={receipient.email} onChange={(event) => changeReceipient(event)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form-title">Receipient Phone Number:</Form.Label>
                        <Form.Control type="text" name="phone" id="phone" value={receipient.phone} onChange={(event) => changeReceipient(event)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="form-title">Message Content:</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} name="message" 
                            className="message-box mb-3"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </Form.Group>

                    <div className="send-button-container">
                        <Button 
                            type="submit" 
                            className="send-message-button"
                        >
                            Edit
                        </Button>
                    </div>
                </Form>
            }
            <SucessModal showModal={showSuccessModal} setShowModal={setShowSuccessModal} CID={newCID} mode={'edit'} />
            <FailModal showModal={showFailModal} setShowModal={setShowFailModal} />
        </Container>
    );
}