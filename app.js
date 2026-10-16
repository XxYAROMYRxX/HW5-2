import { error, success, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import './style.css';
import Chart from 'chart.js/auto';


const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', 'q', 'w', 'e'];

let currentKeyIndex = 0;
let gameKeys = [];

const keyElement = document.querySelector('#key');
const messageElement = document.querySelector('#message');
const newGameButton = document.querySelector('#new-game');

function startGame() {
  gameKeys = [...keys].sort(() => Math.random() - 0.5);
  currentKeyIndex = 0;
  keyElement.textContent = gameKeys[currentKeyIndex].toUpperCase();
  messageElement.textContent = 'Натисни правильну клавішу!';
  notice({
    text: 'Нову гру розпочато!',
    delay: 1500,
  });
}

document.addEventListener('keydown', event => {
  if (currentKeyIndex >= gameKeys.length) {
    return;
  }
  const pressedKey = event.key.toLowerCase();
  const currentKey = gameKeys[currentKeyIndex];
  if (pressedKey === currentKey) {
    currentKeyIndex++;

    if (currentKeyIndex === gameKeys.length) {
      keyElement.textContent = '✓';
      messageElement.textContent = 'Ти переміг!';

      success({
        text: 'Вітаю! Усі клавіші натиснуто правильно!',
      });
      return;
    }
    keyElement.textContent =
      gameKeys[currentKeyIndex].toUpperCase();
    messageElement.textContent = 'Правильно! Продовжуй!';
    success({
      text: 'Правильна клавіша!',
      delay: 1000,
    });
  } else {
    messageElement.textContent = 'Неправильно! Спробуй ще раз.';
    error({
      text: `Потрібно натиснути "${currentKey.toUpperCase()}"`,
      delay: 1500,
    });
  }
});

document.addEventListener('keypress', event => {
  event.preventDefault();
});

newGameButton.addEventListener('click', startGame);
startGame();



const chartData = {
  labels: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
  ],
  datasets: [
    {
      label: 'Продажі за останній місяць',
      data: [
        150, 220, 180, 200, 250, 300, 280, 350, 400, 380,
        420, 450, 500, 550, 600, 650, 700, 750, 800, 850,
        900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350
      ],
      backgroundColor: '#2196f3',
      borderColor: '#2196f3',
      borderWidth: 2,
    },
  ],
};

const canvas = document.querySelector('#sales-chart');

const salesChart = new Chart(canvas, {
  type: 'line',
  data: chartData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});