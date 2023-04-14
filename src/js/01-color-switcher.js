const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let changeBodyColor = null;

stopBtn.disabled = true;
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart(evt) {
  evt.target.disabled = true;
  stopBtn.disabled = false;

  changeBodyColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop(evt) {
  clearInterval(changeBodyColor);
  evt.target.disabled = true;
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
