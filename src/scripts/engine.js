const state = {
    view: {
        points: document.querySelector('#pontuacao'),
    },
    values: {
        points: 5,
        emojis: ['🤑', '🤑',  '😱',  '😱',  '😡',  '😡',  '🤡',  '🤡',  '👹',  '👹',  '😺',  '😺',  '🦝',  '🦝',  '🦊',  '🦊'],
        openCards: []
    }
}

let shuffleEmojis = state.values.emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

for (let i = 0; i < state.values.emojis.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector('.game').appendChild(box);
}

function showCards() {
    document.querySelectorAll('.item').forEach((item) => {
        item.classList.add('boxOpen');
    });
}

function hideCards() {
    document.querySelectorAll('.item').forEach((item) => {
        item.classList.remove('boxOpen');
    });
}

function handleClick() {
    if (state.values.openCards.length < 2) {
        this.classList.add("boxOpen");
        state.values.openCards.push(this);
    }

    if (state.values.openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function gameOver() {
    alert('Game Over! Você perdeu');
    window.location.reload();
}

function points(option) {
    if (option === 'diminuir') {
        state.values.points--;
    } else {
        state.values.points++;
    }
    state.view.points.textContent = state.values.points;

    if (state.values.points <= 0) {
        gameOver();
    }
}

function checkMatch() {
    if (state.values.openCards[0].innerHTML === state.values.openCards[1].innerHTML) {
        state.values.openCards[0].classList.add('boxMatch');
        state.values.openCards[1].classList.add('boxMatch');
        points('somar');
    } else {
        state.values.openCards[0].classList.remove('boxOpen');
        state.values.openCards[1].classList.remove('boxOpen');
        points('diminuir');
    }

    state.values.openCards = [];

    if (document.querySelectorAll('.boxMatch').length === state.values.emojis.length) {
        alert('Você venceu!');
    }
}

function init() {
    setTimeout(showCards, 0);
    setTimeout(hideCards, 3000);
}

init();