import { TbSearch } from 'react-icons/tb';
import { useSearch } from '../../hooks/searchHook';
import Suggestions from '../Suggestions';
import GeoLocationButton from '../GeolocationButton';
import styles from './style.module.css';

const Searchbar = () => {
  const {
    input,
    results,
    showFiveMostRecent,
    onSelect,
    onInputChange,
    handleFormSubmit,
  } = useSearch();

  return (
    <div data-testid='searchbar' className={`searchbar card searchbar-wrapper ${styles.wrapper}`}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <input
          className={styles.input}
          value={input}
          onChange={onInputChange}
          onClick={showFiveMostRecent}
          type="text"
          name="city"
          id="search"
          autoComplete="off"
          spellCheck="false"
        />
        <button className={styles.button} type="submit">
          <span className={`hideOnMobile ${styles.hideOnMobile}`}>
            Pesquisar
          </span>
          <TbSearch
            className={`showOnMobile ${styles.icon} ${styles.showOnMobile}`}
          />
        </button>
      </form>

      <GeoLocationButton />

      {results.length > 0 && (
        <Suggestions results={results} onSelect={onSelect} />
      )}
    </div>
  );
};

export default Searchbar;
