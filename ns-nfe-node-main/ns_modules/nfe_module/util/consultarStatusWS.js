// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI')

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/util/wssefazstatus"

// Classe que representa o corpo da requisição
class Body {
    constructor(CNPJCont, UF, tpAmb, versao) {
        this.CNPJCont = CNPJCont;
        this.UF = UF;
        this.tpAmb = tpAmb;
        this.versao = versao;
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, retStatusServico, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retStatusServico = retStatusServico;
        this.erros = erros
    }
}

// Função assíncrona que envia uma requisição POST ao endpoint da NF-e
async function sendPostRequest(conteudo) {

    try {
        // Enviar a requisição POST
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        // Gravar linha de log caso ocorra um erro na consulta do status do WS da NF-e
        gravarLinhaLog("[ERRO_CONSULTA_STATUS_WS]: " + error)
    }

}

module.exports = { Body, sendPostRequest }
