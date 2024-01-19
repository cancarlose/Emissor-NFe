// Módulo de correção da Carta de Correção
const nsAPI = require('../../api_module/nsAPI')
const { gravarLinhaLog } = require('../../api_module/util');
const downloadEvento = require('./downloadEvento')

const url = "https://nfe.ns.eti.br/nfe/cce"

// Classe Body representa o corpo da requisição POST
class Body {
    constructor(chNFe, tpAmb, dhEvento, nSeqEvento, xCorrecao) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.dhEvento = dhEvento;
        this.nSeqEvento = nSeqEvento;
        this.xCorrecao = xCorrecao;
    }
}

// Classe Response representa a resposta da requisição POST
class Response {
    constructor({ status, motivo, retEvento, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erros = erro
    }
}

// Função sendPostRequest realiza a requisição POST com a correção da Carta de Correção
async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {
    
    try {

        // Realiza a requisição POST
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))

        // Verifica se a requisição foi bem-sucedida
        if (responseAPI.status == 200) {
            // Verifica se a Carta de Correção foi corrigida com sucesso
            if (responseAPI.retEvento.cStat == 135) {
                // Cria o corpo da requisição para realizar o download do evento corrigido
                let downloadEventoBody = new downloadEvento.Body(
                    responseAPI.retEvento.chNFe,
                    conteudo.tpAmb,
                    tpDown,
                    "CCe",
                    conteudo.nSeqEvento
                )
                try {
                    // Realiza a requisição de download do evento corrigido
                    let downloadEventoResponse = await downloadEvento.sendPostRequest(downloadEventoBody, caminhoSalvar)
                    return downloadEventoResponse
                }
                catch (error) {
                    // Registra o erro na função de download do evento corrigido
                    gravarLinhaLog("[ERRO_DOWNLOAD_EVENTO_CORRECAO]: " + error)
                }
            }
        }
        return responseAPI
    }
    catch (error) {
        // Registra o erro na função de envio da requisição POST
        gravarLinhaLog("[ERRO_CANCELAMENTO]: " + error)
        return error
    }
}

module.exports = { Body, sendPostRequest }
