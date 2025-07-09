import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery'; /*instalo dependencia con npm install*/
import styles from '../page.module.css';
import "react-image-gallery/styles/css/image-gallery.css";

export default function Carrusel({ planetas, planetaSeleccionado, onSelectPlaneta }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const formattedImages = planetas.map(planeta => ({
      original: planeta.imagen,
      thumbnail: planeta.imagen,
      originalAlt: planeta.nombre,
      thumbnailAlt: planeta.nombre,
      description: planeta.nombre,
      originalClass: styles.galleryImage,
      renderItem: () => (
        <div className={styles.galleryItem} onClick={() => onSelectPlaneta(planeta)}>
          <img 
            src={planeta.imagen} 
            alt={planeta.nombre}
            className={styles.planetaImagen}
          />
        </div>
      )
    }));
    setImages(formattedImages);
  }, [planetas, onSelectPlaneta]);

  return (
    <div className={styles.carruselContainer}>
      <ImageGallery
        items={images}
        autoPlay={true}
        slideInterval={5000}/*5 segudns*/
        slideDuration={700}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={false}
        showBullets={true}
        additionalClass={styles.galleryWrapper}
        onSlide={(index) => onSelectPlaneta(planetas[index])}
      />
    </div>
  );
}