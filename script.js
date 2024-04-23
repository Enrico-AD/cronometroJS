const timerEl = document.getElementById('timer');
const marksList = document.getElementById('marks-list');
let intervalId = null;
let timer = 0;
let marks = [];

// Formatar o tempo para exibição
const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const hundredths = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
};

// Atualizar o display do cronômetro
const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
};

// Alternar o cronômetro (start/pause/continue)
const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    if (action === 'start' || action === 'continue') {
        intervalId = setInterval(() => {
            timer += 10;
            setTimer(timer);
        }, 10);

        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';

    } else if (action === 'pause') {
        clearInterval(intervalId);

        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
};

// Resetar o cronômetro
const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    setTimer(timer);

    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';

    // Limpar a lista de marcas
    marks = [];
    marksList.innerHTML = '';
};

// Marcar o tempo atual
const markTime = () => {
    marks.push(formatTime(timer));
    const newMark = document.createElement('p');
    newMark.innerText = `Marca ${marks.length}: ${formatTime(timer)}`;
    marksList.appendChild(newMark);
};

// Conectar as funções aos botões
document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('mark').addEventListener('click', markTime);
