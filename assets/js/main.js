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

    if (statusDoInput) {
        const textoCriptografado = textoDeEntrada.value;

        const textoDescriptografado = textoCriptografado
            .replace(new RegExp(substitutoE, 'g'), "e")
            .replace(new RegExp(substitutoI, 'g'), "i")
            .replace(new RegExp(substitutoA, 'g'), "a")
            .replace(new RegExp(substitutoO, 'g'), "o")
            .replace(new RegExp(substitutoU, 'g'), "u");

            textoResultado.value = textoDescriptografado;
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

    //Layout e funcionalidade de enviar e-mail feito com a API Elasticemail e smtpjs.com
    const emailBody = `
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #F5F6F8;">
        <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #F5F6F8;">
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" id="body_table" style="background-color: #F5F6F8;">
            <tbody>    
                <tr>
                    <td>
                    <![endif]-->
                        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="margin: auto;" class="contentMainTable">
                            <tr class="wp-block-editor-spacerblock-v1"><td style="background-color:#F5F6F8;line-height:50px;font-size:50px;width:100%;min-width:100%">&nbsp;</td></tr><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#ffffff;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0" align="center"><table align="center" width="640" class="imageBlockWrapper" style="width:640px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://api.smtprelay.co/userfile/b9a3873f-8d91-4064-9083-2dd0590b0cca/emailMarketing.png" width="640" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#ffffff;display:block;padding-top:64px;padding-right:32px;padding-bottom:32px;padding-left:32px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;line-height:21.85px;font-size:19px;background-color:#ffffff;color:#000000;margin:0;word-break:normal" class="heading3">De: ${nomeRemetente}</p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:0px 32px 32px 32px;background-color:#ffffff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:30.00px;font-size:15px;margin:0;color:#5f5f5f;word-break:normal">${mensagem}</p></td></tr><tr class="wp-block-editor-buttonblock-v1" align="center"><td style="background-color:#ffffff;padding-top:20px;padding-right:20px;padding-bottom:60px;padding-left:20px;width:100%" valign="top"><table role="presentation" cellspacing="0" cellpadding="0" class="button-table"><tbody><tr><td valign="top" class="button-td button-td-primary" style="cursor:pointer;border:none;border-radius:4px;background-color:#FA1920;font-size:16px;font-family:Open Sans, sans-serif;width:fit-content;color:#ffffff"><a style="color:#ffffff" href="https://github.com/LarissaSL">
    <table role="presentation">
    <tbody><tr>
      <!-- Top padding -->
      <td valign="top" colspan="3" height="16" style="height: 16px; line-height: 1px; padding: 0;">
        <span style="display: inline-block;">&nbsp;</span>
      </td>
    </tr>
    <tr>
      <!-- Left padding -->
      <td valign="top" width="16" style="width: 16px; line-height: 1px; padding: 0;">
        <span style="display: inline-block;">&nbsp;</span>
      </td>
      <!-- Content -->
      <td valign="top" style="
        display: inline-block;
        cursor: pointer; border: none; border-radius: 4px; background-color: #FA1920; font-size: 16; font-family: Open Sans, sans-serif; width: fit-content; font-weight: null; letter-spacing: undefined;
          color: #ffffff;
          padding: 0;
        ">
        Desvendar mensagem
      </td>
      <!-- Right padding -->
      <td valign="top" width="16" style="width: 16px; line-height: 1px; padding: 0;">
        <span style="display: inline-block;">&nbsp;</span>
      </td>
    </tr>
    <!-- Bottom padding -->
    <tr>
      <td valign="top" colspan="3" height="16" style="height: 16px; line-height: 1px; padding: 0;">
        <span style="display: inline-block;">&nbsp;</span>
      </td>
    </tr>
  </tbody></table>
    </a></td></tr></tbody></table></td></tr><tr class="wp-block-editor-spacerblock-v1"><td style="background-color:#ffffff;line-height:32px;font-size:32px;width:100%;min-width:100%">&nbsp;</td></tr>
                        </table>
                    <!--[if mso | IE]>
                    </td>
                </tr>
            </tbody>
            </table>
            <![endif]-->
        </center>
    </body>
`;

    if (nomeRemetente !== "" && emailDestinatario !== "") { 
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : emailCripto,
            Password : "671F71015D3AB2A7E663D7D4E8175E4DFF59",
            To : emailDestinatario,
            From : emailCripto,
            Subject : `CriptoCorreioElegante: Você tem uma nova Mensagem Secreta`,
            Body : emailBody,
        }).then(
           alert(`Mensagem enviada para ${emailDestinatario} \nde ${emailCripto} com ${nomeRemetente} \ne a mensagem é ${mensagem}`)
        );

    } else {
        alert("Por favor, preencha todos os campos solicitados");
    }

    console.log(nomeRemetente);
    console.log(emailDestinatario);
}