import React from 'react';
import './App.css';
import UploadFile from './Pages/UploadFile';
import WriteMessage from './Pages/WriteMessage';
import DeleteContent from './Pages/DeleteContent';
import EditMessage from './Pages/EditMessage';
import GetContent from './Pages/GetContent';
import Home from './Pages/Home';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar className="navbar-container" bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="navbar">
                                <div><Link to="/" className="navigation-link">Home</Link></div>
                                <div><Link to="/view-content" className="navigation-link">View Content</Link></div>
                                <div><Link to="/upload" className="navigation-link">Upload File</Link></div>
                                <div><Link to="/write" className="navigation-link">Write Message</Link></div>
                                <div><Link to="/delete" className="navigation-link">Delete Content</Link></div>
                                <div><Link to="/edit" className="navigation-link">Edit Message</Link></div>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/view-content" element={<GetContent />} />
                    <Route path="/upload" element={<UploadFile />} />
                    <Route path="/write" element={<WriteMessage />} />
                    <Route path="/delete" element={<DeleteContent />} />
                    <Route path="/edit" element={<EditMessage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
