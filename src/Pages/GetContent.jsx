import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FailModal from '../components/FailModal';
import './Styles/GetContent.css';

export default function GetContent() {
    const [selectedTab, setSelectedTab] = React.useState('file-content');
    const [CID, setCID] = React.useState("");
    const [fileURL, setFileURL] = React.useState(``);
    const [message, setMessage] = React.useState("");
    const [showFailModal, setShowFailModal] = React.useState(false);
    
    function getMessage(event) {
        event.preventDefault();
        fetch(`https://gateway.pinata.cloud/ipfs/${CID}`)
            .then(res => {
                if (res.status === 200) return res.json();
            })
            .then((result) => {
                setMessage(result);
            })
            .catch(err => {
                console.error(err);
                setShowFailModal(true);
            });

        setCID("");
    }

    function getFile() {
        fetch(`https://gateway.pinata.cloud/ipfs/${CID}`)
            .then(response => response.blob())
            .then(blob => {
                let url = URL.createObjectURL(blob);
                setFileURL(url);
            })
            .catch(err => {
                setShowFailModal(true);
            });

        setCID('');
    }

    return (
        <Card className="home-container">
            <Card.Title className="home-title">
                View Content
            </Card.Title>

            <Tabs activeKey={selectedTab} onSelect={(key) => setSelectedTab(key)} className="mt-5" fill>
                {/* file tab */}
                <Tab eventKey="file-content" title="View File">
                    <div className="cid-form">
                        <Form>
                            <Form.Group>
                                <Form.Label>Enter your CID (hash) here: </Form.Label>
                                <Form.Control type="text" value={CID} placeholder="Enter the file's CID to be viewed" onChange={(event) => setCID(event.target.value)} />
                            </Form.Group>
                            <div className="button-container">
                                <Button className="home-button" onClick={() => getFile()}>Get file</Button>
                            </div>
                        </Form>
                    </div>

                    {
                        fileURL !== '' &&
                        <iframe 
                            src={fileURL} 
                            frameBorder="0" 
                            title="file" 
                            width="500" 
                            height="500" id="file" 
                            className="file-content"
                            allowFullScreen
                        />
                    }
                </Tab>
                
                {/* message tab */}
                <Tab eventKey="message-content" title="View Message" className="message-tab">
                    <div className="cid-form">
                        <Form onSubmit={(event) => getMessage(event)}>
                            <Form.Group>
                                <Form.Label>Enter your CID (hash) here: </Form.Label>
                                <Form.Control type="text" value={CID} placeholder="Enter the message's CID to be viewed" onChange={(event) => setCID(event.target.value)} />
                            </Form.Group>

                            <div className="button-container">
                                <Button type="submit" className="home-button">Get message</Button>
                            </div>
                        </Form>
                    </div>

                    {
                        message !== '' && (typeof message === 'object') ?
                        <Container className="message-content">
                            <h3 className="receipient-details">Receipient Details</h3>
                            <hr />
                            <Row className="mb-3">
                                <Col className="message-title">Name: </Col>
                                <Col className="message-value">{ message.receipient.name }</Col>
                            </Row>
                            <Row className="mb-3">
                                <Col className="message-title">Email: </Col>
                                <Col className="message-value">{ message.receipient.email }</Col>
                            </Row>
                            <Row className="mb-3">
                                <Col className="message-title">Phone: </Col>
                                <Col className="message-value">{ message.receipient.phone }</Col>
                            </Row>
                            <hr />
                            <Row className="mb-3" id="message">
                                <Col className="message-title">Message: </Col>
                                <Col className="message-value">{ message.message }</Col>
                            </Row>
                        </Container>

                        :

                        ''
                    }
                </Tab>
            </Tabs>

            {/* Fail Modal */}
            <FailModal showModal={showFailModal} setShowModal={setShowFailModal} />
        </Card>
    );
}