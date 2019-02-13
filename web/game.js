const scene = document.querySelector('#scene');
const heartTemplate = document.querySelector('#heart-model');
const scoreEl = document.querySelector('#score');

const winControlsLeft = document.querySelector('#win-controls-left');

let triggered = false;
winControlsLeft.addEventListener('triggerdown', e => (triggered = true));
winControlsLeft.addEventListener('triggerup', e => (triggered = false));

let score = 0;
function displayScore() {
  scoreEl.setAttribute('value', `Score: ${score}`);
}

function randomPosition() {
  return {
    x: (Math.random() - 0.5) * 20,
    y: 1.5,
    z: (Math.random() - 0.5) * 20
  };
}

let hearts = 0;
function createHeart() {
  if (hearts++ > 15) return;
  const clone = heartTemplate.cloneNode();
  clone.setAttribute('position', randomPosition());
  clone.addEventListener('click', () => {
    clone.dispatchEvent(new Event('shoot'));
    score++;
    displayScore();
  });
  clone.addEventListener('raycaster-intersected', e => {
    if (triggered) {
      clone.dispatchEvent(new Event('shoot'));
      score++;
      displayScore();
    }
  });
  clone.addEventListener('animationcomplete', () => {
    clone.setAttribute('position', randomPosition());
  });
  scene.appendChild(clone);
}

displayScore();
for (i = 0; i < 15; i++) {
  createHeart();
}
