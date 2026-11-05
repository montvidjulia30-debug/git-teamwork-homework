window.addEventListener('load', function () {

    //changes in dev-2

    const fullName = document.getElementById('fullName');
    const userName = document.getElementById('username');
    const email = document.getElementById('email');

    const password = document.getElementById('password');
    const passwordInput=document.getElementById('password-input');
    const passwordInputErrorMsg=passwordInput.querySelector('.error-message');

    const repeatPassword = document.getElementById('repeat-password');

    const registrationForm = document.getElementById('registrationForm');

    const formTitle = document.getElementById('form-title');
    const loginLink = document.getElementById('login-link');

    const fullNameInput = document.getElementById('full-name-input');
    const errorMsg = fullNameInput.querySelector('.error-message');

    const emailInput = document.getElementById('email-input');
    const emailInputErrorMsg = emailInput.querySelector('.error-message');

    const repeatPasswordInput = document.getElementById('repeat-password-input');
    const repeatPasswordInputErrorMsg = repeatPasswordInput.querySelector('.error-message');

    const checkboxInput = document.getElementById('agree');
    const checkboxGroup = document.getElementById('checkbox-input');
    const checkboxInputErrorMsg= checkboxGroup.querySelector('.error-message');


    const userNameInput = document.getElementById('username');
    const userNameGroup = document.getElementById('username-input');
    const userNameErrorMsg = userNameGroup.querySelector('.error-message');

   


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





    checkboxInput.addEventListener('change', () => {
        if (checkboxInput.checked) {
            console.log('Согласен')
        } else {
            console.log('Не согласен')
        }
    });


    const button = document.getElementById('signUpBtn');
    button.addEventListener('click', checkRegistration)


      function checkRegistration(event) {
        event.preventDefault();

        let isValid= true;
        errorMsg.textContent = '';
        fullName.classList.remove('error');
        userNameErrorMsg.textContent='';
        userName.classList.remove('error');
        emailInputErrorMsg.textContent = '';
        email.classList.remove('error');
        passwordInputErrorMsg.textContent = '';
        password.classList.remove('error');
        repeatPasswordInputErrorMsg.textContent= '';
        repeatPassword.classList.remove('error');
        checkboxInputErrorMsg.textContent= '';
        checkboxGroup.classList.remove('error');




        if (!fullName.value.trim()) {
            isValid = false;
            errorMsg.textContent = "Put the full name";
            fullName.classList.add('error');
        }

        if (!/^[A-Za-z ]+$/.test(fullName.value)){
            isValid = false;
            errorMsg.textContent = "Full name can contain only letters and spaces ";
            fullName.classList.add('error');
        }

        if (!userName.value.trim()) {
            isValid = false;
            userNameErrorMsg.textContent = "Put your username";
            userName.classList.add('error');
        }

        if(!/^[A-Za-z0-9_-]+$/.test(userName.value)){
            isValid = false;
            userNameErrorMsg.textContent = "Username can contain only letters, numbers, underscores and hyphens";
            userName.classList.add('error');

        }

        if (!email.value.trim()) {
            isValid = false;
            emailInputErrorMsg.textContent = "Put your e-mail";
            email.classList.add('error');
        }
          if (email.value.trim() && !/^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/.test(email.value)) {
            isValid= false;
            emailInputErrorMsg.textContent = "Please enter a valid email address (e.g. name@example.com).";
            email.classList.add('error');
        }


        if (!password.value.trim()) {
            isValid = false;
            passwordInputErrorMsg.textContent = "Put the password";
            password.classList.add('error');
        }

        if (password.value.trim() && password.value.length < 8){
            isValid= false;
        passwordInputErrorMsg.textContent = "Password must contain at least 8 characters.";
        password.classList.add('error');
        }

        if (password.value.trim() && !/[A-Z]/.test(password.value)){
            isValid=false;
            passwordInputErrorMsg.textContent += ' Password must contain at least one uppercase letter.';
            password.classList.add('error');
        }

        if (password.value.trim() && !/[0-9]/.test(password.value)){
            isValid=false;
            passwordInputErrorMsg.textContent += ' Password must contain at least one number';
            password.classList.add('error');
        }

        if (password.value.trim() && !/[!@#$%^&*]/.test(password.value)){
            isValid=false;
            passwordInputErrorMsg.textContent += ' Password must contain at least one special character (!@#$%^&*)';
            password.classList.add('error');
        }


        if (password.value.trim() && password.value !== repeatPassword.value){
            isValid = false;
            repeatPasswordInputErrorMsg.textContent = ' The passwords do not match';
            repeatPassword.classList.add('error');
        }

        if (!repeatPassword.value.trim()) {
            isValid= false;
            repeatPasswordInputErrorMsg.textContent= ' Please repeat your password';
            repeatPassword.classList.add('error');
        }

        if (!checkboxInput.checked) {
            isValid =false;
            checkboxInputErrorMsg.textContent= 'Please agree to the Terms of Service and Privacy Policy';
            checkboxGroup.classList.add('error');

        }

          if (!isValid) {
              return;
          }

          const user = {
              fullName: fullName.value,
              userName: userName.value,
              email: email.value,
              password: password.value,
          };

          const clients = JSON.parse(localStorage.getItem('clients')) || [];
          clients.push(user);

          localStorage.setItem('clients', JSON.stringify(clients));


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

    function handleLoginLinkClick() {
        showLogin();
    }

    loginLink.addEventListener('click', handleLoginLinkClick);

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

        loginLink.removeEventListener('click', handleLoginLinkClick);
        loginLink.innerText = 'Registration';

        loginLink.addEventListener('click', () => {
            location.reload();
        });


        button.removeEventListener('click', checkRegistration);
        button.addEventListener('click', checkLogin);

        function checkLogin(event) {

            event.preventDefault();

            if (!password.value.trim()) {
                passwordInputErrorMsg.textContent = 'Заполните поле Password!';
                password.classList.add('error');
                return;
            }
            if (!userName.value.trim()) {
                userNameErrorMsg.textContent = 'Заполните поле Username!';
                userName.classList.add('error');
                return;
            }

            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const user = clients.find(client => client.userName === userName.value);
            if (!user) {
                userNameErrorMsg.textContent = 'Такой пользователь не зарегистрирован';
                userName.classList.add('error');
                return;
            }

            if (user.password !== password.value) {
                passwordInputErrorMsg.textContent = 'Неверный пароль';
                password.classList.add('error');
                return;
            }

            formTitle.innerText = `Welcome, ${user.fullName}!`;
            const button = document.getElementById('signUpBtn');

            button.innerText = 'Exit';

            button.removeEventListener('click', checkLogin);
            button.addEventListener('click', () => {
                location.reload();
            });

            userNameGroup.remove();
            passwordInput.remove();
            document.getElementById('login-link-box').remove();

        }
    }

    console.log("изменения в main");

    console.log("Сообщение от первого разработчика");

    console.log("Сообщение от второго разработчика");
})
