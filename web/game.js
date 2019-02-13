const scene = document.querySelector('#scene');
const heartTemplate = document.querySelector('#heart-model');
const scoreEl = document.querySelector('#score');
const videoEl = document.querySelector('video');

const winControlsLeft = document.querySelector('#win-controls-left');

let triggered = false;
winControlsLeft.addEventListener('triggerdown', e => (triggered = true));
winControlsLeft.addEventListener('triggerup', e => (triggered = false));

let score = 0;
function displayScore() {
  scoreEl.setAttribute('value', `Score: ${score}`);
}

let hearts = 0;
function createHeart() {
  if (hearts++ > 15) return;
  const clone = heartTemplate.cloneNode();
  clone.setAttribute('position', {
    x: (Math.random() - 0.5) * 20,
    y: 1.5,
    z: (Math.random() - 0.5) * 20
  });
  clone.addEventListener('raycaster-intersected', e => {
    if (triggered) {
      clone.setAttribute('scale', '0 0 0');
      score++;
      displayScore();
    }
  });
  scene.appendChild(clone);
}

createHeart();
displayScore();
setInterval(createHeart, 1000);

// Camera support
navigator.mediaDevices
  .getUserMedia({ audio: false, video: true })
  .then(stream => {
    videoEl.srcObject = stream;
    videoEl.play();
  });
