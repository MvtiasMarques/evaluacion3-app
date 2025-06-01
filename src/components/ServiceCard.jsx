import React, { useState } from 'react'; // Importar useState
import { Card, Button, Modal } from 'react-bootstrap'; // Importar Modal

const ServiceCard = ({ imageUrl, title, description, productName }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const serviceTitle = title || productName || 'Servicio Destacado';
  const serviceDescription = description || 'Descripción no disponible.';
  const contactButtonText = "Contáctanos"; // Texto para el botón de contacto en el modal

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={imageUrl} alt={serviceTitle} loading="lazy" />
        <Card.Body>
          <Card.Title>{serviceTitle}</Card.Title>
          <Card.Text style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '60px' // Ajusta según el tamaño de fuente y líneas
          }}>
            {serviceDescription}
          </Card.Text>
          <Button variant="primary" onClick={handleShowModal}>Ver Detalles</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{serviceTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={imageUrl} alt={serviceTitle} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', marginBottom: '20px' }} loading="lazy" />
          <p>{serviceDescription}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" href="#contacto-section" onClick={handleCloseModal}>
            {contactButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceCard;

// Estilos básicos para la tarjeta (se pueden mover a un archivo CSS)
// Por ahora, los incluyo aquí para simplicidad.
// Considera crear un ServiceCard.css y importarlo.
const styles = `
.service-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.service-card-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
}

.service-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.service-card-title {
  font-size: 1.5em;
  margin-bottom: 8px;
}

.service-card-description {
  font-size: 1em;
  color: #555;
  margin-bottom: 16px;
}

.service-card-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.service-card-button:hover {
  background-color: #0056b3;
}
`;

// Inyectar los estilos en el head del documento
// (Esto es una forma simple, para proyectos más grandes usar archivos CSS o CSS-in-JS)
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
