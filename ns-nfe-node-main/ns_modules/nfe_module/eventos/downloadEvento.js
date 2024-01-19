// Importação de módulos e funções
const nsAPI = require('../../api_module/nsAPI')
const util = require('../../api_module/util')

// URL do serviço de download de eventos
const url = "https://nfe.ns.eti.br/nfe/get/event"

// Classe que representa o corpo da requisição
class Body {
    constructor(chNFe, tpAmb, tpDown, tpEvento, nSeqEvento) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.tpDown = tpDown;
        this.tpEvento = tpEvento;
        this.nSeqEvento = nSeqEvento;
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, retEvento, erros, xml, pdf, json }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erros = erros;
        this.xml = xml;
        this.pdf = pdf;
        this.json = JSON.stringify(json)
    }
}

// Função assíncrona para enviar uma requisição POST ao serviço de download de eventos
async function sendPostRequest(conteudo, caminhoSalvar) {

    try {
        // Envio da requisição POST e construção do objeto Response
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        // Variável para armazenar o ID do evento
        var idEvento = ""
        // Atribuição do ID do evento com base no tipo de evento
        switch (conteudo.tpEvento) {
            case "CANC":
                idEvento = "110111"
                break
            case "CCE":
                idEvento = "110110"
                break
        }
        // Salvamento dos arquivos em diferentes formatos, se existirem
        if (responseAPI.json != null) {
            util.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chNFe + conteudo.nSeqEvento, "-procEven.json", responseAPI.json)
        }
        if (responseAPI.pdf != null) {
            let data = responseAPI.pdf;
            let buff = Buffer.from(data, 'base64');
            util.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chNFe + conteudo.nSeqEvento, "-procEven.pdf", buff)
        }
        if (responseAPI.xml != null) {
            util.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chNFe + conteudo.nSeqEvento, "-procEven.xml", responseAPI.xml)
        }
        // Retorno do objeto Response
        return responseAPI
    }
    catch (error) {
        // Registro do erro em um arquivo de log
        util.gravarLinhaLog("[ERRO_DOWNLOAD_EVENTO]: " + error)
        // Retorno do erro
        return error
    }
}

module.exports = { Body, sendPostRequest }