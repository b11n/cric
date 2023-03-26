import { writable } from 'svelte/store';

type User = {
 uid: string;
 email: string;
 userName: string;
};
export const auth = writable<User | null>(null);