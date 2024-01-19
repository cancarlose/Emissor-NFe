// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI');
const { gravarLinhaLog } = require('../../api_module/util');
const url = "https://nfe.ns.eti.br/nfe/issue"

//// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, nsNRec, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.nsNRec = nsNRec;
        this.erros = erros
    }
}

// Função de enviar solicitação de postagem
async function sendPostRequest(conteudo) {
    
    try {
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        gravarLinhaLog("[ERRO_EMISSAO]: " + error)
        return error
    }
}

module.exports = { sendPostRequest }

// No código acima, a função sendPostRequest realiza uma requisição POST para a API de emissão de NF-e da Nuvem
// Caso ocorra algum erro durante a requisição, o erro será capturado pelo bloco catch e uma mensagem de erro será registrada no log utilizando a função gravarLinhaLog.
