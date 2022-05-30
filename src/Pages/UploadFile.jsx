import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from '../components/SuccessModal';
import './Styles/UploadFile.css';

export default function UploadFile() {
    const [fileUploded, setFileUploaded] = React.useState('');
    const [CID, setCID] = React.useState("");
    const [receipient, setReceipient] = React.useState({
        name: "",
        email: "",
        phone: ""
    });
    const [showModal, setShowModal] = React.useState(false);

    function uploadFile(event) {
        event.preventDefault();
        const formData = new FormData();

        // ready the file to be upload
        formData.append('pinataMetadata', JSON.stringify({
            name: "fileUploaded",
            keyvalues: receipient
        }));
        formData.append('file', fileUploded);

        fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            body: formData,
            headers: {
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

        setReceipient({
            name: "",
            email: "",
            phone: ""
        });

        setFileUploaded('');
    }

    function changeReceipient(event) {
        let { name, value } = event.target;

        setReceipient(oldReceipient => {
            return {
                ...oldReceipient,
                [name]: value
            };
        });
    }

    return (
        <Card className="upload-file-container">
            <Card.Body className="upload-file-card">
                <Card.Title className="upload-file-title" color="gray">
                    Upload File
                </Card.Title>
                <Form onSubmit={(event) => uploadFile(event)}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name" className="form-title">Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={receipient.name} 
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
                            value={receipient.email} 
                            placeholder="Enter recipient's email" 
                            onChange={(event) => changeReceipient(event)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="phone" className="form-title">Phone Number:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="phone" 
                            id="phone" 
                            value={receipient.phone} 
                            placeholder="Enter recipient's phone number" 
                            onChange={(event) => changeReceipient(event)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="file" className="form-title">Upload File:</Form.Label>
                        <Form.Control 
                            type="file"
                            name="file"
                            id="file"
                            onChange={(event) => setFileUploaded(event.target.files[0])}
                        />
                    </Form.Group>

                    <div className="send-button-container">
                        <Button 
                            type="submit" 
                            className="send-message-button"
                            variant="secondary"
                        >
                            Upload
                        </Button>
                    </div>
                </Form>
            </Card.Body>

            <SuccessModal showModal={showModal} setShowModal={setShowModal} CID={CID} mode={'upload'} />
        </Card>
    );
}