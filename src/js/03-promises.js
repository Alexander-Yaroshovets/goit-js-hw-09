import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formObj = {
  formEl: document.querySelector('.form'),
  firstDelayEl: document.querySelector("[name='delay']"),
  stepDelayEl: document.querySelector("[name='step']"),
  amountEl: document.querySelector("[name='amount']"),
};

const { formEl, firstDelayEl, stepDelayEl, amountEl } = formObj;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  let firsDelay = Number(firstDelayEl.value);
  const stepDelay = Number(stepDelayEl.value);

  for (let i = 0; i < amountEl.value; i += 1) {
    createPromise(i, firsDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    firsDelay += stepDelay;
  }
  event.currentTarget.reset();
}

formEl.addEventListener('submit', onFormSubmit);
