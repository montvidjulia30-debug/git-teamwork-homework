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


          function showError(input, errorElement, message) {
              isValid = false;
              errorElement.textContent += message;
              input.classList.add('error');
          }

          if (!fullName.value.trim()) {
              showError(fullName, errorMsg, "Put the full name");
          } else if (!/^[A-Za-z ]+$/.test(fullName.value)) {
             showError(fullName, errorMsg, "Full name can contain only letters and spaces ");
          }

          if (!userName.value.trim()) {
              showError(userName, userNameErrorMsg, "Put your username");
          } else if (!/^[A-Za-z0-9_-]+$/.test(userName.value)) {
              showError(userName, userNameErrorMsg, "Username can contain only letters, numbers, underscores and hyphens");
          }

          if (!email.value.trim()) {
              showError(email, emailInputErrorMsg, "Put your e-mail");

          } else if (email.value.trim() && !/^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/.test(email.value)) {
              showError(email, emailInputErrorMsg, "Please enter a valid email address (e.g. name@example.com).");
          }

          if (!password.value.trim()) {
              showError(password, passwordInputErrorMsg, "Put the password");
          } else {

              if (password.value.length < 8) {
                  showError(password, passwordInputErrorMsg, "Password must contain at least 8 characters.");
              }

              if (!/[A-Z]/.test(password.value)) {
                  showError(password, passwordInputErrorMsg, ' Password must contain at least one uppercase letter.');

              }

              if (!/[0-9]/.test(password.value)) {
                  showError(password, passwordInputErrorMsg, ' Password must contain at least one number');
              }

              if (!/[!@#$%^&*]/.test(password.value)) {
                  showError(password, passwordInputErrorMsg, ' Password must contain at least one special character (!@#$%^&*)');
              }


              if (password.value !== repeatPassword.value) {
                  showError(repeatPassword, repeatPasswordInputErrorMsg, ' The passwords do not match');
              }
          }

        if (!repeatPassword.value.trim()) {
            showError(repeatPassword, repeatPasswordInputErrorMsg, ' Please repeat your password');
        }

        if (!checkboxInput.checked) {
           showError(checkboxGroup, checkboxInputErrorMsg, 'Please agree to the Terms of Service and Privacy Policy');
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

        userName.classList.remove('error');
        password.classList.remove('error');

        userNameErrorMsg.textContent = '';
        passwordInputErrorMsg.textContent = '';

    }


    function showError(input, errorElement, message){
        errorElement.textContent = message;
        input.classList.add('error');

    }
    function checkLogin(event) {

        event.preventDefault();

        if (!password.value.trim()) {
            showError(password, passwordInputErrorMsg, 'Заполните поле Password!');
            return;
        }
        if (!userName.value.trim()) {
           showError(userName, userNameErrorMsg, 'Заполните поле Username!');
            return;
        }

        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        const user = clients.find(client => client.userName === userName.value);

        if (!user) {
            showError(userName, userNameErrorMsg, 'Такой пользователь не зарегистрирован');
            return;
        }

        if (user.password !== password.value) {
            showError(password, passwordInputErrorMsg,'Неверный пароль');
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

    console.log("изменения в main");

    console.log("Сообщение от первого разработчика");

    console.log("Сообщение от второго разработчика");
})
