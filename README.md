# ns-nfe-node

Esta biblioteca possibilita a comunicação e o consumo da solução API para NFe da NS Tecnologia.

Para implementar esta biblioteca em seu projeto, você pode:

1. Realizar a instalação do [pacote](https://www.npmjs.com/package/ns-nfe-node) através do npm:

       npm install ns-nfe-node

2. Realizar o download da biblioteca pelo [GitHub](https://github.com/NSTecnologia/ns-nfe-node/archive/refs/heads/main.zip) e adicionar a pasta "ns-modules" em seu projeto.

# Exemplos de uso do pacote

Para que a comunicação com a API possa ser feita, é necessário informar o seu Token no cabeçalho das requisições.

Para isso, no arquivo chamado `configParceiro.js`, adicione:

       const token = ""
       const CNPJ = ""

       module.exports = {token, CNPJ}
       
Dessa forma, o pacote conseguirá importar as suas configurações, onde você estará informando o token da software house e o cnpj do emitente.

## Emissão

Para realizarmos a emissão de uma NFe, vamos utilizar os seguintes métodos.

Primeiramente, vamos fazer referencia da classe *emitirSincrono*, para utilizarmos o método **emitirNFeSincrono**

O segundo passo é importar, ou construir o arquivo de emissão em **.json** da NFe.
        
Apos isso, vamo utilizar o método **sendPostRequest** da classe *EmissaoSincrona* para realizar o envio deste documento NFe para a API.
Este método realiza a emissão, a consulta de status de processamento e o download de forma sequencial.

Os parâmetros deste método são:

+ *nfeJSON* = objeto NFe que será serializado para envio;
+ *2* = tpAmb = ambiente onde será autorizado a NFe. *1 = produção, 2 = homologação / testes* ;
+ *"XP"* = tpDown = tipo de download, indicando quais os tipos de arquivos serão obtidos no Download;
+ *"Documentos/NFe"* = diretório onde serão salvos os documentos obtidos no download;

O retorno deste método é um objeto json contendo um compilado dos retornos dos métodos realizados pela emissão sincrona
Podemos acessarmos os dados de retorno e aplicarmos validações

## Eventos

### Cancelar NFe

Para realizarmos um cancelamento de uma NFe, devemos gerar o objeto do corpo da requisição e depois, fazer a chamada do método.

Os parâmetros informados no método são:

+ *requisicaoCancelamento* =  Objeto contendo as informações do corpo da requisição de cancelamento;
+ "XP" = tpDown = tipo de download, indicando quais os tipos de arquivos serão obtidos no download do evento de cancelamento;
+ *@"NFe/Eventos/"* = diretório onde serão salvos os arquivos obtidos no download do evento de cancelamento;
+ *true* = exibeNaTela = parâmetro boolean que indica se será exibido na tela, ou não, o PDF obtido no download do evento de cancelamento;

### Carta de Correção para NFe

Para emitirmos uma carta de correção de uma NFe, devemos gerar o objeto do corpo da requisição, utilizando a classe *CartaCorrecao.Body*, e utilzar o método *CartaCorrecao.sendPostRequest*.
        
Os parâmetros informados no método são:

+ *corpo* =  Objeto contendo as informações do corpo da requisição da carta de correção;
+ "XP" = tpDown = tipo de download, indicando quais os tipos de arquivos serão obtidos no download do evento de carta de correção;
+ *"Documentos/NFe/Eventos"* = diretório onde serão salvos os arquivos obtidos no download do evento de carta de correção;

### Inutilização de numeração da NFe

Para emitirmos uma inutilização de numeração da NFe, devemos gerar o objeto do corpo da requisição, utilizando a classe *Inutilizacao.Body*, e utilizar o método *Inutilizacao.sendPostRequest*.

Os parâmetros informados no método são:

+ *requisicaoInutilizar* =  Objeto contendo as informações do corpo da requisição de inutilização;
+ "XP" = tpDown = tipo de download, indicando quais os tipos de arquivos serão obtidos no download do evento de inutilização;
+ *@"NFe/Eventos/"* = diretório onde serão salvos os arquivos obtidos no download do evento de inutilização;
+ *true* = exibeNaTela = parâmetro boolean que indica se será exibido na tela, ou não, o PDF obtido no download do evento de inutilização;

## Utilitários

Ainda com esta biblioteca, é possivel acessar método utilitários da API de NFe.

### Consulta de cadastro de contribuinte

### Consultar situação de NFe
        
### Consultar Status de Web Service

### Agendamento de Envio de E-Mail de NFe
        
### Listagem de nsNRec's vinculados à uma NFe

### Gerar prévia de DANFE 

### Informações Adicionais

Para saber mais sobre o projeto NFe API da NS Tecnologia, consulte a [documentação](https://docsnstecnologia.wpcomstaging.com/docs/ns-nfe/)


