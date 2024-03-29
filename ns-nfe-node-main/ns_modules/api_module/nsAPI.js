// Importa os módulos necessários
const axios = require('axios')
const configParceiro = require('../../../configParceiro')
const util = require('./util')

// Configurações do header
const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

// Função assíncrona de solicitação de postagem
async function PostRequest(url, body) {
	// grava linha dos logs
    util.gravarLinhaLog('[URL_ENVIO]: ' + JSON.stringify(url))
    util.gravarLinhaLog('[DADOS_ENVIO]: ' + JSON.stringify(body))

    let responseAPI

    try {
        responseAPI = await axios.post(url, JSON.stringify(body), { headers: header })
        // grava linha dos logs
        util.gravarLinhaLog('[DADOS_RESPOSTA]: ' + JSON.stringify(responseAPI.data))
    } catch (error) {
        // grava linha dos logs
        util.gravarLinhaLog('[ERRO_ENVIAR_REQUISICAO]: ' + JSON.stringify(error.response.data))
        responseAPI = error.response.data
    }
    return responseAPI
}

module.exports = { PostRequest }
