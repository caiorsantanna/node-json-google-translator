const {Translate} = require('@google-cloud/translate').v2;

const projectId = 'translator-269517'
const keyFilename = "./translator.json"
const translate = new Translate({projectId, keyFilename});

async function run() {
  const [languages] = await translate.getLanguages();

  console.log('Languages:');
  languages.forEach(language => console.log(language));
}

run();