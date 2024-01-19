// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI');
const { gravarLinhaLog } = require('../../api_module/util');

// Define a URL para o serviço
const url = "https://nfe.ns.eti.br/util/conscad"

// Classe que representa o corpo da requisição
class Body {
    constructor(CNPJCont, UF, IE, CNPJ, CPF) {
        this.CNPJCont = CNPJCont;
        this.UF = UF;
        this.IE = IE;
        this.CNPJ = CNPJ;
        this.CPF = CPF;
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({status, motivo, retConsCad, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.retConsCad = retConsCad;
        this.erros = erros
    }
}

// Esta função envia uma requisição POST para a API da NFe, usando a URL e o corpo fornecidos.
async function sendPostRequest(conteudo) {

    try {
        // Realiza a requisição POST para a API da NFe e retorna a resposta em formato de objeto.
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }
    catch (error) {
        // Caso ocorra algum erro durante a requisição, ele é registrado no arquivo de log.
        gravarLinhaLog("[ERRO_CONSULTA_CONTRIBUINTE]: " + error)
    }

}

module.exports = { Body, sendPostRequest }