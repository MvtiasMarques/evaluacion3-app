import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

// Importa las imágenes directamente
import logo from '../../public/images/products/Logo.webp';
import img1 from '../../public/images/products/Imagen 1.jpg';
import img2 from '../../public/images/products/Imagen 2.jpg';
import img3 from '../../public/images/products/Imagen 3.jpg';
import img4 from '../../public/images/products/Imagen 4.jpg';
import img5 from '../../public/images/products/Imagen 5.jpg';
import img6 from '../../public/images/products/Imagen 6.jpg';

const ProductCarousel = () => {
    const images = [
        { src: logo, alt: 'Perfecto para el invierno' },
        { src: img1, alt: 'Excelente calidad' },
        { src: img2, alt: 'Bordados a mano' },
        { src: img3, alt: 'Compromiso con el medio ambiente' },
        { src: img4, alt: 'Fabricacion nacional' },
        { src: img5, alt: 'Acabados premium' },
        { src: img6, alt: 'Telas de primer nivel' },
    ];

    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} dynamicHeight>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image.src} alt={image.alt} style={{ maxHeight: '500px', objectFit: 'cover' }} />
                    <p className="legend">{image.alt}</p>
                </div>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;

// Estilos básicos para el carrusel (se pueden mover a un archivo CSS)
const styles = `
.product-carousel {
  position: relative;
  max-width: 600px; /* Ajusta según necesidad */
  margin: auto;
  overflow: hidden; /* Para que las imágenes no se salgan del contenedor */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.carousel-image-container {
  display: flex; /* Facilita futuras animaciones de slide */
  transition: transform 0.5s ease-in-out; /* Para efecto de deslizamiento si se implementa */
}

.carousel-image {
  width: 100%;
  display: block; /* Elimina espacio extra debajo de la imagen */
  object-fit: cover; /* Asegura que la imagen cubra el área sin distorsionarse */
  max-height: 400px; /* Ajusta según necesidad */
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 18px;
  z-index: 10;
  transition: background-color 0.3s ease;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel-button.prev {
  left: 10px;
}

.carousel-button.next {
  right: 10px;
}

.carousel-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease;
}

.carousel-dot.active {
  background-color: white;
}

/* Mejoras para responsividad */
@media (max-width: 768px) {
  .carousel-button {
    padding: 8px 12px;
    font-size: 16px;
  }
  .carousel-dot {
    width: 10px;
    height: 10px;
  }
  .product-carousel {
    max-width: 95%;
  }
  .carousel-image {
    max-height: 300px; 
  }
}

@media (max-width: 480px) {
  .carousel-image {
    max-height: 200px; 
  }
  .carousel-dots {
    bottom: 10px;
  }
}
`;

// Inyectar los estilos en el head del documento
const styleSheetCarousel = document.createElement("style");
styleSheetCarousel.type = "text/css";
styleSheetCarousel.innerText = styles;
document.head.appendChild(styleSheetCarousel);
