// Importa os módulos necessários
const nsAPI = require('../../api_module/nsAPI')
var fs = require('fs');
const util = require('../../api_module/util')
'use strict';

// Define a URL da API de Nota Fiscal Eletrônica
const url = "https://nfe.ns.eti.br/nfe/get"

// Define a classe Body com construtor que recebe chNFe, tpDown e tpAmb
class Body {
    constructor(chNFe, tpDown, tpAmb) {
        this.chNFe = chNFe;
        this.tpDown = tpDown;
        this.tpAmb = tpAmb;
    }
}

// Define a classe Response com construtor que recebe diversos atributos
class Response {
    constructor({status, motivo, chNFe, xml, pdf, nfeProc, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.chNFe = chNFe;
        this.xml = xml;
        this.pdf = pdf;
        this.json = JSON.stringify(nfeProc);
        this.erros = erros
    }
}

// Define a função assíncrona sendPostRequest que envia a requisição POST com o corpo e a caminho especificados
async function sendPostRequest(body, caminho) {
    
    try {
        
        // Realiza a requisição POST com a API e armazena a resposta em responseAPI
        let responseAPI = new Response(await nsAPI.PostRequest(url, body))

        // Se a resposta contiver JSON, salva-o em um arquivo com o caminho e chNFe especificados
        if (responseAPI.json != null) {
            util.salvarArquivo(caminho, responseAPI.chNFe, "-nfeProc.json", responseAPI.json)
        }

        // Se a resposta contiver PDF, salva-o em um arquivo com o caminho e chNFe especificados
        if (responseAPI.pdf != null) {
            let data = responseAPI.pdf;
            let buff = Buffer.from(data, 'base64');
            util.salvarArquivo(caminho, responseAPI.chNFe, "-nfeProc.pdf", buff)
        }

        // Se a resposta contiver XML, salva-o em um arquivo com o caminho e chNFe especificados
        if (responseAPI.xml != null) {
            util.salvarArquivo(caminho, responseAPI.chNFe, "-nfeProc.xml", responseAPI.xml)
        }

        // Retorna a resposta
        return responseAPI
    }
    
    catch (error) {
        // Grava a linha de log com o erro
        util.gravarLinhaLog("[ERRO_DOWNLOAD]: " + error)
        // Retorna o erro
        return error
    }
    

}

// Exporta as classes Body e sendPostRequest
module.exports = { Body, sendPostRequest }