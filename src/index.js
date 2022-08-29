import greenCardsData from './green-cards.js';
import blueCardsData from './blue-cards.js';
import brownCardsData from './brown-cards.js';
import ancientsData from './ancients-cards.js'
import ancients from './ancients.js'



alert(`Привет!:) колода работает только для первого древнего Азатота и для среднего уровня сложности. Чтоб посмотреть карты нажми на 'замешать карты' и потом на рубашку колоды. Набор карт можно посмотреть в консоли`)
const ancientsList = document.querySelector('.ancients-wrapper');

const difficulty = document.querySelector('.difficulty-wrapper');
const cardsShuffle = document.querySelector('.cards-shuffle');

let selectedElement;
let ancient = 'azathoth';
//console.log(ancient);


function highlight(element, classname) {
    if (selectedElement) {
        selectedElement.classList.remove(`${classname}`);
    }
    selectedElement = element;
    selectedElement.classList.add(`${classname}`);

  };

// рамка вокруг выбранного уровня, добавляем класс active-difficulty/active-ancient

difficulty.addEventListener('click',  function(event) {
    let target = event.target;
    highlight(target, 'active-difficulty');
});

ancientsList.addEventListener('click', function(event) {
    let target = event.target;
    ancient = event.target.id;
    console.log (ancient);
    highlight(target, 'active-ancient');
});

//console.log(ancient);

//ищем id активного элемента по клику


function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}




let deck;


cardsShuffle.addEventListener('click', function() {
    setDeck(ancient);
    mythCardFace.classList.remove('myth-card-open');

});

function setDeck (ancient) {
    let blueCardsSet = blueCardsData;
    let greenCardsSet = greenCardsData;
    let brownCardsSet = brownCardsData;
    let firstStageSet = [];
    let secondStageSet = [];
    let thirdStageSet = [];

    deck = [];

    console.log('сеты карт, из которых состаяляются колоды\n', blueCardsSet, greenCardsSet, brownCardsSet);


    //firstStageSet
    let firstStageSetRule = ancientsData.find(a => a.name == ancient).firstStage; //a = имя древнего, ищем где в массиве древний и подбираем количесвто карт
    let secondStageSetRule = ancientsData.find(a => a.name == ancient).secondStage; //a = имя древнего, ищем где в массиве древний и подбираем количесвто карт
    let thirdStageSetRule = ancientsData.find(a => a.name == ancient).thirdStage; //a = имя древнего, ищем где в массиве древний и подбираем количесвто карт
    console.log('набор карт древнего:\n', firstStageSetRule, secondStageSetRule, thirdStageSetRule);

    //собираем набор первого этапа
    for (let i = 0; i < firstStageSetRule.greenCards; i++) {
        let green = getRandom(0, greenCardsSet.length);
        firstStageSet.push(greenCardsSet[green]);
        greenCardsSet = greenCardsSet.filter(e => e !== greenCardsSet[green])
        //greenCardsSet.splice(green, 1);
    }


    for (let i = 0; i < firstStageSetRule.blueCards; i++) {
        let blue = getRandom(0, blueCardsSet.length);
        firstStageSet.push(blueCardsSet[blue]);
        blueCardsSet = blueCardsSet.filter(e => e !== blueCardsSet[blue]);
        //blueCardsSet.splice(blue, 1);
    }
    for (let i = 0; i < firstStageSetRule.brownCards; i++) {
        let brown = getRandom(0, brownCardsSet.length);
        firstStageSet.push(brownCardsSet[brown]);
        brownCardsSet = brownCardsSet.filter(e => e !== brownCardsSet[brown]);

        //brownCardsSet.splice(brown, 1);
    }

    shuffle(firstStageSet);
    // собираем набор второго этапа
    for (let i = 0; i < secondStageSetRule.greenCards; i++) {
        let green = getRandom(0, greenCardsSet.length);
        secondStageSet.push(greenCardsSet[green]);
        greenCardsSet = greenCardsSet.filter(e => e !== greenCardsSet[green])
        //greenCardsSet.splice(green, 1);

    }

    for (let i = 0; i < secondStageSetRule.blueCards; i++) {
        let blue = getRandom(0, blueCardsSet.length);
        secondStageSet.push(blueCardsSet[blue]);
        blueCardsSet = blueCardsSet.filter(e => e !== blueCardsSet[blue]);
        //blueCardsSet.splice(blue, 1);

    }
    for (let i = 0; i < secondStageSetRule.brownCards; i++) {
        let brown = getRandom(0, brownCardsSet.length);
        secondStageSet.push(brownCardsSet[brown]);
        brownCardsSet = brownCardsSet.filter(e => e !== brownCardsSet[brown]);
        //brownCardsSet.splice(brown, 1);
    }

    shuffle(secondStageSet);

    // собираем набор третьего этапа

    for (let i = 0; i < thirdStageSetRule.greenCards; i++) {
        let green = getRandom(0, greenCardsSet.length);
        thirdStageSet.push(greenCardsSet[green]);
        greenCardsSet = greenCardsSet.filter(e => e !== greenCardsSet[green])
        //greenCardsSet.splice(green, 1);

    }

    for (let i = 0; i < thirdStageSetRule.blueCards; i++) {
        let blue = getRandom(0, blueCardsSet.length);
        thirdStageSet.push(blueCardsSet[blue]);
        blueCardsSet = blueCardsSet.filter(e => e !== blueCardsSet[blue]);
        //blueCardsSet.splice(blue, 1);
    }
    for (let i = 0; i < thirdStageSetRule.brownCards; i++) {
        let brown = getRandom(0, brownCardsSet.length);
        thirdStageSet.push(brownCardsSet[brown]);
        brownCardsSet = brownCardsSet.filter(e => e !== brownCardsSet[brown]);
        //brownCardsSet.splice(brown, 1);
    }


    shuffle(thirdStageSet);

    console.log('наборы карт по этапам:\n', firstStageSet, secondStageSet, thirdStageSet);

    deck = [...thirdStageSet, ...secondStageSet, ...firstStageSet] // собираем в обратном порядке, чтоб использовать pop для выкладки карт
    console.log('итоговая колода:\n', deck)

    return deck;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
const mythCardsDeck = document.querySelector('.myth-cards-deck');
const mythCardFace = document.querySelector('.myth-cards-face');

mythCardsDeck.addEventListener('click', function() {
    mythCardFace.classList.add('myth-card-open');
    let card = deck.pop();
    console.log(card);
    let imgLink = `./assets/MythicCards/${card.color}/${card.id}.png`
    document.getElementById('card-face').src = imgLink;
    if (deck.length == 0) {
        mythCardFace.classList.remove('myth-card-open');
    }
});


