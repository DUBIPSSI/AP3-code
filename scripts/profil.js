import axios from 'axios';

window.addEventListener('load', () => {
  // Fonction pour obtenir la valeur d'un cookie spécifique
  function getCookieValue(name) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  let token = getCookieValue('loginToken');
  if (token) {
    axios.get(`http://localhost:3000/get/user?token=${token}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.result == true) {
          axios.get(`http://localhost:3000/get/utilisateur?email=${response.data.email}`)
            .then((response) => {
              console.log(response.data);
              nom = document.getElementById('nom');
              nom.textContent = response.data.nom;
            })
            .catch((error) => {
              console.error('Erreur lors de la requête:', error);
            });
        } else {
          window.location.href = '/login';
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });
  } else {
    window.location.href = '/login';
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('logout')) {
    console.log('baka');
    document.cookie = 'loginToken' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.reload();
  }
});