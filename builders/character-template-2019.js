var fs = require('fs');
var newline = '\n';
var cardsMaster = [
  'Dawn', // 0
  'Stag', // 1
  'Owl', // 2
  'Serpent', // 3
  'Tortoise', // 4
  'Mountain', // 5
  'Storm', // 6
  'Inferno', // 7
  'River', // 8
  'Crown', // 9
  'Coin', // 10
  'Tome', // 11
  'Mask', // 12
  'Woods', // 13
  'Watchtower', // 14
  'Gateway', // 15
  'Gallows', // 16
  'Assassin', // 17
  'Wanderer', // 18
  'Architect', // 19
  'Herald', // 20
  'Dusk', // 21
];

// Update the selections you want here
var characterName = "Quincy";
var characterSuit = "Brooks";
var characterLevel = 3;
var cardsPicked = [
  'Dawn', // 1 - Backstory
  'Dawn', // 1 - Talent
  'Dawn', // 1 - Flaw
  'Dawn', // 1 - Item
  'Dawn', // 2 - Backstory
  'Dawn', // 3 - Talent
  'Dawn', // 4 - Backstory
  'Dawn', // 5 - Talent and Flaw
  'Dawn', // 6 - Talent
  'Dawn', // 7 - Signature Move
  'Dawn', // 8 - Backstory
  'Dawn', // 9 - Talent
  'Dawn', // 10 - Talent
  'Dawn', // 11 - Signature Move
];

var cardFunctions = [
  generateBackstoryTemplate,
  generateTalentTemplate,
  generateFlawTemplate,
  generateItemTemplate,
  generateBackstoryTemplate,
  generateTalentTemplate,
  generateBackstoryTemplate,
  generateTalentFlawTemplate,
  generateTalentTemplate,
  generateSignatureMoveTemplate,
  generateBackstoryTemplate,
  generateTalentTemplate,
  generateTalentTemplate,
  generateSignatureMoveTemplate,
];

function parseCard(card) {
  var cardData = {}
  var data = fs.readFileSync('../cards/' + card + '/card.md', 'utf8');

  cardData.backstories = extractSection('Backstories', 3, data);
  cardData.talents = extractSection('Talents', 4, data);
  cardData.flaws = extractSection('Flaws', 4, data);
  cardData.signature = extractSection('Signature Move', 1, data);
  cardData.items = extractSection('Inventory', 2, data);

  return cardData;
}

function extractSection(sectionTitle, numElements, data) {
  var elements = new Array();
  var startOfSection = data.indexOf('# ' + sectionTitle);
  var startOfElement = startOfSection;
  for(var i = 0; i < numElements; i++) {
    var startOfTitle = data.indexOf('## ', startOfElement + 1);
    startOfElement = startOfTitle;
    startOfElement = data.indexOf(newline, startOfElement + 1);

    var endOfElement = data.indexOf("------------------------------", startOfElement + 1);

    var element = data.substring(startOfTitle, endOfElement);
    element = element.trim();
    elements.push(element);

    startOfElement = endOfElement;
  }

  return elements;
}

function printSection(title, elements) {
  var section = "";
  if(title != "") {
    section += '# ' + title + newline + newline;
  }

  elements.forEach(function(element) {
    section += element;
    section += newline + newline;
    section += "------------------------------" + newline + newline;
  });

  return section;
}

function generateBackstoryTemplate(index, folder, cardData) {
  var fileName = folder + "/" + index + " - 1 Backstory.txt";
  var templateString = printSection('Backstories', cardData.backstories);
  fs.writeFile(fileName, templateString, function(err) { });
}

function generateTalentTemplate(index, folder, cardData) {
  var fileName = folder + "/" + index + " - 1 Talent.txt";
  var templateString = printSection('Talents', cardData.talents);
  fs.writeFile(fileName, templateString, function(err) { });
}

function generateFlawTemplate(index, folder, cardData) {
  var fileName = folder + "/" + index + " - 1 Flaw.txt";
  var templateString = printSection('Flaws', cardData.flaws);
  fs.writeFile(fileName, templateString, function(err) { });
}

function generateItemTemplate(index, folder, cardData) {
  var fileName = folder + "/" + index + " - 1 Item.txt";
  var templateString = printSection('Items', cardData.items);
  fs.writeFile(fileName, templateString, function(err) { });
}

function generateSignatureMoveTemplate(index, folder, cardData) {
  var fileName = folder + "/" + index + " - 1 Signature Move.txt";
  var templateString = printSection('Signature Move', cardData.signature);
  fs.writeFile(fileName, templateString, function(err) { });
}

function generateTalentFlawTemplate(index, folder, cardData) {
  var fileName = folder + "/" + index + " - 1 Talent 1 Flaw.txt";
  var templateString = printSection('Talents', cardData.talents);
  templateString += printSection('Flaws', cardData.flaws);
  fs.writeFile(fileName, templateString, function(err) { });
}

function generateBasisTemplate(characterName, characterSuit, cardsPicked) {
  var fileName = characterName + "/" + "character.txt";

  var templateString = "";
  templateString += characterName + newline + newline;
  templateString += characterSuit + newline;
  cardsPicked.forEach(function(cardPicked) {
    templateString += cardPicked + newline;
  });

  fs.writeFile(fileName, templateString, function(err) { });
}

function generateCharacterTemplate() {
  if (!fs.existsSync(characterName)){
    fs.mkdirSync(characterName);
  }

  for (var i = 0; i + 1 < characterLevel + 4; i++) {
    var cardData = parseCard(cardsPicked[i]);
    var cardFunction = cardFunctions[i];
    cardFunction(i + 1, characterName, cardData);
  }

  generateBasisTemplate(characterName, characterSuit, cardsPicked);
}

generateCharacterTemplate();
