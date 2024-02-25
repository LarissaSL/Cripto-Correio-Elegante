/* Propor no futuro que o Usuário faça sua propria configuração de Criptografia, facilitando a 
manutenção futura para essa implementação */
const substitutoA = 'ai';
const substitutoE = 'enter';
const substitutoI = 'imes';
const substitutoO = 'ober';
const substitutoU = 'ufat';

const emailCripto = "criptocorreioelegante@gmail.com";

const caminhoIconeAlerta = './assets/img/atencao.png';
const caminhoIconeSucesso = './assets/img/circulo.png';

let textoDeEntrada = selecionarElementoHtml("#entradaUser");
let textoResultado = selecionarElementoHtml("#resultado");

let modalFeedback = selecionarElementoHtml("#modalDeFeedback");
let modalEmail = selecionarElementoHtml("#modalDoEnviar");

const botaoEnviar = selecionarElementoHtml("#botaoEnviarDesabilitado");

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

function checarInput(input) {
    const possiveisEntradasIrregulares = new RegExp(/[A-ZÀ-ÖØ-öø-ÿ0-9]/);

        /* Verifcação se o input tem alguma entrada irregular 
        Caso returne False é porque nao passou no teste*/
        if (input == "") {
            abrirModal("modalDeFeedback");
            criaConteudoNoModal("Não há nenhuma mensagem", caminhoIconeAlerta, "Sinal de Alerta");
            return false;
        } 
        if (possiveisEntradasIrregulares.test(input)){
            abrirModal("modalDeFeedback")
            criaConteudoNoModal("Mensagem inválida, apenas letras minúsculas e sem acentos são permitidas", caminhoIconeAlerta, "Sinal de Alerta");;
            return false;
        } else {
            return true;
        }
}

function selecionarElementoHtml(seletor) {
    return document.querySelector(seletor);
}

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
        botaoEnviar.id = "botaoEnviarDesabilitado";
        botaoEnviar.setAttribute("disabled", "");
    }
}

function enviarTexto() {
    abrirModal('modalDoEnviar');
    const mensagemASerEnviada = textoResultado.value;

    const exibirMensagemASerEnviada = selecionarElementoHtml('#enviarMensagem');
    exibirMensagemASerEnviada.value = mensagemASerEnviada;
}

function enviarEmail() {
    const nomeRemetente = selecionarElementoHtml('#emailRemetente').value; 
    const emailDestinatario = selecionarElementoHtml('#emailDestinatario').value; 
    const mensagem = selecionarElementoHtml('#enviarMensagem').value;

    if (nomeRemetente !== "" && emailDestinatario !== "") { 
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : emailCripto,
            Password : "671F71015D3AB2A7E663D7D4E8175E4DFF59",
            To : emailDestinatario,
            From : emailCripto,
            Subject : `CriptoCorreioElegante: Você tem uma nova Mensagem Secreta`,
            Body : `${mensagem}`,
        }).then(
           alert(`Mensagem enviada para ${emailDestinatario} \nde ${emailCripto} com ${nomeRemetente} \ne a mensagem é ${mensagem}`)
        );

        fecharModal('modalEnviarConteudo');

    } else {
        alert("Por favor, preencha todos os campos solicitados");
    }

    console.log(nomeRemetente);
    console.log(emailDestinatario);
}

function criptografar() {
    const statusDoInput = checarInput(textoDeEntrada.value);

    if (statusDoInput){
        const texto = textoDeEntrada.value;

        const textoCriptografado = texto
            .replace(/e/g, substitutoE)
            .replace(/i/g, substitutoI)
            .replace(/a/g, substitutoA)
            .replace(/o/g, substitutoO)
            .replace(/u/g, substitutoU);

        textoResultado.value = textoCriptografado;

        botaoEnviar.id = "botaoEnviar";
        botaoEnviar.removeAttribute("disabled");
    }
}

function descriptografar() {
    const statusDoInput = checarInput(textoDeEntrada.value);
    let textoParaDescriptografar;

    if (statusDoInput){
        const texto = textoDeEntrada.value;

        //Criei uma Expressao Regular nova com todos os substitutos das Letras
        const padraoCriptografia = new RegExp(`${substitutoE}|${substitutoI}|${substitutoA}|${substitutoO}|${substitutoU}`);

        /* Verifcação de onde eu preciso pegar o texto para descriptografar (Se da  entrada ou do resultado) 
        utilizando o Metodo Test que as RE tem */
        if (padraoCriptografia.test(texto)) {
            textoParaDescriptografar = texto;
        } else {
            textoParaDescriptografar = textoResultado.value;
        }

        const textoDescriptografado = textoParaDescriptografar
            .replace(substitutoE/'g', "e")
            .replace(substitutoI/'g', "i")
            .replace(substitutoA/'g', "a")
            .replace(substitutoO/'g', "o")
            .replace(substitutoU/'g', "u");

        textoResultado.value = textoDescriptografado;
        botaoEnviar.id = "botaoEnviarDesabilitado";
        botaoEnviar.setAttribute("disabled", "");
    } 
}