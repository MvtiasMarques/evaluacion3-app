import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ServiceCard from './components/ServiceCard';
import ProductCarousel from './components/ProductCarousel';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm'; // Importar ContactForm

// URLs de la API
const API_URL_PRODUCTS_SERVICES = 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/products-services/';
const API_URL_ABOUT_US = 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/about-us/';
const API_URL_FAQ = 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/faq/';

const API_TOKEN = 'ipss.get'; // Token de autenticación

// --- INICIO: Datos de ejemplo para simulación ---
const sampleProducts = [
  { 
    id: 'prod1', 
    name: 'Lana Natural Premium', 
    image_url: 'https://via.placeholder.com/600x400?text=Lana+Natural', 
    description: 'Suave lana natural, perfecta para tus proyectos de tejido.' 
  },
  { 
    id: 'prod2', 
    name: 'Kit de Agujas Crochet', 
    image_url: 'https://via.placeholder.com/600x400?text=Kit+Crochet', 
    description: 'Completo kit con agujas de crochet de varios tamaños.' 
  },
  { 
    id: 'prod3', 
    name: 'Patrón de Chaleco Tejido', 
    image_url: 'https://via.placeholder.com/600x400?text=Patron+Chaleco', 
    description: 'Patrón exclusivo para tejer un hermoso chaleco.' 
  },
];

const sampleServices = [
  { 
    id: 'serv1', 
    service_name: 'Taller de Crochet Básico', 
    image_url: 'https://via.placeholder.com/300x200?text=Taller+Crochet', 
    description: 'Aprende los puntos básicos del crochet y crea tu primera pieza. Incluye materiales.', 
    duration: '2 horas' 
  },
  { 
    id: 'serv2', 
    service_name: 'Asesoría Personalizada de Tejido', 
    image_url: 'https://via.placeholder.com/300x200?text=Asesoria+Tejido', 
    description: 'Resuelve tus dudas y mejora tu técnica con una sesión uno a uno.', 
    duration: '1 hora' 
  },
];
// --- FIN: Datos de ejemplo para simulación ---

