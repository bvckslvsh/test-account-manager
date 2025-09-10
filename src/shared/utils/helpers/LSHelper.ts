export default class LSHelper {
  static put(object: Record<string, unknown>) {
    for (let [key, val] of Object.entries(object)) {
      localStorage.setItem(key, JSON.stringify(val));
    }
  }

  static get<T>(name: string): T | null {
    const item = localStorage.getItem(name);
    return item ? (JSON.parse(item) as T) : null;
  }

  static remove(name: string) {
    localStorage.removeItem(name);
  }

  static clear() {
    localStorage.clear();
  }
}
