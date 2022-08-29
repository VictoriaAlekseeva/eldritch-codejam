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
console.log(ancient);


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

console.log(ancient);

//ищем id активного элемента по клику


function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}



let firstStageSet = [];
let secondStageSet = [];
let thirdStageSet = [];

let deck;
cardsShuffle.addEventListener('click', function() {setDeck(ancient)});

function setDeck (ancient) {
    deck = [];
    //firstStageSet
    let firstStageSetRule = ancientsData.find(a => a.name == ancient).firstStage; //a = имя древнего, ищем где в массиве древний и подбираем количесвто карт
    let secondStageSetRule = ancientsData.find(a => a.name == ancient).secondStage; //a = имя древнего, ищем где в массиве древний и подбираем количесвто карт
    let thirdStageSetRule = ancientsData.find(a => a.name == ancient).thirdStage; //a = имя древнего, ищем где в массиве древний и подбираем количесвто карт
    console.log('набор карт древнего:\n', firstStageSetRule, secondStageSetRule, thirdStageSetRule);

    //собираем набор первого этапа
    for (let i = 0; i < firstStageSetRule.greenCards; i++) {
        firstStageSet.push(greenCardsData[getRandom(0, greenCardsData.length)]);
    }

    for (let i = 0; i < firstStageSetRule.blueCards; i++) {
        firstStageSet.push(blueCardsData[getRandom(0, blueCardsData.length)]);
    }
    for (let i = 0; i < firstStageSetRule.brownCards; i++) {
        firstStageSet.push(brownCardsData[getRandom(0, brownCardsData.length)]);
    }

    // собираем набор второго этапа
    for (let i = 0; i < secondStageSetRule.greenCards; i++) {
        secondStageSet.push(greenCardsData[getRandom(0, greenCardsData.length)]);
    }

    for (let i = 0; i < secondStageSetRule.blueCards; i++) {
        secondStageSet.push(blueCardsData[getRandom(0, blueCardsData.length)]);
    }
    for (let i = 0; i < secondStageSetRule.brownCards; i++) {
        secondStageSet.push(brownCardsData[getRandom(0, brownCardsData.length)]);
    }

    // собираем набор третьего этапа

    for (let i = 0; i < thirdStageSetRule.greenCards; i++) {
        thirdStageSet.push(greenCardsData[getRandom(0, greenCardsData.length)]);
    }

    for (let i = 0; i < thirdStageSetRule.blueCards; i++) {
        thirdStageSet.push(blueCardsData[getRandom(0, blueCardsData.length)]);
    }
    for (let i = 0; i < thirdStageSetRule.brownCards; i++) {
        thirdStageSet.push(brownCardsData[getRandom(0, brownCardsData.length)]);
    }

    console.log('наборы карт по этапам:\n', firstStageSet, secondStageSet, thirdStageSet);

    deck = [...thirdStageSet, ...secondStageSet, ...firstStageSet] // собираем в обратном порядке, чтоб использовать pop для выкладки карт
console.log('итоговая колода:\n', deck)

    firstStageSet = [];
    secondStageSet = [];
    thirdStageSet = [];

    return deck;
}



const mythCardsDeck = document.querySelector('.myth-cards-deck');
const mythCardFace = document.querySelector('.myth-cards-face');


mythCardsDeck.addEventListener('click', function() {
    mythCardFace.classList.add('myth-card-open');
    let card = deck.pop();
    let imgLink = `./assets/MythicCards/${card.color}/${card.id}.png`
    document.getElementById('card-face').src = imgLink;

});


