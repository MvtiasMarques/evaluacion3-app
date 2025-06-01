// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, FloatingLabel, Spinner, Alert } from 'react-bootstrap'; // Añadir Spinner y Alert

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para "enviando"
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null); // Estado para errores de envío (simulado)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => { // Convertido a async para simular demora
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);
    setSubmitError(null);

    // Simulación de llamada a API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular espera de red

      // Simular un error aleatorio para demostración (opcional)
      // if (Math.random() < 0.3) {
      //   throw new Error('Error simulado al enviar el formulario.');
      // }

      console.log('Formulario "enviado" (simulación):', formData);
      setIsSubmitted(true);
      // Resetear formulario tras envío exitoso
      // setFormData({ name: '', email: '', subject: '', message: '' });
      // setValidated(false);
    } catch (error) {
      console.error("Error en simulación de envío:", error);
      setSubmitError(error.message || 'Ocurrió un error al intentar enviar el mensaje. Por favor, inténtalo de nuevo.');
      setIsSubmitted(false); // Asegurarse que no muestre el mensaje de éxito si hay error
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="success">
          <h3>¡Gracias por tu mensaje!</h3>
          <p>Nos pondremos en contacto contigo pronto (simulación).</p>
        </Alert>
        <Button variant="primary" onClick={() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setValidated(false);
          setSubmitError(null);
        }}>Enviar otro mensaje</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mb-4 text-center">Contáctanos</h2>
          {submitError && <Alert variant="danger">{submitError}</Alert>} {/* Mostrar error de envío */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingName" label="Nombre completo" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting} // Deshabilitar si está enviando
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa tu nombre.
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="floatingEmail" label="Correo electrónico" className="mb-3">
              <Form.Control
                type="email"
                placeholder="nombre@ejemplo.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting} // Deshabilitar si está enviando
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa un correo electrónico válido.
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="floatingSubject" label="Asunto" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Asunto de tu mensaje"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting} // Deshabilitar si está enviando
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa el asunto.
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="floatingMessage" label="Mensaje" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Escribe tu mensaje aquí"
                style={{ height: '150px' }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting} // Deshabilitar si está enviando
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa tu mensaje.
              </Form.Control.Feedback>
            </FloatingLabel>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg" disabled={isSubmitting}> {/* Deshabilitar si está enviando */}
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Enviando...</span>
                  </>
                ) : (
                  'Enviar Mensaje'
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;
