function criptografia(texto) {
    let textoCriptografado = texto
    .replace("e", "enter")
    .replace("i", "imes")
    .replace("a", "ai")
    .replace("o", "ober")
    .replace("u", "ufat")

    return textoCriptografado;
}

function criptografia2(texto) {
    return texto
    .replace("e", "enter")
    .replace("i", "imes")
    .replace("a", "ai")
    .replace("o", "ober")
    .replace("u", "ufat");
}

// Testes
let textoOriginal = "aeiou";
let textoCriptografado = criptografia(textoOriginal);
let textoCriptografado2 = criptografia2(textoOriginal);


console.log(`Original: ${textoOriginal}`);
console.log(`Criptografado1: ${textoCriptografado}`);
console.log(`Criptografado2: ${textoCriptografado2}`);

