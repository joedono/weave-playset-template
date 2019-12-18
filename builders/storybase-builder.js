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

function parseBaseCard(card) {
  var cardData = {}
  var data = fs.readFileSync('../cards/' + card + '/card.md', 'utf8');

  cardData.locations = extractSection('Locations', 2, data);
  cardData.themes = extractSection('Theme', 1, data);

  return cardData;
}

function extractSection(sectionTitle, numElements, data) {
  var elements = new Array();
  var startOfSection = data.indexOf('# ' + sectionTitle);
  var startOfElement = startOfSection;
  for(var i = 0; i < numElements; i++) {
    var startOfTitle = data.indexOf('## ', startOfElement + 1);
    var startOfElement = data.indexOf('## ', startOfElement + 1);
    startOfElement = data.indexOf(newline, startOfElement + 1);

    var endOfElement = data.indexOf(newline, startOfElement + 1);
    if(endOfElement == -1) {
      endOfElement = data.length;
    }

    var element = data.substring(startOfTitle, endOfElement);
    element = element.trim();
    elements.push(element);
  }

  return elements;
}

function parseBossCard(card) {
  var data = fs.readFileSync('../cards/' + card + '/boss.md', 'utf8');
  return data;
}

function getRandomCards() {
  var cards = new Array();

  var randomNumbers = randomArray(3, 22);
  cards.push(cardsMaster[randomNumbers[0]]);
  cards.push(cardsMaster[randomNumbers[1]]);
  cards.push(cardsMaster[randomNumbers[2]]);

  console.log(cards);
  return cards;
}

function convertCardsToStoryBase(cardData) {
  var storyBaseData = {};
  storyBaseData.theme = cardData[0].themes[0];
  storyBaseData.location = cardData[1].locations[randomNumber(2)];
  storyBaseData.boss = cardData[2];

  return storyBaseData;
}

function generateStoryBase() {
  var randomCards = getRandomCards();
  var cardData = new Array();
  cardData.push(parseBaseCard(randomCards[0]));
  cardData.push(parseBaseCard(randomCards[1]));
  cardData.push(parseBossCard(randomCards[2]));

  return convertCardsToStoryBase(cardData);
}

function printSection(title, text) {
  var sectionString = '# ' + title + newline + newline;
  sectionString += text;
  sectionString += newline + newline;
  return sectionString;
}

function printStoryBase(storyBase) {
  var storyString = "";
  storyString += printSection('Theme', storyBase.theme);
  storyString += printSection('Location', storyBase.location);
  storyString += printSection('Boss', storyBase.boss);

  return storyString;
}

function generateStoryBaseFile() {
  var storyBase = generateStoryBase();
  var storyBaseString = printStoryBase(storyBase);
  fs.writeFile('storybase.md', storyBaseString, function(err) { });
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

generateStoryBaseFile();
