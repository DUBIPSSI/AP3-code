import axios from 'axios';
import { isLogged, getCookieValue } from './tools';

const signinOnglet = document.querySelector('#signinOnglet');
const signupOnglet = document.querySelector('#signupOnglet');
const signinForm = document.querySelector('#signinForm');
const signupForm = document.querySelector('#signupForm');
const inputs = document.querySelectorAll('input')

window.addEventListener('load', async () => {
    let token = getCookieValue('loginToken');
    if (await isLogged(token)) {
        window.location.href = '/profil';
    }
});

function verifName(name) {
    const regex = /^[A-Z][a-z]{0,26}$/;
    return regex.test(name);
}
function verifMail(mail) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(mail);
}
function verifMdp(mdp) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(mdp);
}
function verifCodepostal(code) {
    const regex = /^\d{5}$/;
    return regex.test(code);
}
function verifbirthDate(date) {
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(date)) {
        try {
            const dateObj = new Date(date);
            const currentDate = new Date();
            const tenYearsAgo = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
            return dateObj <= tenYearsAgo;
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
}

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        if (e.target.name === 'name') {
            verifName(e.target.value) ? e.target.classList.remove('wrong') : e.target.classList.add('wrong');
        } else if (e.target.name === 'mail') {
            verifMail(e.target.value) ? e.target.classList.remove('wrong') : e.target.classList.add('wrong');
        } else if (e.target.name === 'password') {
            verifMdp(e.target.value) ? e.target.classList.remove('wrong') : e.target.classList.add('wrong');
        } else if (e.target.name === 'codePostal') {
            verifCodepostal(e.target.value) ? e.target.classList.remove('wrong') : e.target.classList.add('wrong');
        } else if (e.target.name === 'birthDate') {
            verifbirthDate(e.target.value) ? e.target.classList.remove('wrong') : e.target.classList.add('wrong');
        }
    });
});
window.addEventListener('load', () => {

})

document.addEventListener('click', (e) => {
    if (e.target.closest('#onglets')) {
        signinOnglet.classList.toggle('selectedOnglet');
        signupOnglet.classList.toggle('selectedOnglet');
        signinForm.classList.toggle('notSelectedForm');
        signupForm.classList.toggle('notSelectedForm');
    }
    if (e.target.id == "signupbtn") {
        const form = e.target.closest("#signupForm");
        const firstName = form.querySelector("#signupName").value;
        const lastName = form.querySelector("#signupLastname").value;
        const email = form.querySelector("#signupEmail").value;
        const birthDate = form.querySelector("#signupBirthdate").value;
        const codePostal = form.querySelector("#signupCodepostal").value;
        const role = parseInt(form.querySelector("#signupRole").value);
        const password = form.querySelector("#signupPassword").value;
        const passwordConfirmation = form.querySelector("#signupPasswordConfirmation").value;

        if (verifName(firstName)) {
            if (verifName(lastName)) {
                if (verifMail(email)) {
                    if (verifbirthDate(birthDate)) {
                        if (verifCodepostal(codePostal)) {
                            axios.get('https://api-adresse.data.gouv.fr/search/?q=' + codePostal + '&limit=1')
                                .then(res => {
                                    let data = res.data;
                                    let city = data.features[0].properties.city;
                                    let contextArray = data.features[0].properties.context.split(", ");
                                    let departement = contextArray[1];
                                    if (verifMdp(password)) {
                                        if (password === passwordConfirmation) {
                                            console.log("ville : " + city + " departement : " + departement);
                                            axios.post('http://localhost:3000/post/add', {
                                                username: firstName,
                                                userprenom: lastName,
                                                email: email,
                                                password: password,
                                                birth: birthDate,
                                                role: role,
                                                departement: departement,
                                                ville: city
                                            })
                                                .then(response => {
                                                    console.log(response);
                                                    var now = new Date();
                                                    now.setTime(now.getTime() + (2 * 24 * 60 * 60 * 1000));
                                                    var expires = "expires=" + now.toUTCString();
                                                    document.cookie = "loginToken=" + response.data.token + "; " + expires + "; path=/";
                                                    window.location.href = '/profil';
                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                });
                                        } else {
                                            console.log('Les mots de passe ne correspondent pas');
                                        }
                                    } else {
                                        console.log('mot de passe invalide');
                                    }
                                })
                                .catch(error => {
                                    console.error("Erreur lors de la récupération des données : ", error);
                                });
                        } else {
                            console.log('code postal invalide');
                        }
                    } else {
                        return console.log('birthdate invalide');
                    }
                } else {
                    return console.log('mauvais mail');
                }
            } else {
                return console.log('mauvais nom');
            }
        } else {
            return console.log('mauvais prénom');
        }
    }
    if (e.target.id == "signinbtn") {
        const form = e.target.closest("#signinForm");

        const email = form.querySelector("#signupmail").value;
        const password = form.querySelector("#signupmdp").value;

        axios.post('http://localhost:3000/post/login', {
            email: email,
            password: password,
        })
            .then(res => {
                var now = new Date();
                now.setTime(now.getTime() + (2 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + now.toUTCString();
                document.cookie = "loginToken=" + res.data.token + "; " + expires + "; path=/";
                window.location.href = '/profil';
            })
            .catch(error => {
                console.log(error)
            })
    }

})