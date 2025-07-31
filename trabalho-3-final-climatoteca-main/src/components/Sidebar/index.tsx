import DownloadButton from '../DownloadButton';
import HistoryButton from '../HistoryButton';
import ThemeButton from '../ThemeButton';
import styles from './style.module.css';

const Sidebar = () => {
  return (
    <div className="sidebar card">
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonCont}>
          <ThemeButton />
          <span className={styles.tooltip}>Alterar Tema</span>
        </div>

        <div className={styles.buttonCont}>
          <HistoryButton />
          <span className={styles.tooltip}>Histórico de cidades</span>
        </div>
        <div className={styles.buttonCont}>
          <DownloadButton />
          <span className={styles.tooltip}>Exportar em PDF</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
