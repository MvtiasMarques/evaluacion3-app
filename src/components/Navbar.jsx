// src/components/Navbar.jsx
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
  const navItems = [
    { id: 'quienes-somos', label: 'Quiénes Somos', href: '#quienes-somos-section' },
    { id: 'talleres', label: 'Talleres y Servicios', href: '#talleres-servicios-section' },
    { id: 'productos', label: 'Productos', href: '#productos-section' },
    { id: 'faq', label: 'Preguntas Frecuentes', href: '#faq-section' },
    { id: 'contacto', label: 'Contacto', href: '#contacto-section' },
  ];

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <BootstrapNavbar.Brand href="#home">Tejelanas Vivi</BootstrapNavbar.Brand> {/* Puedes cambiar #home a la sección principal o quitarlo */}
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* ms-auto alinea los items a la derecha */}
            {navItems.map(item => (
              <Nav.Link key={item.id} href={item.href}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
