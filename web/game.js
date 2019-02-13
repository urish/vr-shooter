const scene = document.querySelector('#scene');
const heartTemplate = document.querySelector('#heart-model');
const enemyTemplate = document.querySelector('#enemy-model');
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
    clone.setAttribute('scale', '0.01 0.01 0.01');
  });
  scene.appendChild(clone);
}

function createEnemy(name) {
  const el = document.createElement('a-curvedimage');
  el.setAttribute('src', 'dali_llama.jpg');
  el.setAttribute('radius', 20);
  el.setAttribute('theta-length', 10);
  el.setAttribute('height', 8);
  el.setAttribute('theta-start', (Math.random() * 360));
  el.setAttribute('position', '0 4 0');
  scene.appendChild(el);
}

displayScore();
for (i = 0; i < 15; i++) {
  createHeart();
  createEnemy();
}
