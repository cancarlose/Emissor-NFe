// Módulo de busca de inutilização de notas fiscais na API NFE.
const nsAPI = require('../../api_module/nsAPI')
const util = require('../../api_module/util')

// URL do serviço de download de eventos
const url = "https://nfe.ns.eti.br/nfe/get/inut"

// Classe que representa o corpo da requisição
class Body {
    constructor(chave, tpAmb, tpDown) {
        this.chave = chave;
        this.tpAmb = tpAmb;
        this.tpDown = tpDown
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, retInut, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.retInut = retInut;
        this.erros = erros
    }
}

// Função que realiza a requisição POST para buscar a inutilização de notas fiscais.
async function sendPostRequest(conteudo, caminhoSalvar) {

    try {
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))

        if (responseAPI.retInut.json != null) {
            util.salvarArquivo(caminhoSalvar, responseAPI.retInut.chave, "-procInut.json", responseAPI.retInut.json)
        }
        if (responseAPI.retInut.pdf != null) {
            let data = responseAPI.retInut.pdf;
            let buff = Buffer.from(data, 'base64');
            util.salvarArquivo(caminhoSalvar, responseAPI.retInut.chave, "-procInut.pdf", buff)
        }
        if (responseAPI.retInut.xml != null) {
            util.salvarArquivo(caminhoSalvar, responseAPI.retInut.chave, "-procInut.xml", responseAPI.retInut.xml)
        }
        return responseAPI
    }
    catch (error) {
        util.gravarLinhaLog("[ERRO_DOWNLOAD_INUTILIZACAO]: " + error)
        return error
    }

}

module.exports = { Body, sendPostRequest }