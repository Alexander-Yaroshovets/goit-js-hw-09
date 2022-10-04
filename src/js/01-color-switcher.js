function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');
let intervalId = null;
startEl.addEventListener('click', () => {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startEl.disabled = true;
  stopEl.disabled = false;
});
stopEl.addEventListener('click', () => {
  clearInterval(intervalId);
  stopEl.disabled = true;
  startEl.disabled = false;
});
