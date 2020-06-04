const jsonfile = require('jsonfile')
const {Translate} = require('@google-cloud/translate').v2
const fs = require("fs")

const ptFile = './i18n/pt.json'
const projectId = 'translator-269517'
const keyFilename = "./translator.json"

const translate = new Translate({projectId, keyFilename});

let total = 0
let current = 0
let percent = 0

async function run(args) {

  const languages = args.length ? args : ['en', 'es'];
  const file = await jsonfile.readFile(ptFile);

  countObject(file);
  total = total * (args.length || languages.length);

  let translations = [];

  languages.forEach(language => translations.push(translateObject(file, language)));
  Promise.all(translations).then((files) => {
    let i = 0;
    languages.forEach((language) => {
      fs.writeFileSync(`./i18n/${language}.json`, JSON.stringify(files[i++], null, 2));
    });
  });
}

function countObject(obj) {
  for (var [key, value] of Object.entries(obj)) {
    if(typeof value === "object") {
      countObject(value)
    } else {
      total++;
    }
  }
}

function log(percent, language = '', value = '') {
  console.clear();
  console.log(`\n\t(${percent.toFixed(2)}%) Translating to [${language}]: '${value}'\n`)
}

async function translateObject(obj, language) {
  let finalObject = {}
  for (var [key, value] of Object.entries(obj)) {
    if(typeof value === "object") {
      finalObject[key] = await translateObject(value, language)
    } else {
      try {
        const [translation] = await translate.translate(value, {
          from: 'pt',
          to: language
        })
        current++;
        percent = (current / total) * 100;

        log(percent, language, value);

        finalObject[key] = translation
      } catch (err) {
        console.log(err)
      }
    }
  }
  return finalObject
}

run(process.argv ? process.argv.slice(2) : '');