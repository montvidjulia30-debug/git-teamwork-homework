window.addEventListener('load', function () {

    //changes in dev-2

    const fullName = document.getElementById('fullName');
    const userName = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeat-password');

    const registrationForm = document.getElementById('registrationForm');

    const formTitle = document.getElementById('form-title');
    const loginLink = document.getElementById('login-link');
    const fullNameInput = document.getElementById('full-name-input');
    const emailInput = document.getElementById('email-input');
    const repeatPasswordInput = document.getElementById('repeat-password-input');
    const userNameInput = document.getElementById('username');


    const formDescription = document.getElementById('form-description');


    const popUp = document.getElementById('popUp');

    fullName.addEventListener('keydown', (e) => {
            const numbers = '0123456789';
            if (numbers.includes(e.key)) {
                e.preventDefault();
            }
        }
    )


    userNameInput.addEventListener('keydown', (e) => {
        const forbidden = '.,';
        if (forbidden.includes(e.key)) {
            e.preventDefault();
        }
    })

    const checkboxInput = document.getElementById('agree');
    const checkboxGroup = document.getElementById('checkbox-input');
    checkboxInput.addEventListener('change', () => {
        if (checkboxInput.checked) {
            console.log('Согласен')
        } else {
            console.log('Не согласен')
        }
    });


    const button = document.getElementById('signUpBtn');
    button.addEventListener('click', checkRegistration)

    function checkRegistration() {

        if (!fullName.value.trim()) {
            alert('Заполните поле Full name');
            return;
        }

        if (!userName.value.trim()) {
            alert('Заполните поле Username');
            return;
        }

        if (!email.value.trim()) {
            alert('Заполните поле E-mail');
            return;
        }
        if (!email.checkValidity()) {
            alert('Заполните корректно поле E-mail');
            return;
        }

        if (!password.value.trim()) {
            alert('Заполните поле Password');
            return;
        }

        if (password.value.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return;
        }

        if (password.value !== repeatPassword.value) {
            alert('Пароли не совпадают');
            return;
        }

        if (!checkboxInput.checked) {
            alert('Необходимо согласиться с условиями регистрации');
            return;
        }


        showSuccessPopUp()

    }

    function showSuccessPopUp() {
        //popUp.style.display='flex';
        popUp.classList.add('d-flex');

        const okButton = document.getElementById('okBtn');
        okButton.addEventListener('click', function () {
            // popUp.style.display='none';
            popUp.classList.remove('d-flex');
            document.getElementById('registrationForm').reset();
            showLogin();
        })

    }

    loginLink.addEventListener('click', () => {
        showLogin();
    });

    function showLogin() {

        formTitle.innerText = 'Log in to the system';

        if (fullNameInput !== null) {
            fullNameInput.remove();
        }

        if (emailInput !== null) {
            emailInput.remove();
        }

        if (repeatPasswordInput !== null) {
            repeatPasswordInput.remove();
        }

        if (checkboxGroup !== null) {
            checkboxGroup.remove();
        }

        if (formDescription !== null) {
            formDescription.remove()
        }


        const button = document.getElementById('signUpBtn');
        button.innerText = 'Sign In';

        const loginLink = document.getElementById('login-link-box');
        loginLink.remove();


        button.removeEventListener('click', checkRegistration);
        button.addEventListener('click', checkLogin);

        function checkLogin(event) {

            event.preventDefault();

            if (!password.value.trim()) {
                alert('Заполните поле Password!');
                return;
            }
            if (!userName.value.trim()) {
                alert('Заполнитте поле Username!');
                return;
            }

            alert(`Добро  пожаловать ${userName.value}`)

        }
    }

    console.log("изменения в main");
})

