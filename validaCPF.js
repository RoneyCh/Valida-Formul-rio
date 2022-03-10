class ValidaCPF {
    constructor(cpf) {
        this.cpf = cpf.replace(/\D+/g, '');
    }

    valida() {
        if(typeof this.cpf === 'undefined') return false;
        if(this.cpf.length !== 11) return false;
        if(this.isSequence()) return false;

        const cpfParcial = this.cpf.slice(0,-2);
        const dig1 = this.criaDigito(cpfParcial);
        const dig2 = this.criaDigito(cpfParcial + dig1);
        const novoCPF = cpfParcial + dig1 + dig2;
        return novoCPF === this.cpf;
    }

    criaDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);
        let regCount = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, val) => {
            ac += (regCount*Number(val));
            regCount--;     
            return ac;
        },0)
        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : digito;
    }

    isSequence() {
        const sequence = this.cpf[0].repeat(this.cpf.length);
        return sequence === this.cpf;
    }
    
}

