// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtn = document.querySelector('button[data-start]');
const inputDate = document.querySelector('input[type="text"]');
const daysCount = document.querySelector('span[data-days]');
const hoursCount = document.querySelector('span[data-hours]');
const minutesCount = document.querySelector('span[data-minutes]');
const secondsCount = document.querySelector('span[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      Notiflix.Notify.failure(`Please choose a date in the future!`);
      return;
    }
    startBtn.disabled = false;
  },
};

const fp = flatpickr(inputDate, options);

startBtn.addEventListener('click', onStartCount);

function onStartCount() {
  const futureTime = fp.selectedDates[0].getTime();

  const id = setInterval(() => {
    const currentTime = new Date().getTime();
    const timerTime = futureTime - currentTime;
    if (timerTime <= 0) {
      clearInterval(id);
      startBtn.disabled = true;
      Notiflix.Notify.failure(`Please choose a date in the future!`);
      return;
    } else {
      const time = convertMs(timerTime);
      secondsCount.textContent = time.seconds.toString().padStart(2, '0');
      minutesCount.textContent = time.minutes.toString().padStart(2, '0');
      hoursCount.textContent = time.hours.toString().padStart(2, '0');
      daysCount.textContent = time.days.toString().padStart(2, '0');

      const array = Object.values(time);
      const zero = array.every(item => item === 0);

      if (zero) {
        clearInterval(id);
        startBtn.disabled = true;
        Notiflix.Notify.success(`Finally! Great!`);
        return;
      }
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60; // 60'000
  const hour = minute * 60; // 3'600'000
  const day = hour * 24; // 86'400'000

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
