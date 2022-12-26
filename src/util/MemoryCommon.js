export function setSession(key, value) {
    sessionStorage.setItem(key, value);
}

export function getSession(key) {
    return sessionStorage.getItem(key);
}

export function removeSession(key) {
    sessionStorage.removeItem(key);
}

export function setLocal(key, value) {
    localStorage.setItem(key, value);
}

export function getLocal(key) {
    return localStorage.getItem(key);
}

export function removeLocal(key) {
    localStorage.removeItem(key);
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN'

export const baseURL = 'http://localhost:3100' ;

