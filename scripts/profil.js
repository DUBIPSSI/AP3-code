import axios from 'axios';

window.addEventListener('load', ()=>{
    // Fonction pour obtenir la valeur d'un cookie spécifique
function getCookieValue(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Utilisez cette fonction pour obtenir le token
let token = getCookieValue('loginToken');

// Configurez les en-têtes d'autorisation pour Axios
let config = {
    headers: {
        'Authorization': 'Bearer ' + token
    }
}

// Envoyez la requête GET à la route /get/user
axios.get('http://localhost:3000/get/user', config)
    .then(response => {
        console.log(response.data);
        // Traitez ici la réponse du serveur
    })
    .catch(error => {
        console.error('Erreur lors de la requête:', error);
        // Gérez ici les erreurs potentielles
    });

})