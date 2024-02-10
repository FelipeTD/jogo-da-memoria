const state = {
    view: {
        points: document.querySelector('#pontuacao'),
    },
    values: {
        points: 5,
    }
}

const emojis = ['🤑', '🤑',  '😱',  '😱',  '😡',  '😡',  '🤡',  '🤡',  '👹',  '👹',  '😺',  '😺',  '🦝',  '🦝',  '🦊',  '🦊'];
let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector('.game').appendChild(box);    
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
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

    if (state.values.points < 0) {
        gameOver();
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add('boxMatch');
        openCards[1].classList.add('boxMatch');
        points('somar');
    } else {
        openCards[0].classList.remove('boxOpen');
        openCards[1].classList.remove('boxOpen');
        points('diminuir');
    }

    openCards = [];

    if (document.querySelectorAll('.boxMatch').length === emojis.length) {
        alert('Você venceu!');
    }
}