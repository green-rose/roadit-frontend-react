import React from 'react';
import { Container, Row, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

function Header() {
    return (
        <Container>
            <Row >
            <div className="col-md-12">
                <Navbar bg="light" expand="lg" sticky>
                    <Navbar.Brand href="/">
                        <i class="fas fa-bullseye"></i> ROADit
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Posts</Nav.Link>
                            <Nav.Link href="/subreddits">Subreddits</Nav.Link>
                            <NavDropdown title="New" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/postform" >New Post</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/subredditform">New Subreddit</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            </Row>
        </Container>
    );
  }
  
  export default Header;