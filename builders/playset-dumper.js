var fs = require('fs');
var yaml = require('js-yaml');
var MarkdownIt = require('markdown-it');
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
  var md = new MarkdownIt();
  var data = fs.readFileSync('../cards/' + card + '/card.md', 'utf8');
  var result = md.parse(data);
  var cardData = {};
  var quality = {};
  var subQuality = {};
  var mode = "";
  var elementTitle = "";
  var bulletList = "";
  var qualityId = 1;
  var importElement = true;

  for(var i = 0; i < result.length; i++) {
    switch(result[i].type) {
      case "heading_open":
        switch(result[i].tag) {
          case "h1":
            mode = "element";
            break;
          case "h2":
            mode = "quality";
            break;
          case "h3":
            mode = "subquality";
            break;
        }

        break;
      case "bullet_list_open":
        bulletList = "";
        mode = "bulletList";
        break;
      case "bullet_list_close":
        subQuality.description = bulletList.trim();
        bulletList = "";
        mode = "";
        break;
      case "inline":
        switch (mode) {
          case "element":
            if (result[i].content == "Backstories" || result[i].content == "Talents" || result[i].content == "Flaws" || result[i].content == "Signature Move" || result[i].content == "Inventory") {
              importElement = true;
              elementTitle = result[i].content;
              cardData[elementTitle] = [];
            } else {
              importElement = false;
            }

            mode = "";
            break;
          case "quality":
            if (importElement) {
              quality = {};
              cardData[elementTitle].push(quality);
              quality.id = qualityId;
              quality.title = result[i].content;
              quality.description = "";
              quality.subQualities = [];
              qualityId++;
              mode = "qualityDescription";
            }

            break;
          case "qualityDescription":
            if (importElement) {
              quality.description = result[i].content;
              mode = "";
            }

            break;
          case "subquality":
            if (importElement) {
              subQuality = {};
              quality.subQualities.push(subQuality);
              subQuality.title = result[i].content;
              mode = "subqualityDescription";
            }

            break;
          case "subqualityDescription":
            if (importElement) {
              subQuality.description = result[i].content;
              mode = "";
            }

            break;
          case "bulletList":
            if (importElement) {
              bulletList += " " + result[i].content;
            }

            break;
        }
      break;
    }
  }

  return cardData;
}

function start() {
  var cards = {};

  for (var i = 0; i < cardsMaster.length; i++) {
    cards[cardsMaster[i]] = parseCard(cardsMaster[i]);
  }

  var fileName = "playset.yml";
  var options = {
    lineWidth: 350
  };
  fs.writeFile(fileName, yaml.safeDump(cards, options), function(err) { });
}

start();
