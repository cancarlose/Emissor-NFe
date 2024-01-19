// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI')

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/util/generatexml"


// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, xml, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.xml = xml;
        this.erros = erros
    }
}

// A função assíncrona sendPostRequest envia uma solicitação POST com o conteúdo da NFe para a API NS e retorna a resposta da API
async function sendPostRequest(conteudo) {

    try {
        // A função nsAPI.PostRequest é chamada com a URL e o conteúdo da NFe.
        // O resultado da função é armazenado na variável responseAPI.
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        // Em caso de erro, a mensagem de erro é registrada no log
        gravarLinhaLog("[ERRO_OBTER_XML]: " + error)
    }
}

module.exports = { sendPostRequest }