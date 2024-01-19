// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI')

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/util/generatepdf"

// Classe que representa o corpo da requisição
class Body {
    constructor(xml, printCEAN, obsCanhoto) {
        this.xml = xml;
        this.printCEAN = printCEAN;
        this.obsCanhoto = obsCanhoto;
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, pdf }) {
        this.status = status;
        this.motivo = motivo;
        this.pdf = pdf;
    }
}

// Função assíncrona sendPostRequest realiza o envio da requisição e retorna a resposta
async function sendPostRequest(conteudo) {

    try {
        // Utiliza a API do ns para realizar o envio da requisição e armazena a resposta em responseAPI
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        // Em caso de erro, grava a linha de log
        gravarLinhaLog("[ERRO_OBTER_PDF]: " + error)
    }

}

module.exports = { Body, sendPostRequest }
