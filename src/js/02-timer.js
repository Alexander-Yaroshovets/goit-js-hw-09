import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const timerObj = {
  startEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  minutesEl: document.querySelector('[data-minutes]'),
  hoursEl: document.querySelector('[data-hours]'),
  secondsEl: document.querySelector('[data-seconds]'),
  inputEl: document.querySelector('#datetime-picker'),
};
const { inputEl, startEl, daysEl, minutesEl, hoursEl, secondsEl } = timerObj;
let targetDate = null;
const options = {
  intervalId: null,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    const dateDiff = targetDate - Date.now();
    if (dateDiff <= 0) {
      Notify.failure('Please choose a date in the future');
      startEl.disabled = true;
      return;
    } else {
      startEl.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

startEl.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const dateDiff = targetDate - Date.now();
    startEl.disabled = true;
    inputEl.disabled = true;

    if (dateDiff <= 1000) {
      clearInterval(intervalId);
    }
    const data = convertMs(dateDiff);
    daysEl.textContent = addLeadingZero(data.days);
    hoursEl.textContent = addLeadingZero(data.hours);
    minutesEl.textContent = addLeadingZero(data.minutes);
    secondsEl.textContent = addLeadingZero(data.seconds);
  }, 1000);
});
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
