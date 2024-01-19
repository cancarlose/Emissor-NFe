// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI')

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/util/preview/nfe"


// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, pdf, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.pdf = pdf;
        this.erros = erros
    }
}

// A função assíncrona sendPostRequest realiza a solicitação POST para a API NF-e e retorna uma resposta com o status, motivo, PDF e erros, se houver
async function sendPostRequest(conteudo) {

    try {
        // Realiza a solicitação POST para a API NF-e e retorna a resposta da API
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        // Grava a linha de log no arquivo de log em caso de erro na solicitação POST
        gravarLinhaLog("[ERRO_OBTER_PREVIA]: " + error)
    }
}

module.exports = { sendPostRequest }

