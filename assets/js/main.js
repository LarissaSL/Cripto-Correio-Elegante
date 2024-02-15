/* Propor no futuro que o Usuário faça sua propria configuração de Criptografia, facilitando a 
manutenção futura para essa implementação */
const substitutoA = 'ai';
const substitutoE = 'enter';
const substitutoI = 'imes';
const substitutoO = 'ober';
const substitutoU = 'ufat';

const caminhoIconeAlerta = '/assets/img/atencao.png';
const caminhoIconeSucesso = '/assets/img/circulo.png';


function selecionarElementoHtml(seletor) {
    return document.querySelector(seletor);
}

let textoDeEntrada = selecionarElementoHtml("#entradaUser");
let textoResultado = selecionarElementoHtml("#resultado");

let modalFeedback = selecionarElementoHtml("#modalDeFeedback");
let modalEmail = selecionarElementoHtml("#modalDoEnviar");

function copiarTexto() {
    const texto = textoResultado.value;

    if (texto == "") {
        abrirModal("modalDeFeedback");
        criaConteudoNoModal("Não há nenhuma mensagem a ser Copiada", caminhoIconeAlerta, "Sinal de Alerta");
    } else {
        navigator.clipboard.writeText(texto);

        abrirModal("modalDeFeedback");
        criaConteudoNoModal("Mensagem copiada com sucesso!", caminhoIconeSucesso, "Sinal de Sucesso"); 
    }
}

function apagarTexto() {
    if (textoDeEntrada.value == "" || textoResultado.value == "") {
        abrirModal("modalDeFeedback");
        criaConteudoNoModal("Não há nenhuma mensagem a ser Apagada", caminhoIconeAlerta, "Sinal de Alerta");
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
        abrirModal("modalDeFeedback");
        criaConteudoNoModal("Não há nenhuma mensagem a ser Criptografada", caminhoIconeAlerta, "Sinal de Alerta");
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
        abrirModal("modalDeFeedback");
        criaConteudoNoModal("Não há nenhuma mensagem a ser Descriptografada", caminhoIconeAlerta, "Sinal de Alerta");
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

function abrirModal(idDoModal) {
    document.getElementById(idDoModal).style.display = "block";
}

function fecharModal(idDoModal) {
    document.getElementById(idDoModal).style.display = "none";
}

function criaConteudoNoModal(texto, caminhoDoIcone, altDoIcone) {
    const pDoModalSelecionado = selecionarElementoHtml("#modalGenericoTexto");
    const imgDoModalSelecionado = selecionarElementoHtml("#iconeDeFeedback");

    pDoModalSelecionado.textContent = texto;
    imgDoModalSelecionado.src = caminhoDoIcone;
    imgDoModalSelecionado.alt = altDoIcone;
}