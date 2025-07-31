import { useState, useEffect } from 'react';
import { TbMoon, TbSun } from 'react-icons/tb';
import styles from '../Sidebar/style.module.css';
import Storage from '../../utils/Storage';

const ThemeButton = () => {
  const storage = new Storage('theme', (item: any): string => String(item));

  // verifica se tem preferencia de usuario salva quanto ao tema
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = storage.loadFromLocalStorage()[0];
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    // Aplica o tema default q é escuro
    applyTheme(darkMode);
  }, [darkMode]);

  const applyTheme = (isDark: boolean) => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }

    // atualiza o atributo do tema
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyTheme(newMode);
    storage.saveToLocalStorage([newMode ? 'dark' : 'light']);
  };

  return (
    <button className={`${styles.button}`} onClick={toggleTheme}>
      {darkMode ? (
        <TbSun className={`${styles.icon}`} />
      ) : (
        <TbMoon className={`${styles.icon}`} />
      )}
    </button>
  );
};

export default ThemeButton;

// {darkMode ? 'Tema Claro' : 'Tema Escuro'}
//<span className={`${styles.showOnHover}`}>
