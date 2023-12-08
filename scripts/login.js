import axios from 'axios';
const signinOnglet = document.querySelector('#signinOnglet');
const signupOnglet = document.querySelector('#signupOnglet');
const signinForm = document.querySelector('#signinForm');
const signupForm = document.querySelector('#signupForm');
document.addEventListener('click', (e) => {
    if (e.target.closest('#onglets')) {
        signinOnglet.classList.toggle('selectedOnglet');
        signupOnglet.classList.toggle('selectedOnglet');
        signinForm.classList.toggle('notSelectedForm');
        signupForm.classList.toggle('notSelectedForm');
    }
    if (e.target.id == "signupbtn") {
        const form = e.target.closest("#signupForm");
        const firstName = form.querySelector("#signupname").value;
        const lastName = form.querySelector("#signuplastname").value;
        const email = form.querySelector("#signupemail").value;
        const birthDate = form.querySelector("#signupbirthdate").value;
        //const codePostal = form.querySelector("#signupcodepostal").value;
        const role = form.querySelector("#signuprole").value;
        const password = form.querySelector("#signuppassword").value;

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

