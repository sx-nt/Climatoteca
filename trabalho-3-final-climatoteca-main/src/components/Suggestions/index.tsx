import type { GeoLocationInterface } from '../../interfaces/geolocation';
import styles from './styles.module.css';

interface SuggestionsProps {
  results: GeoLocationInterface[];
  onSelect: (item: GeoLocationInterface) => void;
}

const Suggestions = ({ results, onSelect }: SuggestionsProps) => {
  return (
    <ul className={styles.suggestions}>
      {results.map((item, key) => (
        <li key={key} onClick={() => onSelect(item)}>
          <span>
            <b>{item.name}</b>, <i>{item.state}</i>
          </span>
          <span className={styles.country}>{item.country}</span>
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;
