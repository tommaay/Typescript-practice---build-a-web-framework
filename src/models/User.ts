import axios, { AxiosResponse } from 'axios';

interface UserData {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = () => void;

export class User {
    events: { [key: string]: Callback[] } = {};

    constructor(private data: UserData) {}

    get(propName: string): number | string {
        return this.data[propName];
    }

    set(update: UserData): void {
        this.data = Object.assign(this.data, update);
    }

    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || !handlers.length) {
            return;
        }

        handlers.forEach((callback) => callback());
    }

    fetch(): void {
        axios
            .get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            });
    }

    save(): void {
        const id = this.get('id');

        if (!id) {
            axios.post('http://localhost:3000/users', this.data);
        } else {
            axios.put(`http://localhost:3000/users/${id}`, this.data);
        }
    }
}
