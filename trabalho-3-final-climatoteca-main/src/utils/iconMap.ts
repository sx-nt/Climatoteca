interface IconMapInterface { icon: string, description: string }

const iconMap: Record<string, IconMapInterface> = {
  // céu limpo
  '01d': { icon: '/src/assets/images/sol.png', description: 'Céu limpo' },
  '01n': { icon: '/src/assets/images/lua.png', description: 'Céu limpo' },

  // poucas nuvens
  '02d': { icon: '/src/assets/images/pouco-nublado-roxo.png', description: 'Céu com poucas nuvens' },
  '02n': { icon: '/src/assets/images/noite-pouco-nublado-roxo.png', description: 'Céu com poucas nuvens' },

  // nuvens dispersas
  '03d': { icon: '/src/assets/images/nuvens-roxo.png', description: 'Nuvens dispersas' },
  '03n': { icon: '/src/assets/images/noite-nublado-roxo.png', description: 'Nuvens dispersas' },

  // nuvens quebradas
  '04d': { icon: '/src/assets/images/nublado-roxo.png', description: 'Céu nublado' },
  '04n': { icon: '/src/assets/images/noite-nublado-roxo.png', description: 'Céu nublado' },

  // chuva leve
  '09d': { icon: '/src/assets/images/nuvens-chuva-roxa.png', description: 'Chuva leve' },
  '09n': { icon: '/src/assets/images/noite-chuva-roxo.png', description: 'Chuva leve' },

  // chuva
  '10d': { icon: '/src/assets/images/dia-chuva-roxo.png', description: 'Chuva' },
  '10n': { icon: '/src/assets/images/noite-chuva-roxo.png', description: 'Chuva' },

  // tempestade
  '11d': { icon: '/src/assets/images/raio-roxo.png', description: 'Tempestade' },
  '11n': { icon: '/src/assets/images/noite-tempestade-roxo.png', description: 'Tempestade' },

  // neve
  '13d': { icon: '/src/assets/images/neve.png', description: 'Neve' },
  '13n': { icon: '/src/assets/images/neve.png', description: 'Neve' },

  // névoa
  '50d': { icon: '/src/assets/images/vento.png', description: 'Névoa' },
  '50n': { icon: '/src/assets/images/vento.png', description: 'Névoa' },
};

export default iconMap