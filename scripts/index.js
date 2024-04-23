import { isLogged, getCookieValue } from './tools';
import axios from 'axios';
const eventForm = document.querySelector('#eventForm');
class Event {
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
        prix.textContent = this.prix + "€";

        let capacite = document.createElement('p');
        capacite.textContent = this.capacite + " places";

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
                    <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-207.000000, -257.000000)" fill="var(--mainColor)">
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


document.addEventListener('click', (e) => {
    if (e.target.closest('.likeIcon')) {
        e.target.closest('.likeIcon').classList.toggle('liked');
    }
    if (e.target.closest('.commentIcon')) {
        e.target.closest('.commentIcon').classList.toggle('fillWhite');
        let eventElement = e.target.closest('.eventContainer');
        let commentaire = eventElement.querySelector('.commentaireEvent');
        commentaire.classList.toggle('deployed');
    }
    if (e.target.closest('.messageBtn')) {
        e.target.closest('.messageBtn').classList.toggle('deployedMessage')
    }
    if (e.target.id == 'addevent') {

        eventForm.classList.toggle('hidden')
    }
    if (e.target.id == 'eventForm') {
        console.log(e.target.classList)
        eventForm.classList.toggle('hidden')
    }
    if (e.target.id === 'createbtn') {
        const nom = eventForm.querySelector('#eventName').value;
        const prix = parseInt(eventForm.querySelector('#eventPrix').value);
        const date = eventForm.querySelector('#eventBirthdate').value;
        const ville = eventForm.querySelector('#eventVille').value;
        const description = eventForm.querySelector('#textar').value;
        const capacite = parseInt(eventForm.querySelector('#eventCapacite').value);
        const eventImage = document.getElementById('eventImage');
        var base64String = null;
        if (eventImage.files.length > 0) {
            const file = eventImage.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                console.log("Fichier chargé avec succès :");
                const base64String = reader.result;
                console.log(base64String);
            };

            reader.onerror = function (error) {
                console.log('Erreur lors de la lecture du fichier:', error);
            };

            reader.readAsDataURL(file);
            console.log("Début de la lecture du fichier...");
        }

        console.log(nom, prix, date, ville, description, capacite);

        axios.post('http://m2l.site:3000/post/addEvent', {
            nom: nom,
            description: description,
            lieu: ville,
            prix: prix,
            capacite: capacite,
            date: date,
            image: base64String
        })
            .then(response => {
                console.log("Réponse du serveur :", response.data);
                e.target.closest('#eventForm').classList.add('hidden')
                leBang();
            })
            .catch(error => {
                console.error("Erreur lors de la requête POST : ", error);
            });

    }
    if (e.target.classList.contains('joinBtn')) {
        const id = e.target.closest('.eventContainer').id;
        const token = getCookieValue('loginToken');
        console.log(id, token);
        axios.post('http://m2l.site:3000/post/addParticipation', {
            event_id: id,
            token: token
        })
            .then(response => {
                e.target.textContent = "Rejoins";
                e.target.className = 'joined';
            })
            .catch(error => {
                console.log(error)
            });
    }
    if (e.target.classList.contains('joined')) {
        const id = e.target.closest('.eventContainer').id;
        const token = getCookieValue('loginToken');
        axios.post('http://m2l.site:3000/post/deleteParticipation', {
            event_id: id,
            token: token
        })
            .then(response => {
                e.target.textContent = "Participer";
                e.target.className = 'joinBtn';
            })
            .catch(error => {
                console.log(error)
            });
    }



}
);
async function getEvent() {
    const res = []
    try {
        await axios.get('http://m2l.site:3000/get/evenement')
            .then(response => {
                res.push(...response.data);
            })
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération de l'événement:", error);
        throw error;
    }
    return res
}
async function leBang() {
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = ``;
    try {
        const bangbang = await getEvent();

        console.log(bangbang);

        bangbang.forEach(data => {
            // Diviser la chaîne en date et heure
            const [datePart, timePart] = data.date.split('T');

            // Extraire la partie de la date
            const [year, month, day] = datePart.split('-');

            // Former la date dans le format souhaité
            const formattedDate = `${day}/${month}/${year}`;

            // Supposons que la classe Event soit définie ailleurs dans votre code
            let eventObj = new Event(data.nom, data.description, data.image, formattedDate, data.lieu, data.prix, data.capacite, data.id);

            // Supposons que eventsContainer soit défini ailleurs dans votre code
            let eventElement = eventObj.createEvent();

            // Supposons que eventsContainer soit défini ailleurs dans votre code
            eventsContainer.appendChild(eventElement);
        });
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }

}

// Appelez la fonction leBang pour l'exécuter
leBang();
