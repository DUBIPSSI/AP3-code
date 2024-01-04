import axios from 'axios';
import { isLogged, getCookieValue } from './tools';

window.addEventListener('load', async () => {
  let token = getCookieValue('loginToken');
  if (await isLogged(token)) {
    axios.get(`http://localhost:3000/get/utilisateur?token=${token}`)
      .then((response) => {
        console.log(response.data);
        document.getElementById('nom').textContent = response.data[0].nom;
        document.getElementById('prenom').textContent = response.data[0].prenom;
        document.getElementById('naissance').textContent = response.data[0].date_de_naissance;
        document.getElementById('mail').textContent = response.data[0].mail;
        document.getElementById('avatar').src = 'assets/' + response.data[0].avatar;
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
  if (e.target.closest('#edit-avatar')) {
    document.querySelector('.newAvatarContainer').style.display = "flex";
  }
  if (e.target.classList.contains('newAvatarContainer')) {
    document.querySelector('.newAvatarContainer').style.display = "none";
  }
  if (e.target.classList.contains('newAvatar')) {
    
  }
});