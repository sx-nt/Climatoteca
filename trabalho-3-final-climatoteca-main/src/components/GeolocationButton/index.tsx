import { useEffect } from 'react';
import { useCoord } from '../../contexts/LocationContext';
import styles from './style.module.css';
import { TbCurrentLocation } from 'react-icons/tb';

// componente do botão de geolocalização
const GeoLocationButton = () => {
  // acessa a função setLocation do contexto pra salvar a localização
  const { setLocation } = useCoord();

  // função q usa a API do navegador pra pegar a localização do usuário
  // se conseguir, chama setLocation com latitude e longitude
  // se der erro, mostra no console
  function getGeoLocation(): void {
    navigator.geolocation.getCurrentPosition(
      loc =>
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        }),
      error => console.error('n foi possível acessar a geolocalização: ', error)
    );
  }

  // executa a função automaticamente quando o componente é carregado
  // só roda 1x por causa do array vazio []
  useEffect(() => {
    getGeoLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      className={`${styles.button} ${styles.geolocation}`}
      type="button"
      onClick={getGeoLocation}
    >
      <TbCurrentLocation className={styles.icon} />
    </button>
  );
};

export default GeoLocationButton;
