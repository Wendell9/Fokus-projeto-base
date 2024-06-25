const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const startPauseIcon = document.querySelector('.app__card-primary-butto-icon');
const startPauseText = document.querySelector('#start-pause-text');
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaOver = new Audio('/sons/beep.mp3');

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');

    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');

    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(botao => botao.classList.remove('active'));

    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal uma respirada,<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície,<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos > 0) {
        tempoDecorridoEmSegundos -= 1;
        mostrarTempo()
    } else {
        musicaOver.play();
        alert('Tempo finalizado!');
        zerar();
    }
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        startPauseIcon.setAttribute('src', '/imagens/play_arrow.png');
        startPauseText.textContent = 'Começar';
        musicaPause.play();
        zerar();
    } else {
        startPauseIcon.setAttribute('src', '/imagens/pause.png');
        startPauseText.textContent = 'Pausar';
        musicaPlay.play();
        intervaloId = setInterval(contagemRegressiva, 1000);
    }
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos*1000)
    const tempoFormatado=tempo.toLocaleString('pt-Br',{minute:'2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
