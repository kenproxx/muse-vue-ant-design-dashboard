export function setSession(key, value) {
    sessionStorage.setItem(key, value);
}

export function getSession(key) {
    return sessionStorage.getItem(key);
}

export function removeSession(key) {
    sessionStorage.removeItem(key);
}

export function clearSession() {
    sessionStorage.clear();
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

export function clearLocal() {
    localStorage.clear();
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const NGANH = 'NGANH'
export const GIOI_TINH = 'GIOI_TINH'
export const CAP_BAC = 'CAP_BAC'

export const USER_INFO = 'USER_INFO'
export const ROLE_USER = 'ROLE_USER'




