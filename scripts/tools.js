import axios from 'axios';

export async function isLogged(token) {
    try {
        const response = await axios.get(`http://localhost:3000/get/user?token=${token}`);
        return response.data === true;
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        return false;
    }
}

export function getCookieValue(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}