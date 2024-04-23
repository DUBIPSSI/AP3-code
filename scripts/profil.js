import axios from 'axios';
import { isLogged, getCookieValue } from './tools';

class Joined {
  constructor(titre, description, img, date, lieu, prix, capacite, id) {
    this.titre = titre;
    this.description = description;
    this.img = img;
    this.date = date;
    this.lieu = lieu;
    this.prix = prix;
    this.capacite = capacite;
    this.id = id;
  }

  createEvent() {
    let eventContainer = document.createElement('div');
    eventContainer.className = 'eventContainer';
    eventContainer.id = this.id;

    let img = document.createElement('img');
    img.src = this.img;

    let infoContainer = document.createElement('div');
    infoContainer.className = 'infoContainer';

    let primaryInfo = document.createElement('div');
    primaryInfo.className = "primaryInfo";

    let otherInfo = document.createElement('div');
    otherInfo.className = "otherInfo";

    let titre = document.createElement('h3');
    titre.textContent = this.titre;

    let description = document.createElement('p');
    description.textContent = this.description;

    let date = document.createElement('p');
    date.textContent = this.date;

    let lieu = document.createElement('p');
    lieu.textContent = this.lieu;

    let prix = document.createElement('p');
    prix.textContent = this.prix;

    let capacite = document.createElement('p');
    capacite.textContent = this.capacite;

    let eventFooter = document.createElement('div');
    eventFooter.className = "eventFooter";

    let eventFooterIcons = document.createElement('div');
    eventFooterIcons.className = "footerIcons";

    let commentIcon = document.createElement('div');
    commentIcon.innerHTML = `
        <svg width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
            <defs>
        </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-207.000000, -257.000000)" fill="#fec816">
                    <path d="M231,273 C229.896,273 229,272.104 229,271 C229,269.896 229.896,269 231,269 C232.104,269 233,269.896 233,271 C233,272.104 232.104,273 231,273 L231,273 Z M223,273 C221.896,273 221,272.104 221,271 C221,269.896 221.896,269 223,269 C224.104,269 225,269.896 225,271 C225,272.104 224.104,273 223,273 L223,273 Z M215,273 C213.896,273 213,272.104 213,271 C213,269.896 213.896,269 215,269 C216.104,269 217,269.896 217,271 C217,272.104 216.104,273 215,273 L215,273 Z M223,257 C214.164,257 207,263.269 207,271 C207,275.419 209.345,279.354 213,281.919 L213,289 L220.009,284.747 C220.979,284.907 221.977,285 223,285 C231.836,285 239,278.732 239,271 C239,263.269 231.836,257 223,257 L223,257 Z" id="comment-3" sketch:type="MSShapeGroup"></path>
                </g>
            </g>
        </svg>`;
    commentIcon.className = "commentIcon";

    let joinBtn = document.createElement('button');
    joinBtn.className = "joinBtn";
    joinBtn.textContent = "Participer";

    let commentaire = document.createElement('div');
    commentaire.className = "commentaireEvent";

    let commentaireTitle = document.createElement('h2');
    commentaireTitle.textContent = "Commentaire(s)";

    let hr = document.createElement('hr');

    primaryInfo.appendChild(titre);
    primaryInfo.appendChild(description);

    otherInfo.appendChild(date);
    otherInfo.appendChild(lieu);
    otherInfo.appendChild(prix);
    otherInfo.appendChild(capacite);

    infoContainer.appendChild(primaryInfo);
    infoContainer.appendChild(otherInfo);

    eventFooterIcons.appendChild(commentIcon)

    eventFooter.appendChild(eventFooterIcons);
    eventFooter.appendChild(joinBtn);

    commentaire.appendChild(commentaireTitle)
    commentaire.appendChild(hr)

    eventContainer.appendChild(img);
    eventContainer.appendChild(infoContainer);
    eventContainer.appendChild(eventFooter);
    eventContainer.appendChild(commentaire);

    return eventContainer;
  }
}

window.addEventListener('load', async () => {
  let token = getCookieValue('loginToken');
  if (await isLogged(token)) {
    axios.get(`http://m2l.site:3000/get/utilisateur?token=${token}`)
      .then((response) => {
        document.getElementById('nom').textContent = response.data[0].nom;
        document.getElementById('prenom').textContent = response.data[0].prenom;
        document.getElementById('naissance').textContent = response.data[0].date_de_naissance;
        document.getElementById('mail').textContent = response.data[0].mail;
        document.getElementById('avatar').src = 'assets/' + response.data[0].avatar;
        var now = new Date();
        now.setTime(now.getTime() + (2 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + now.toUTCString();
        document.cookie = "mail=" + response.data[0].mail + "; " + expires + "; path=/";
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });
    axios.get(`http://m2l.site:3000/get/getJoinedEvents?token=${token}`)
      .then((response) => {
        const eventsContainer = document.getElementById('joinedContainer');
        eventsContainer.innerHTML = ``;
        try {
            const bangbang = response.data;
            console.log(bangbang);
    
            bangbang.forEach(data => {
                const [datePart, timePart] = data.date.split('T');
                const [year, month, day] = datePart.split('-');
                const formattedDate = `${day}/${month}/${year}`;
                let eventObj = new Joined(data.nom, data.description, "assets/imgEvent/tournoiFoot.png", formattedDate, data.lieu, data.prix, data.capacite, data.id);
                let eventElement = eventObj.createEvent();
                eventsContainer.appendChild(eventElement);
            });
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
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
  if (e.target.closest('#edit-avatar')) {
    document.querySelector('.newAvatarContainer').style.display = "flex";
  }
  if (e.target.classList.contains('newAvatarContainer')) {
    document.querySelector('.newAvatarContainer').style.display = "none";
  }
  if (e.target.classList.contains('newAvatar')) {
    const avatar = e.target.alt;
    axios.post('http://m2l.site:3000/update/updateAvatar', {
      avatar: avatar,
      email: getCookieValue('mail')
    })
      .then(response => {
        document.getElementById('avatar').src = 'assets/' + avatar;
        document.querySelector('.newAvatarContainer').style.display = "none";
      })
      .catch(error => {
        console.log(error)
      });
  }
});