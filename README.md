# Gerar Pix Sicredi

#### Uma implementação simples em TypeScript para facilitar a geração de cobranças e o recebimento de eventos de webhook Pix em integrações com o Sicredi.

##### Esta classe oferece uma solução completa e segura para interagir com a API Pix do Sicredi, permitindo aos desenvolvedores criar cobranças, atualizar webhooks, e acessar dados de cobrança de forma eficiente e confiável. 

###### Com este módulo, você pode integrar facilmente o sistema de pagamentos Pix do Sicredi em seus aplicativos e serviços, automatizando processos de cobrança e acompanhando eventos em tempo real.

 
## CONTATO 

<a href="https://wa.me/5566996852025" target="_blank"> 
<img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" title="+55 66 99685-2025"/> 
</a>
<a href="https://t.me/raphaelserafim" target="_blank">
<img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white"  />
</a>  
<a href="https://www.linkedin.com/in/raphaelvserafim" target="_blank">
<img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a> 



## Versão em PHP 
<a href="https://github.com/raphaelvserafim/api-sicredi-pix" target="_blank">Gerar Pix com PHP</a>


## Iniciando

```sh
npm i @raphaelvserafim/gerar-pix-sicredi
```

# Uso
```ts
import { PixSicredi } from "@raphaelvserafim/gerar-pix-sicredi";
```
### ou
```js
const { PixSicredi } = require("@raphaelvserafim/gerar-pix-sicredi");
```

## InitPix
```ts
const initPix: InitPix = {
    producao: 0,
    client_id: "",
    client_secret: "",
    crt_file: "/certificado.pem",
    key_file: "/APLICACAO.key",
    pass: ""
};

const pix  = new PixSicredi(initPix);
```


## Atualizando URL WebHook Receber Eventos Pix:
```ts
const response = await pix.updateWebhook("url", "chave-pix");
```

## Geração de cobranças Pix:
```ts
const cobranca: Cobranca = {
    calendario: {
        dataDeVencimento: "2040-04-01",
        validadeAposVencimento: 1
    },
    valor: {
        original: 10.00,
        modalidadeAlteracao: 1
    },
    chave: "23711695000115",
    solicitacaoPagador: "Serviço realizado.",
    infoAdicionais: [
        {
            nome: "cliente_id",
            valor: "1234"
        },
        {
            nome: "fatura_id",
            valor: 123334
        }
    ]
};
const response = await pix.criarCobranca(cobranca);
```
 
## Informações de uma Cobrança Pix:
```ts
const response = await pix.dadosDeCobranca("id");
```
 