function App() {
  const [productsForCarousel, setProductsForCarousel] = useState([]);
  const [servicesForCards, setServicesForCards] = useState([]);
  const [aboutUsData, setAboutUsData] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        };

        // Fetch Productos y Servicios
        const psResponse = await fetch(API_URL_PRODUCTS_SERVICES, { headers });
        if (!psResponse.ok) {
          console.warn(`Error ${psResponse.status} en products-services: ${psResponse.statusText}. Usando datos de ejemplo.`);
          // Usar datos de ejemplo si la API falla o no devuelve datos
          setProductsForCarousel(sampleProducts.map(p => ({ 
              src: p.image_url || p.imageUrl || p.image || 'https://via.placeholder.com/600x400?text=Producto', 
              alt: p.name || p.product_name || p.title || 'Producto',
              caption: p.name || p.product_name || p.title, // Añadir caption para el carrusel
              description: p.description 
          })));
          setServicesForCards(sampleServices);
        } else {
          const psData = await psResponse.json();
          console.log("Respuesta de API Products-Services (psData):", JSON.stringify(psData, null, 2));
          
          let items = [];
          if (psData && Array.isArray(psData.data) && psData.data.length > 0) {
              items = psData.data;
          } else if (psData && Array.isArray(psData.results) && psData.results.length > 0) {
              items = psData.results;
          } else if (Array.isArray(psData) && psData.length > 0) {
              items = psData;
          } else if (psData && psData.products && Array.isArray(psData.products) && psData.services && Array.isArray(psData.services)) {
              setProductsForCarousel((psData.products || []).map(p => ({ 
                  src: p.imageUrl || p.image_url || p.image || 'https://via.placeholder.com/600x400?text=Producto', 
                  alt: p.name || p.product_name || 'Producto',
                  caption: p.name || p.product_name,
                  description: p.description
              })));
              setServicesForCards(psData.services || []);
          } else {
              console.warn("La estructura de datos de products-services no es la esperada o está vacía. Usando datos de ejemplo.", psData);
              // Usar datos de ejemplo si la API devuelve datos vacíos o estructura no esperada
              setProductsForCarousel(sampleProducts.map(p => ({ 
                src: p.image_url || p.imageUrl || p.image || 'https://via.placeholder.com/600x400?text=Producto', 
                alt: p.name || p.product_name || p.title || 'Producto',
                caption: p.name || p.product_name || p.title,
                description: p.description
              })));
              setServicesForCards(sampleServices);
          }

          if (items.length > 0) {
              const potentialProducts = items.filter(item => 
                  item.type === 'product' || 
                  item.hasOwnProperty('price') || 
                  item.product_name || 
                  (item.name && !item.hasOwnProperty('duration'))
              );
              
              const potentialServices = items.filter(item => 
                  item.type === 'service' || 
                  item.hasOwnProperty('duration') || 
                  item.service_name || 
                  (item.title && !item.hasOwnProperty('price'))
              );

              setProductsForCarousel(potentialProducts.map(p => ({ 
                  src: p.imageUrl || p.image_url || p.image || 'https://via.placeholder.com/600x400?text=Producto', 
                  alt: p.name || p.product_name || p.title || 'Producto',
                  caption: p.name || p.product_name || p.title,
                  description: p.description
              })));
              setServicesForCards(potentialServices);

              if (potentialProducts.length === 0 && potentialServices.length === 0 && items.length > 0) {
                   console.warn("No se pudieron distinguir productos de servicios a partir de los items. Usando todos para ambas secciones como fallback. Verifique los criterios de filtrado y los datos de la API.", items);
                   setProductsForCarousel(items.map(p => ({ 
                      src: p.imageUrl || p.image_url || p.image || 'https://via.placeholder.com/600x400?text=Item', 
                      alt: p.name || p.title || 'Item',
                      caption: p.name || p.title,
                      description: p.description
                  })));
                  setServicesForCards(items);
              }
          } else if (!(psData && psData.products && psData.services) && items.length === 0) { 
              // Si no hay 'items' y tampoco la estructura explícita products/services, y no se usaron ya los de ejemplo por error de API
              // Esto asegura que si la API devuelve {data: []} explícitamente, se usen los de ejemplo.
              if (productsForCarousel.length === 0 && servicesForCards.length === 0) {
                console.warn("API devolvió datos vacíos para products-services. Usando datos de ejemplo.");
                setProductsForCarousel(sampleProducts.map(p => ({ 
                    src: p.image_url || p.imageUrl || p.image || 'https://via.placeholder.com/600x400?text=Producto', 
                    alt: p.name || p.product_name || p.title || 'Producto',
                    caption: p.name || p.product_name || p.title,
                    description: p.description
                })));
                setServicesForCards(sampleServices);
              }
          }
        }

        // Fetch Sobre Nosotros
        const aboutUsResponse = await fetch(API_URL_ABOUT_US, { headers });
        if (!aboutUsResponse.ok) throw new Error(`Error ${aboutUsResponse.status} en about-us: ${aboutUsResponse.statusText}`);
        const aboutData = await aboutUsResponse.json();
        let finalAboutData = {};

        if (aboutData && typeof aboutData.data === 'string') {
            // Si aboutData.data es un string, lo usamos como contenido principal
            finalAboutData = { title: 'Sobre Tejelanas Vivi', content: aboutData.data, imageUrl: null };
        } else if (aboutData && typeof aboutData.data === 'object' && aboutData.data !== null) {
            finalAboutData = Array.isArray(aboutData.data) ? (aboutData.data[0] || {}) : aboutData.data;
        } else if (Array.isArray(aboutData) && aboutData.length > 0) {
            finalAboutData = aboutData[0] || {};
        } else if (aboutData && aboutData.results && Array.isArray(aboutData.results) && aboutData.results.length > 0) {
            finalAboutData = aboutData.results[0] || {};
        } else if (typeof aboutData === 'object' && aboutData !== null && !Array.isArray(aboutData) && Object.keys(aboutData).length > 0 && !aboutData.data && !aboutData.results) {
            finalAboutData = aboutData; // Direct object
        } else {
            console.warn("La estructura de datos de about-us no es la esperada, está vacía o no es un objeto con contenido.", aboutData);
        }
        setAboutUsData(finalAboutData);

        // Fetch Preguntas Frecuentes
        const faqResponse = await fetch(API_URL_FAQ, { headers });
        if (!faqResponse.ok) throw new Error(`Error ${faqResponse.status} en faq: ${faqResponse.statusText}`);
        const faqD = await faqResponse.json();
        console.log("Respuesta de API FAQ (faqD):", JSON.stringify(faqD, null, 2)); // Para inspeccionar la estructura
        
        let finalFaqData = [];
        if (faqD && Array.isArray(faqD.data)) {
            finalFaqData = faqD.data;
        } else if (faqD && Array.isArray(faqD.results)) {
            finalFaqData = faqD.results;
        } else if (Array.isArray(faqD)) {
            finalFaqData = faqD;
        } else {
            console.warn("La estructura de datos de faq no es la esperada o está vacía. Verifique la respuesta de la API.", faqD);
        }
        setFaqData(finalFaqData);
        console.log("Datos finales para FAQ (finalFaqData):", JSON.stringify(finalFaqData, null, 2)); // Para inspeccionar los datos procesados

      } catch (err) {
        console.error("Error al cargar datos de la API:", err);
        setError(err.message);
        // Mantener datos de ejemplo o vacíos en caso de error para que la app no rompa
        setProductsForCarousel([]); 
        setServicesForCards([]);
        setAboutUsData({}); 
        setFaqData([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ... (comentando datos de ejemplo originales)
  // const productImages = [...];
  // const serviceInfo = {...};

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.5em' }}>Cargando contenido...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em', color: 'red' }}>Error al cargar: {error}. Por favor, intenta recargar la página.</div>;
  }

  return (
    <>
      <Navbar />
      <header style={{ textAlign: 'center', margin: '20px' }}>
        <h1>Tejelanas Vivi</h1>
      </header>

      {/* Sección Quiénes Somos */}
      {aboutUsData && (aboutUsData.title || aboutUsData.content) && (
        <section id="quienes-somos-section" style={{ paddingTop: '56px', margin: '40px 20px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h2>{aboutUsData.title || 'Quiénes Somos'}</h2>
          {(aboutUsData.imageUrl || aboutUsData.image_url) && 
            <img src={aboutUsData.imageUrl || aboutUsData.image_url} 
                 alt={aboutUsData.title || 'Sobre nosotros'} 
                 style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px', marginBottom: '15px' }}
                 loading="lazy" // Añadido lazy loading
                 />
          }
          <p>{aboutUsData.content || aboutUsData.description || 'Contenido no disponible.'}</p>
        </section>
      )}

      {/* Sección Talleres/Servicios */}
      <section id="talleres-servicios-section" style={{ paddingTop: '56px', margin: '40px 0' }}>
        <h2 style={{ textAlign: 'center' }}>Nuestros Talleres y Servicios</h2>
        {servicesForCards.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {servicesForCards.map((service, index) => (
              <ServiceCard 
                key={service.id || service.service_id || index}
                imageUrl={service.imageUrl || service.image_url || service.image || 'https://via.placeholder.com/300x200?text=Servicio'}
                title={service.title || service.name || service.service_name || 'Servicio Destacado'}
                description={service.description || 'Descripción no disponible.'}
                productName={service.productName || service.name || service.service_name || 'Servicio'}
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No hay talleres o servicios disponibles en este momento.</p>
        )}
      </section>

      {/* Sección Productos Destacados con Carrusel */}
      <section id="productos-section" style={{ paddingTop: '56px', margin: '40px 0' }}>
        <h2 style={{ textAlign: 'center' }}>Galeria de Productos</h2>
        {productsForCarousel.length > 0 ? (
          <ProductCarousel images={productsForCarousel} />
        ) : (
          <p style={{ textAlign: 'center' }}>Actualmente no hay productos destacados para mostrar. Intenta más tarde.</p>
        )}
      </section>

      {/* Sección Preguntas Frecuentes */}
      {faqData.length > 0 && (
        <section id="faq-section" style={{ paddingTop: '56px', margin: '40px 20px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h2 style={{ textAlign: 'center' }}>Preguntas Frecuentes</h2>
          <div>
            {faqData.map((faqItem, index) => (
              <details key={faqItem.id || faqItem.faq_id || faqItem.titulo || index} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>{faqItem.titulo || 'Pregunta no disponible'}</summary>
                <p style={{ marginTop: '5px', paddingLeft: '15px' }}>{faqItem.respuesta || 'Respuesta no disponible.'}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      
      {/* Sección Contacto */}
      <section id="contacto-section" style={{ paddingTop: '56px', paddingBottom: '40px' }}>
        <ContactForm />
      </section>
      
      {/* ... (contenido original de Vite + React comentado) ... */}
    </>
  );
}

export default App;
