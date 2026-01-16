// src/lib/localStorage.js

/**
 * 고유 ID 생성 함수
 * @param {string} prefix - ID 접두사 (예: 'file', 'video', 'slide')
 * @returns {string} 고유 ID
 */
export function generateId(prefix = 'id') {
    const timestamp = Date.now().toString(36)
    const randomPart = crypto.randomUUID().split('-')[0]
    return `${prefix}_${timestamp}_${randomPart}`
}

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
} 
