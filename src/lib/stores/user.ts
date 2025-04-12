import { writable } from 'svelte/store';

export const user = writable<{ studentId: string; name: string } | null>(null);
