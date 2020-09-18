import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import ThemeToggle from "components/ThemeToggle";

const BlogNavbar = ({ theme, toggleTheme }) => {
  return (
    <Navbar className="fj-navbar fj-nav-base" bg="transparent" expand="lg">
      <Navbar.Brand className="fj-navbar-brand">
        <Link href="/">
          <img
            className="navigation-brand__image"
            src="./../img/songtradr_brand.png"
						alt="Songtradr Logo"
						style={{marginLeft: "-35px", cursor: "pointer"}}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            as={() => (
              <Link href="/">
                <a className="fj-navbar-item fj-navbar-link">Home</a>
              </Link>
            )}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BlogNavbar;
