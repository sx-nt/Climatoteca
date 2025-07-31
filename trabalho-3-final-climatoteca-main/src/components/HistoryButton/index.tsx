import { useState, useRef } from "react";
import { TbHistory, TbX } from 'react-icons/tb';;
import styles from '../Sidebar/style.module.css';;
import { useCoord } from "../../contexts/LocationContext";
import type { GeoLocationInterface } from "../../interfaces/geolocation";

const HistoryButton = () => {
  const { setLocation } = useCoord();
  const [history, setHistory] = useState<GeoLocationInterface[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('climatoteca:hist');
    return savedHistory ? JSON.parse(savedHistory).reverse() : [];
  };

  const handleOpenDialog = () => {
    setHistory(loadHistory());
    dialogRef.current?.showModal();
  };

  const handleCloseDialog = () => {
    dialogRef.current?.close();
  };

  const handleSelectCity = (city: GeoLocationInterface) => {
    setLocation({ latitude: city.lat, longitude: city.lon });
    handleCloseDialog();
  };

  return (
    <>
      <button className={styles.button} onClick={handleOpenDialog}>
        <TbHistory className={styles.icon} />
      </button>

      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogContent}>
          <h3 className={styles.titleDialog}>Pesquisados Recentemente</h3>
          <div className={styles.historyList}>
            {history.length === 0 ? ( <p>Nenhuma cidade pesquisada recentemente</p> ) : (
              <ul>
                {history.map((city, index) => (
                  <li 
                    key={index} 
                    className={styles.historyItem}
                    onClick={() => handleSelectCity(city)}
                  >
                    {city.name}, {city.state || city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={handleCloseDialog} className={styles.closeButton}>
            <TbX />
          </button>
        </div>
      </dialog>
    </>
  );
};

export default HistoryButton;