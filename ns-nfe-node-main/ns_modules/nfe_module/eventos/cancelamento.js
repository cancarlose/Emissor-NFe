// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI');
const { gravarLinhaLog } = require('../../api_module/util');
const downloadEvento = require('./downloadEvento')

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/nfe/cancel"

// Classe que representa o corpo da requisição
class Body {
    constructor(chNFe, tpAmb, dhEvento, nProt, xJust) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.dhEvento = dhEvento;
        this.nProt = nProt;
        this.xJust = xJust;
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, retEvento, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erro = erro
    }
}

// Função que envia a requisição para o serviço
async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {

    try {
        
        // Envia a requisição e obtém a resposta
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        // Verifica se a resposta é bem-sucedida
        if (responseAPI.status == 200) {
            // Verifica se o cancelamento foi aceito
            if (responseAPI.retEvento.cStat == 135) {
                // Cria o corpo da requisição para baixar o evento
                let downloadEventoBody = new downloadEvento.Body(
                    responseAPI.retEvento.chNFe,
                    conteudo.tpAmb,
                    tpDown,
                    "CANC",
                    "1"
                )
                try {
                    // Envia a requisição para baixar o evento e obtém a resposta
                    let downloadEventoResponse = await downloadEvento.sendPostRequest(downloadEventoBody, caminhoSalvar)
                    return downloadEventoResponse
                }
                catch (error) {
                    // Grava o erro no log
                    gravarLinhaLog("[ERRO_DOWNLOAD_EVENTO_CANCELAMENTO]: " + error)
                    return error
                }
            }
        }
        return responseAPI
    }
    catch (error) {
        // Grava o erro no log
        gravarLinhaLog("[ERRO_CANCELAMENTO]: " + error)
        return error
    }
}

module.exports = { Body, sendPostRequest }