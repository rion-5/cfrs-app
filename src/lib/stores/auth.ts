import { writable } from 'svelte/store';

export interface AuthState {
    isLoggedIn: boolean;
    token?: string;
    user_name?: string;
    id_no?: string;
    dept_name?: string;
    dept_code?: string;
}

const initialAuthState: AuthState = {
    isLoggedIn: false,
};

export const auth = writable<AuthState>(initialAuthState);

export function logout() {
  localStorage.removeItem('accessToken'); // 혹시 저장했었다면
  auth.set({
    isLoggedIn: false,
    token: null,
    user_name: null,
    id_no: null,
    dept_name: null,
    dept_code: null
  })
}