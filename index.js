class ValidaForm {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.events();
    }

    events() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const isThisValid = this.isValid();
        const validPassword = this.passIsValid();

        if(isThisValid && validPassword) {
            alert('Formulário enviado!');
            this.formulario.submit();
        }
    }


    passIsValid() {
        let valid = true;

        const password = this.formulario.querySelector('.senha');
        const rPassword = this.formulario.querySelector('.repetir-senha');
        if(password.value !== rPassword.value) {
            valid = false;
            this.createError(password, 'Campos senha e repetir senha precisam ser iguais.');
            this.createError(rPassword, 'Campos senha e repetir senha precisam ser iguais.');
        }

        if (password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres');
        }

        return valid;
    }
    isValid() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let flag of this.formulario.querySelectorAll('.validar')) {
            const label = flag.previousElementSibling.innerHTML;
            if(!flag.value) { 
                this.createError(flag, `Campo "${label}" não pode estar em branco`);
                valid = false;
            }
            if(flag.classList.contains('cpf')) {
                if(!this.validaCPF(flag)) valid = false;
            }
            if(flag.classList.contains('usuario')) {
                if(!this.userValidation(flag)) valid = false;
            }
        }
        return valid;
    }

    userValidation(flag) {
        const user = flag.value;
        let valid = true;
        if(user.length < 3 || user.length > 12) {
            this.createError(flag, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }
        if(!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(flag, 'Usuário precisa ter apenas letras ou números.');
            valid = false;
        }
        return valid;
    }

    validaCPF(flag) {
        const cpf = new ValidaCPF(flag.value);
        if(!cpf.valida()) {
            this.createError(flag, 'CPF inválido');
            return false;
        }
        return true;
    }

    createError(flag, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        flag.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaForm();

