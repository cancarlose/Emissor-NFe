// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI')

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/util/list/nsnrecs"

//Classe para representar o corpo da requisição
class Body {
    constructor(chNFe) {
        this.chNFe = chNFe;
    }
}

//Classe para representar a resposta da requisição
class Response {
    constructor({ status, motivo, nsNRecs, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.nsNRecs = nsNRecs;
        this.erros = erros
    }
}

//Função para enviar a requisição POST para a API do NFe
async function sendPostRequest(conteudo) {

    try {
        //Enviar a requisição POST para a API do NFe e obter a resposta
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        //Caso ocorra algum erro durante a requisição, registrar o erro no log
        gravarLinhaLog("[ERRO_LISTAGEM_NSNREC]: " + error)
    }

}

module.exports = { Body, sendPostRequest }
