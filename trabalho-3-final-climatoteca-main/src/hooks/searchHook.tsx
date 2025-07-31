import { useState, useEffect } from 'react';
import type { GeoLocationInterface } from '../interfaces/geolocation';
import { useCoord } from '../contexts/LocationContext';
import { VITE_OPEN_WEATHER_MAP_API_KEY as API_KEY } from '../constants/api';
import Storage from '../utils/Storage';

export const useSearch = () => {
  const DELAY: number = 300;

  const parser = (item: any): GeoLocationInterface => ({ name: item.name, state: item.state, country: item.country, lat: item.lat, lon: item.lon, });
  const storage = new Storage('hist', parser);

  // valor q o usuário digita no input
  const [input, setInput] = useState('');
  // valor do input com delay (debounce) pra evitar chamadas desnecessárias na api
  const [debounce, setDebounce] = useState('');
  // resultado da api depois da busca
  const [results, setResults] = useState<GeoLocationInterface[]>([]);
  // controle pra evitar fazer debounce qnd uma sugestão já foi selecionada
  const [shouldDebounce, setShouldDebounce] = useState(true);
  // acessa a função setLocation do contexto pra salvar a localização
  const { setLocation } = useCoord();

  const [data, setData] = useState<GeoLocationInterface>();

  async function fetchLocation() {
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${debounce}&limit=1&appid=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Falha ao acessar a api de lcoalização.');
      const data: any = await res.json();
      const r: GeoLocationInterface[] = data.map(parser);
      setResults(r);
      setData(r[0]);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  function showFiveMostRecent(): void {
    setResults(storage.loadFromLocalStorage().splice(-5).reverse());
  }

  function onSelect(loc: GeoLocationInterface): void {
    setShouldDebounce(false);
    setInput(loc.name);
    setData(loc);
    setResults([]);
    document.getElementById('search')!.focus();
  }

  function closeAllSuggestions(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const isInsideSearchbar = target.closest('.searchbar');
    if (!isInsideSearchbar) setResults([]);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value: string = e.target.value;
    setInput(value);
    if (!value.trim()) setResults([]);
  }

  function handleFormSubmit(e: React.FormEvent): void {
    e.preventDefault();

    if (!data || !input) return;

    setInput('');
    setResults([]);
    setShouldDebounce(false);
    setLocation({ latitude: data.lat, longitude: data.lon });
    pushToLocalStorage(data);
  }

  function pushToLocalStorage(loc: GeoLocationInterface): void {
    const items: GeoLocationInterface[] = storage.loadFromLocalStorage().filter(item => item.name !== loc.name);
    items.push(loc);
    storage.saveToLocalStorage(items);
  }

  useEffect(() => {
    if (!shouldDebounce) return setShouldDebounce(true);
    const timer = setTimeout(() => {
      setDebounce(input);
    }, DELAY);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    if (!debounce.trim()) return setResults([]);
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  useEffect(() => {
    document.addEventListener('click', closeAllSuggestions);
    return () => {
      document.removeEventListener('click', closeAllSuggestions);
    };
  }, []);

  return { input, results, showFiveMostRecent, onSelect, onInputChange, handleFormSubmit, };
};
