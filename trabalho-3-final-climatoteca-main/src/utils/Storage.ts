class Storage<T> {

  private KEY: string;
  private PARSER: (item: any) => T;

  constructor(key: string, parser: (item: any) => T) {
    this.KEY = 'climatoteca:' + key;
    this.PARSER = parser;
  }

  public saveToLocalStorage(data: T[]): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Falha ao salvar dados no LocalStorage:', error);
    }
  }

  public loadFromLocalStorage(): T[] {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed.map(this.PARSER);
    } catch (error) {
      console.error('Falha ao carregar dados do LocalStorage:', error);
      return [];
    }
  }

  get key() { return this.KEY; }
  get parser() { return this.PARSER; }
}

export default Storage;
