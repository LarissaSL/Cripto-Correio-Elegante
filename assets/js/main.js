/* Propor no futuro que o Usuário faça sua propria configuração de Criptografia, facilitando a 
manutenção futura para essa implementação */
const substitutoA = 'ai';
const substitutoE = 'enter';
const substitutoI = 'imes';
const substitutoO = 'ober';
const substitutoU = 'ufat';


// OBS.: Falta Estudar Sobre os Modal, para os feedbacks sairem do Console e falta o botão Enviar


function selecionarElementoHtml(seletor) {
    return document.querySelector(seletor);
}

let textoDeEntrada = selecionarElementoHtml("#entradaUser");
let textoResultado = selecionarElementoHtml("#resultado");

function copiarTexto() {
    const texto = textoResultado.value;

    if (texto == "") {
        console.log("Não há nada a ser copiado");
    } else {
        navigator.clipboard.writeText(texto);
        console.log("Texto copiado com sucesso!");
    }
}

function apagarTexto() {
    if (textoDeEntrada.value == "" || textoResultado.value == "") {
        console.log("Não há nada a ser apagado");
    } else {
        textoDeEntrada.value = "";
        textoResultado.value = "";
    }
}

function enviarTexto() {
    console.log('Trabalhando nisso ainda...');
}

function criptografar() {
    const texto = textoDeEntrada.value;

    if (texto == "") {
        console.log("Não há nada a ser criptografado");
    } else {
        const textoCriptografado = texto
            .replace("e", substitutoE)
            .replace("i", substitutoI)
            .replace("a", substitutoA)
            .replace("o", substitutoO)
            .replace("u", substitutoU);

        textoResultado.value = textoCriptografado;
    }
}

function descriptografar() {
    let textoParaDescriptografar;
    const entrada = textoDeEntrada.value;

    if (entrada == "") {
        console.log("Não há nada a ser descriptografado");
    } else {
        //Criei uma Expressao Regular nova com todos os substitutos das Letras
        const padrao = new RegExp(`${substitutoE}|${substitutoI}|${substitutoA}|${substitutoO}|${substitutoU}`);

        /* Verifcação de onde eu preciso pegar o texto para descriptografar (Se da  entrada ou do resultado) 
        utilizando o Metodo Test que as RE tem */
        if (padrao.test(entrada)) {
            textoParaDescriptografar = entrada;
        } else {
            textoParaDescriptografar = textoResultado.value;
        }

        const textoDescriptografado = textoParaDescriptografar
            .replace(substitutoE, "e")
            .replace(substitutoI, "i")
            .replace(substitutoA, "a")
            .replace(substitutoO, "o")
            .replace(substitutoU, "u");

        textoResultado.value = textoDescriptografado;
    }
}
