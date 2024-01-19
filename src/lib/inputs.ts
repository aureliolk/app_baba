export const handlePhone = (event:any) => {
    let input = event.target;
    input.value = phoneMask(input.value);
};

export const handleCpf = (event:any) => {
    let input = event.target;
    input.value = cpfMask(input.value);
};

const phoneMask = (value:string) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(9)(\d)/, '($1) $2 $3');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value;
};

const cpfMask = (value:string) => {
    if (!value) return '';
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    return value;
};

export const phoneMaskGpt = (event: React.ChangeEvent<HTMLInputElement>) => {

    let value = event.target.value;

    if (!value) return '';
  
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(9)(\d)/, '($1) $2 $3');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  
    event.target.value = value;
  }
  
