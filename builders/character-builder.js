var fs = require('fs');
var newline = '\n';
var numCards = 22;
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

function getRandomCards() {
  var cards = new Array();

  var randomNumbers = randomArray(4, 22);
  cards.push(cardsMaster[randomNumbers[0]]);
  cards.push(cardsMaster[randomNumbers[1]]);
  cards.push(cardsMaster[randomNumbers[2]]);
  cards.push(cardsMaster[randomNumbers[3]]);

  console.log(cards);
  return cards;
}

function convertCardsToCharacter(cardData) {
  var characterData = {};
  characterData.backstories = new Array();
  characterData.talents = new Array();
  characterData.flaws = new Array();
  characterData.signature = new Array();
  characterData.items = new Array();

  var card1 = cardData[0]; // 1 Backstory, 2 Talents, Signature Move, Items
  var card2 = cardData[1]; // 1 Backstory, 1 Talent, 1 Flaw, Signature Move, Items
  var card3 = cardData[2]; // 1 Backstory, 2 Talents, Signature Move, Items
  var card4 = cardData[3]; // 1 Backstory, 1 Talent, 1 Flaw, Signature Move, Items

  // Backstories
  characterData.backstories.push(card1.backstories[randomNumber(3)]);
  characterData.backstories.push(card2.backstories[randomNumber(3)]);
  characterData.backstories.push(card3.backstories[randomNumber(3)]);
  characterData.backstories.push(card4.backstories[randomNumber(3)]);

  // Talents
  var talentArray1 = randomArray(2, 4);
  characterData.talents.push(card1.talents[talentArray1[0]]);
  characterData.talents.push(card1.talents[talentArray1[1]]);
  characterData.talents.push(card2.talents[randomNumber(4)]);
  var talentArray2 = randomArray(2, 4);
  characterData.talents.push(card3.talents[talentArray2[0]]);
  characterData.talents.push(card3.talents[talentArray2[1]]);
  characterData.talents.push(card4.talents[randomNumber(4)]);

  // Flaws
  characterData.flaws.push(card2.flaws[randomNumber(4)]);
  characterData.flaws.push(card4.flaws[randomNumber(4)]);

  // Signature Move
  var signatures = new Array();
  signatures.push(card1.signature[0]);
  signatures.push(card2.signature[0]);
  signatures.push(card3.signature[0]);
  signatures.push(card4.signature[0]);
  characterData.signature.push(signatures[randomNumber(4)]);

  // Items
  var items = new Array();
  items.push(card1.items[0]);
  items.push(card1.items[1]);
  items.push(card2.items[0]);
  items.push(card2.items[1]);
  items.push(card3.items[0]);
  items.push(card3.items[1]);
  items.push(card4.items[0]);
  items.push(card4.items[1]);
  var itemArray = randomArray(2, 8);
  characterData.items.push(items[itemArray[0]]);
  characterData.items.push(items[itemArray[1]]);

  return characterData;
}

function generateCharacter() {
  var randomCards = getRandomCards();
  var cardData = new Array();
  randomCards.forEach(function(randomCard) {
    cardData.push(parseCard(randomCard));
  });

  return convertCardsToCharacter(cardData);
}

function printSection(title, elements) {
  var section = "# " + title + newline + newline
  elements.forEach(function(element) {
    section += element;
    section += newline + newline;
    section += "------------------------------" + newline + newline;
  });

  return section;
}

function printCharacter(character) {
  var characterString = "";

  characterString += printSection('Backstories', character.backstories);
  characterString += printSection('Talents', character.talents);
  characterString += printSection('Flaws', character.flaws);
  characterString += printSection('Signature Move', character.signature);
  characterString += printSection('Inventory', character.items);

  return characterString;
}

function generateCharacterFile() {
  var character = generateCharacter();
  var characterString = printCharacter(character);
  fs.writeFile('character.md', characterString, function(err) { });
}

function randomNumber(max) {
 return Math.floor(Math.random() * max);
}

function randomArray(num, max) {
  var choices = new Array();
  var randomNumbers = new Array();
  for(var i = 0; i < max; i++) {
    choices.push(i);
  }

  for(var i = 0; i < num; i++) {
    var randNum = Math.floor(Math.random() * (choices.length));
    randomNumbers.push(choices[randNum]);
    choices.splice(randNum,1);
  }

  return randomNumbers;
}

generateCharacterFile();
