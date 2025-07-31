import { render, screen } from '@testing-library/react';
import WeatherCard from '.';
import '@testing-library/jest-dom/vitest';
import { describe, test, expect } from 'vitest';


describe('WeatherCard', () => {
  test('verifica se rederiza com todos os dados fornecido', () => {
    render(<WeatherCard title="Temperatura" value="25°C" icon="/icon.png" loading={false} />);
    expect(screen.getByText('Temperatura')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/icon.png');
    expect(image.className).toContain('icon');
  });

  test('testa se o componente não renderiza imagem quando o ícone não é passado', () => {
      render(<WeatherCard title="Umidade" value="60%" loading={false} />);
      const img = screen.queryByRole('img');
      expect(img).not.toBeInTheDocument();
    });
    
    test('testa o loaidng, renderiza skeletons se estiver carregando', () => {
      render(<WeatherCard loading={true} />);
      const skeletons = screen.getAllByText((_, el) =>
        el?.className.includes('skeleton') ?? false
      );
      expect(skeletons.length).toBe(3);
    });

  test('testa se o componente não renderiza a imagem quando o icon é uma string vazia', () => {
    render(<WeatherCard title="Vento" value="0%" icon="" loading={false} />);
    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });

  test('testa se o componente não quebra se nenhuma prop for passada', () => {
    render(<WeatherCard />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument(); 
  });


});
