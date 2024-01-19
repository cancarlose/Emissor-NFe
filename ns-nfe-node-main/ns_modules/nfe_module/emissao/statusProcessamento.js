// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI');
const { gravarLinhaLog } = require('../../api_module/util');
const url = "https://nfe.ns.eti.br/nfe/issue/status"

// Classe que representa o corpo da requisição
class Body {
   constructor(CNPJ, nsNRec, tpAmb) {
       this.CNPJ = CNPJ;
       this.nsNRec = nsNRec;
       this.tpAmb = tpAmb
   }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({status, motivo, chNFe, cStat,xMotivo, xml, nProt, dhRecbto, erro}) {
        this.status = status;
        this.motivo = motivo;
        this.chNFe = chNFe;
        this.cStat = cStat;
        this.xMotivo = xMotivo;
        this.nProt = nProt;
        this.xml = xml;
        this.dhRecbto = dhRecbto;
        this.erro = erro
    }
}

// Função assíncrona para realizar a requisição POST
async function sendPostRequest(body) {
    
    try {
        // Realiza a requisição POST com o body informado
        let responseAPI = new Response(await nsAPI.PostRequest(url, body))
        return responseAPI
    }
    catch (error) {
        // Grava a linha de log no caso de erro
        gravarLinhaLog("[ERRO_CONSULTA_STATUS_PROCESSAMENTO]: " + error)
        return error
    }
}

module.exports = { Body, sendPostRequest }