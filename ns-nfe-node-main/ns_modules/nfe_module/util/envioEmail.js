// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI')

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/util/resendemail"

// Classe que representa o corpo da requisição
class Body {
    constructor(chNFe, tpAmb, anexarPDF, anexarEvento, email) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.anexarPDF = anexarPDF;
        this.anexarEvento = anexarEvento;
        this.email = email;
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, }) {
        this.status = status;
        this.motivo = motivo;
    }
}

// Função que realiza a requisição POST
async function sendPostRequest(conteudo) {

    try {
        // Realiza a requisição POST
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        // Grava o erro no log
        gravarLinhaLog("[ERRO_ENVIO_EMAIL]: " + error)
    }

}

module.exports = { Body, sendPostRequest }
