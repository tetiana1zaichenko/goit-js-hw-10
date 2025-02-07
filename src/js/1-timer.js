import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = 0;
let intervalId = null;
let dif = null;
const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");
const clockface = document.querySelector(".timer");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

const options = {
  enableTime: true, // включает выбор времени
  time_24hr: true, //24часовой режим отображения
  defaultDate: new Date(), // начальная выбранная дата (текущая дата)
  minuteIncrement: 1, // шаг ввода минут
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      if (userSelectedDate <= new Date()) {
           
          iziToast.show({
    title: 'Hey',
    message: 'Please choose a date in the future'
});
           btnStart.setAttribute("disabled", "");
           userSelectedDate = 0;
    } else {
      btnStart.removeAttribute("disabled");
    }
  },
};

btnStart.setAttribute("disabled", "");
flatpickr(input, options);


btnStart.addEventListener('click', evt => {
    intervalId = setInterval(countTime, 1000);
    btnStart.setAttribute("disabled", "");
input.setAttribute("disabled", "");
})

const countTime = () => {
    const initTime = Date.now();
     dif = userSelectedDate - initTime;
    const time = convertMs(dif);
    days.textContent = addLeadingZeroForDay(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);

    if (dif = 0) {
        clearInterval(intervalId);
    };
};

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
    const t = value.toString().padStart(2, '0');
    return t;
};

function addLeadingZeroForDay(value) {
    const t = value.toString().padStart(3, '0');
    return t;
}


// function addLeadingZero({ days, hours, minutes, seconds }) {
//     const d = days.toString().padStart(3, '0');
//     const h = hours.toString().padStart(2, '0');
//     const m = minutes.toString().padStart(2, '0');
//     const s = seconds.toString().padStart(2, '0');
//     return `${d}:${h}:${m}:${s}`;

// }


// function getTimeComponents(time) {
//     const days = (Math.floor((time % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)));
//     const hours = (Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//     const mins = (Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = (Math.floor((time % (1000 * 60)) / (1000)));

//     return { days, hours, mins, secs };
// }

// function timeToSTR({ days, hours, mins, secs }) {
//     days = days.toString().padStart(3, '00');
//     hours = hours.toString().padStart(2, '0');
//     mins = mins.toString().padStart(2, '0');
//     secs = secs.toString().padStart(2, '0');
//     return `${days}:${hours}:${mins}:${secs}`;

// }

