
let currentGender = 'girl';
let soundEnabled = true;

function playSound(type) {
    if (!soundEnabled) return;


try{
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = 0.3;

    if (type === 'giggle') {
        oscillator.frequency.value = 880;
        oscillator.type = 'sine';
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);

        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.value = 1046.50;
            osc2.type = 'sine';
            gain2.gain.value = 0.25;
            gain2.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.2);

            osc2.start();
            osc2.stop(audioContext.currentTime + 0.15);
        }, 100);
    }
    else if (type === 'yummy') {
        oscillator.frequency.value = 523.25;
        oscillator.type = 'sine';
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.4);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    else if (type === 'chu') {
        oscillator.frequency.value = 349.23;
        oscillator.type = 'sine';
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.2);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15);
    }
    else if (type === 'rattle') {
        oscillator.frequency.value = 1318.52;
        oscillator.type = 'triangle';
        gainNode.gain.value = 0.2;
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);

        for (let i = 0; i < 3;  i++) {
            setTimeout(() => {
                const osc3 = audioContext.createOscillator();
                const gain3 = audioContext.createGain();
                osc3.connect(gain3);
                gain3.connect(audioContext.destination);
                osc3.frequency.value = 987.77 + (i * 100);
                osc3.type = 'triangle';
                gain3.gain.value = 0.15;
                gain3.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
                osc3.start();
                osc3.stop(audioContext.currentTime + 0.08);
            }, i * 50);
        }
    }
    else if (type === 'click') {
        oscillator.frequency.value = 440;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1;
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.08);
    }

    setTimeout(() => {
        audioContext.close();
    }, 500);
} catch(e) {
    console.log('Audio not supported'); 
}
}

function setGender(gender) {
currentGender = gender;
playSound('click');

const girlBtn = document.querySelector('.gender-btn-vertical.girl');
const boyBtn = document.querySelector('.gender-btn-vertical.boy');
const girlBow = document.getElementById('girlBow');
const boyCap = document.getElementById('boyCap');
const dragContainer = document.getElementById('dragItemsContainer');
const genderToggle = document.getElementById('genderToggle');
const babyContainer = document.getElementById('babyContainer');
const cheeks = document.querySelectorAll('.cheek');
const body = document.getElementById('babyBody');
const title = document.getElementById('title');
const mouth = document.querySelector('.mouth');

if (gender === 'girl') {
    if (girlBtn) girlBtn.classList.add('active');
    if (boyBtn) boyBtn.classList.remove('active');
    if (girlBow) girlBow.style.display = 'block';
    if (boyCap) boyCap.style.display = 'none';
    if (dragContainer) dragContainer.classList.remove('boy-mode');
    if (genderToggle) genderToggle.classList.remove('boy-mode');
    if (babyContainer) {
        babyContainer.classList.remove('boy-mode', 'boy');
        babyContainer.classList.add('girl');
    }

    if (body) body.style.backgroundColor = '#FFAAA5';
    cheeks.forEach(cheek => { cheek.style.opacity = '0.5';});
    if (mouth) mouth.style.backgroundColor = '#FF8C94';
    
if (title) {
    title.classList.remove('blue');
    title.classList.add('pink');
    title.textContent = 'Pretty little baby 👧';
}
    if (dragContainer) dragContainer.style.borderColor = '#FF69B4';
    if (genderToggle) genderToggle.style.borderColor = '#FF69B4';

    showReactionMessage('👧 Pretty Little Girl 💕', 200, 200);

} else {
    if (boyBtn) boyBtn.classList.add('active');
    if (girlBtn) girlBtn.classList.remove('active');
    if (girlBow) girlBow.style.display = 'none';
    if (boyCap) boyCap.style.display ='block';
    if (dragContainer) dragContainer.classList.add('boy-mode');
    if (genderToggle) genderToggle.classList.add('boy-mode');
    if (babyContainer) {
        babyContainer.classList.remove('girl');
        babyContainer.classList.add('boy-mode', 'boy');
    }

    if (body) body.style.backgroundColor = '#87CEEB';
    cheeks.forEach(cheek => {
        cheek.style.backgroundColor = '#FF69B4';
        cheek.style.opacity = '0.3';
    });

    if (mouth) mouth.style.backgroundColor = '#FFAAA5';

   if (title) {
      title.classList.remove('pink');
      title.classList.add('blue');
      title.textContent = 'Pretty Little Baby 👦';
   }

    if (dragContainer) dragContainer.style.borderColor = '#87CEEB';
    if (genderToggle) genderToggle.style.borderColor = '#87CEEB';

    showReactionMessage('👦 Pretty Little Boy! 💙', 200, 200);
  }
}

function showReactionMessage(text, x, y) {
const bubble = document.createElement('div');
bubble.className = 'reaction-bubble';
bubble.textContent = text;
bubble.style.left = (x - 40) + 'px';
bubble.style.top = (y - 60) + 'px';
document.body.appendChild(bubble);

setTimeout(() => {
    bubble.remove();
}, 1500);
}

