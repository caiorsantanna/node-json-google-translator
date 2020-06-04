# Node JSON Google Translator

A simple JSON translator using Google Cloud Translation API

### Before you begin

1.  [Select or create a Cloud Platform project](https://console.cloud.google.com/project?pli=1).
1.  [Enable billing for your project](https://cloud.google.com/billing/docs/how-to/modify-project?visit_id=637268912424354933-1833856047&rd=1#enable-billing).
1.  [Enable the Cloud Translation API](https://console.cloud.google.com/flows/enableapi?apiid=translate.googleapis.com&pli=1).
1.  [Get Google Cloud Credentials](https://cloud.google.com/docs/authentication/getting-started) and put them in translator.json on the root of the project

:exclamation: | WIP: Working in progress, only PT-BR translations for other languages, we are working for more
---: | :---

### How to use it

Para usar, basta criar um arquivo `pt.json` na pasta `i18n/` e então rodar o comando:

```bash
 npm run translate
```

Por padrão ele ira gerar os arquivos `en.json` e `es.json` na pasta `i18n/`, mas você pode escolher qualquer linguagem disponivel para traduzir, separando-as por espaço, como por exemplo:

```bash
 npm run translate fr de
```

Você pode listar as linguagens disponíveis usando:

```bash
 npm run languages
```