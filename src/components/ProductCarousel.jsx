import React, { useState, useEffect } from 'react';

const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p>No hay imágenes para mostrar.</p>;
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Efecto para cambiar automáticamente de slide (opcional)
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 5000); // Cambia cada 5 segundos
    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta o actualiza
  }, [currentIndex, images.length]); // Se ejecuta cuando currentIndex o images.length cambian

  return (
    <div className="product-carousel" aria-roledescription="carousel">
      <button onClick={goToPrevious} className="carousel-button prev" aria-label="Imagen anterior">
        &#10094;
      </button>
      <div className="carousel-image-container" aria-live="polite">
        <img 
          key={currentIndex} // Ayuda a React a identificar cambios para animaciones/transiciones
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="carousel-image"
          loading="lazy" // Añadido lazy loading
        />
      </div>
      <button onClick={goToNext} className="carousel-button next" aria-label="Siguiente imagen">
        &#10095;
      </button>
      <div className="carousel-dots">
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`carousel-dot ${currentIndex === slideIndex ? 'active' : ''}`}
            aria-label={`Ir a la imagen ${slideIndex + 1}`}
            aria-current={currentIndex === slideIndex}
          />
        ))}
      </div>
    </div>
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