function showReaction(text, x, y, soundType) {
const bubble = document.createElement('div');
bubble.className = 'reaction-bubble';
bubble.textContent = text;
bubble.style.left = (x - 40) + 'px';
bubble.style.top = (y - 60) + 'px';
document.body.appendChild(bubble);

playSound(soundType);

const mouth = document.querySelector('.mouth');

if (text === 'Yummy! 🥛' || text === 'Yummy! 🍼') {
    createHeartsAtPosition(x, y);
    mouth.style.transform = 'scale(0.9)';
    setTimeout(() => {
        mouth.style.transform = 'scale(1)';
    }, 300);
} else if (text == 'Chu chu! 👶') {
    mouth.style.width = '38px';
    setTimeout(() => {
        mouth.style.width = '45px';
    }, 500);
} else if (text === 'Hee hee! 😊') {
    mouth.style.backgroundColor = "#FF69B4";
} else {
    mouth.style.backgroundColor = '#FFAAA5';
}

setTimeout(() => {
    mouth.style.height = '22px';
    if (currentGender === 'girl') {
        mouth.style.backgroundColor = '#FF8C94';
    } else {
        mouth.style.backgroundColor = '#FFAAA5';
    }
}, 800);
const babyContainer = document.querySelector('.baby-container');
babyContainer.classList.add('bounce-animation');
setTimeout(() => {
    babyContainer.classList.remove('bounce-animation');
}, 500);
}

setTimeout(() => {
bubble.remove();
}, 1000);


function createHeartsAtPosition(x, y) {
for (let i = 0; i < 5; i++) {
const heart = document.createElement('div');
heart.innerHTML = '❤️';
heart.style.position = 'fixed';
heart.style.fontSize = (15 + Math.random() * 15) + 'px';
heart.style.left = (x - 50 + Math.random() * 100) + 'px';
heart.style.top = (y - 80 + Math.random() * 60) + 'px';
heart.style.opacity = '0';
heart.style.animation = `float-up ${1 + Math.random() * 1}s forwards`;
heart.style.pointerEvents = 'none';
heart.style.zIndex = '300';
document.body.appendChild(heart);

setTimeout(() => {
    heart.remove();
}, 2000);
}
}

const dragItems = document.querySelectorAll('.drag-item');
const babyContainer = document.querySelector('.baby-container');

dragItems.forEach(item => {
item.addEventListener('dragstart', function(e){
e.dataTransfer.setData('text/plain', this.getAttribute('data-type'));
this.classList.add('dragging');
e.dataTransfer.effectAllowed = 'copy';
playSound('click');
});

item.addEventListener('dragend', function(e) {
this.classList.remove('dragging');
});
});

babyContainer.addEventListener('dragover', function(e) {
e.preventDefault();
e.dataTransfer.dropEffect = 'copy';
});

babyContainer.addEventListener('drop', function(e) {
e.preventDefault();
const itemType = e.dataTransfer.getData('text/plain');
const rect = babyContainer.getBoundingClientRect();
const dropX = e.clientX;
const dropY = e.clientY;

const headRect = document.querySelector('.head').getBoundingClientRect();
const isOnFace = dropX >= headRect.left && dropX <= headRect.right &&
            dropY >= headRect.top && dropY <= headRect.bottom;

if (isOnFace) {
if (itemType === 'feeder') {
    showReaction('Yummy! 🥛', dropX, dropY, 'yummy');
} else if (itemType === 'pacifier') {
    showReaction('Chu chu! 👶', dropX, dropY, 'chu');
}else if (itemType === 'rattle') {
    showReaction('Hee hee! 😊', dropX, dropY, 'giggle');


    setTimeout(() => playSound('rattle'), 100);
}
}else {
showReaction('😢 Missed!', dropX, dropY, 'click');
}
});

babyContainer.addEventListener('click', function(e) {
const rect= babyContainer.getBoundingClientRect();
createHeartsAtPosition(rect.left + 175, rect.top + 255);
playSound('giggle');
showReactionMessage('😊 Giggles!', rect.left + 175, rect.top + 150);
});

const soundToggle = document.getElementById('soundToggle');
soundToggle.addEventListener('click', function(){
soundEnabled = !soundEnabled;
this.textContent = soundEnabled ? '🔊' : '🔇';
const instructions = document.querySelector('.instructions');
if (soundEnabled) {
instructions.innerHTML = '🔊 SOUND ENABLED | ✨ Drag items onto baby\'s face! | Bottle → "Yummy!" | Pacifier → "Chu chu!" | Rattle → "Hee hee!" ✨';
showReactionMessage('🔊 Sound On!', 200, 200);
} else {
instructions.innerHTML = '🔇 SOUND OFF | ✨ Drag items onto baby\'s face! | Bottle → "Yummy!" | Pacifier → "Chu chu!" | Rattle → "Hee hee!" ✨';
showReactionMessage('🔇 Sound Off!', 200, 200);
}
});

setGender('girl');
