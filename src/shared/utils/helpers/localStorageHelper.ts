export default class LSController {
    static put(object: Record<string, string>) {
        for (let [key, val] of Object.entries(object)) {
            localStorage.setItem(key, JSON.stringify(val));
        }
    }

    static get(name: string) {
        const item = localStorage.getItem(name);

        return item ? JSON.parse(item) : null;
    }

    static remove(name: string) {
        localStorage.removeItem(name);
    }

    static clear() {
        localStorage.clear();
    }
}
