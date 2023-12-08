import axios from 'axios';
const signinOnglet = document.querySelector('#signinOnglet');
const signupOnglet = document.querySelector('#signupOnglet');
const signinForm = document.querySelector('#signinForm');
const signupForm = document.querySelector('#signupForm');
const inputs = document.querySelectorAll('input')

function verifName(name) {
    const regex = /^[A-Z][a-z]{0,26}$/;
    return regex.test(name);
}
function verifMail(name) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(name);
}
function verifMdp(name) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9<>/'"`]).{12,}$/;
    return regex.test(name);
}

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        if (e.target.name === 'name') {
            verifName(e.target.value) ? e.target.classList.remove('wrong') : e.target.classList.add('wrong');
        } else if (e.target.name === 'mail') {
            verifMail(e.target.value) ? e.target.classList.remove('wrong') : e.target.classList.add('wrong');
        } else if (e.target.name === 'password') {
            verifMdp(e.target.value) ? e.target.classList.remove('wrong') : e.target.classList.add('wrong');
        }
    });
});

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
        const codePostal = form.querySelector("#signupcodepostal").value;
        const role = form.querySelector("#signupRole").value;
        const password = form.querySelector("#signupPassword").value;
        const passwordConfirmation = form.querySelector("#signupPasswordConfirmation").value;



        axios.post('http://localhost:3000/post/add', {

            username: firstName,
            userprenom: lastName,
            email: email,
            password: password,
            birth: birthDate,
            role: role,

        })
            .then(response=> console.log(response + 'ça fonctionne chef'))
            .catch(error => {
                console.log(error)
            })
    }
    if (e.target.id == "signinbtn") {
        const form = e.target.closest("#signinForm");

        const email = form.querySelector("#signupmail").value;
        const password = form.querySelector("#signupmdp").value;

        axios.post('http://localhost:3000/post/login', {

            email: email,
            password: password,


        })
            .then(res => { console.log(res) })
            .catch(error => {
                console.log(error)
            })
    }

})