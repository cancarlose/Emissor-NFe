// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI')

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/nfe/stats"

// Classe que representa o corpo da requisição
class Body {
    constructor(licencaCnpj, chNFe, tpAmb, versao) {
        this.licencaCnpj = licencaCnpj;
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.versao = versao;
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({status, motivo, retConsSitNFe, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.retConsSitNFe = retConsSitNFe;
        this.erros = erros
    }
}

// Função assíncrona que envia a requisição POST
async function sendPostRequest(conteudo) {

    try {
        // Envia a requisição POST e retorna a resposta
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        // Grava o erro na linha de log
        gravarLinhaLog("[ERRO_CONSULTA_SITUACAO]: " + error)
    }

}

module.exports = { Body, sendPostRequest }