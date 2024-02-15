// Função auxiliar para substituir uma letra específica por outra string
function substituirLetra(letra, substituto, texto) {
    const expressaoRegular = new RegExp(letra);
    const novoTexto = texto.replace(expressaoRegular, substituto);
    
    return novoTexto;
}

// Função de descriptografia
function descriptografar(texto, substituicoes) {
    substituicoes.forEach(([letra, substituto]) => {
        texto = substituirLetra(substituto, letra, texto);
    });

    return texto;
}

// Função de criptografia
function criptografar(texto, substituicoes) {
    substituicoes.forEach(([letra, substituto]) => {
        texto = substituirLetra(letra, substituto, texto);
    });

    return texto;
}

function configurarACriptografia(substitutoLetraA, substitutoLetraE, substitutoLetraI, substitutoLetraO, substitutoLetraU) {
    return  [['e', substitutoLetraE], 
            ['i', substitutoLetraI], 
            ['a', substitutoLetraA], 
            ['o', substitutoLetraO], 
            ['u', substitutoLetraU]];
}

// Testes
const texto = "ae";

const subA = 'ai';
const subE = 'enter';
const subI = 'imes';
const subO = 'ober';
const subU = 'ufat';

const substituicoesCriptografia = configurarACriptografia(subA, subE, subI, subO, subU);

const textoCriptografado = criptografar(texto, substituicoesCriptografia);
const textoDescriptografado = descriptografar(textoCriptografado, substituicoesCriptografia);

console.log(`Texto Original: ${texto}`);
console.log(`Texto Criptografado: ${textoCriptografado}`);  // Output esperado: aienter
console.log(`Texto Descriptografado: ${textoDescriptografado}`);  // Output esperado: ae