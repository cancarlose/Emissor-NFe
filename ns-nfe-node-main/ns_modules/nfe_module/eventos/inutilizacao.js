// Importação de módulos e funções
const nsAPI = require('../../api_module/nsAPI')
const downloadInut = require("./downloadInutilizacao")

// URL do serviço de download de eventos
const url = "https://nfe.ns.eti.br/nfe/inut"

// Classe que representa o corpo da requisição
class Body {
    constructor(cUF, tpAmb, ano, CNPJ, serie, nNFIni, nNFFin, xJust) {
        this.cUF = cUF;
        this.tpAmb = tpAmb;
        this.ano = ano;
        this.CNPJ = CNPJ;
        this.serie = serie;
        this.nNFIni = nNFIni;
        this.nNFFin = nNFFin;
        this.xJust = xJust;
    }
}

// Classe que representa a resposta do serviço
class Response {
    constructor({ status, motivo, retornoInutNFe, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.retornoInutNFe = retornoInutNFe;
        this.erro = erro
    }
}

// Envia a requisição POST para a URL do serviço
async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {
    try {
        // Envia a requisição POST e recebe a resposta da API
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))

        // Verifica se a resposta da API possui sucesso
        if (responseAPI.status == 102){
            // Monta o corpo da requisição para o download da inutilização
            let downloadInutBody = new downloadInut.Body(responseAPI.retornoInutNFe.chave, "2", tpDown)

            // Envia a requisição POST para baixar a inutilização
            let downloadInutResponse = await downloadInut.sendPostRequest(downloadInutBody, caminhoSalvar)

            // Retorna a resposta da inutilização baixada
            return downloadInutResponse
        }
        else{
            // Retorna a resposta da API
            return responseAPI
        }
    }catch (error) {
        // Retorna o erro ocorrido
        return error
    }

}

module.exports = { Body, sendPostRequest }
