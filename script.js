let currentGender = 'girl';
let soundEnabled = true;

function playSound(type) {
    if (!soundEnabled) return;

    let audioFile = '';

    if (type === 'giggle') {
        audioFile = 'giggle.mp3';
    } else if (type === 'yummy' || type === 'chu' || type === 'rattle') {
        audioFile = 'laugh.mp3';
    } else if (type === 'click') {
        return;
    }

    if (audioFile) {
        const audio = new Audio(audioFile);
        audio.play().catch(error => {
            console.log('Audio failed:', error);
        });
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
        cheeks.forEach(cheek => { cheek.style.opacity = '0.5'; });
        if (mouth) mouth.style.backgroundColor = '#FF8C94';
        
        if (title) {
            title.classList.remove('blue');
            title.classList.add('pink');
            title.textContent = 'Pretty little baby 👧';
        }
        if (dragContainer) dragContainer.style.borderColor = '#FF69B4';
        if (genderToggle) genderToggle.style.borderColor = '#FF69B4';

    } else {
        if (boyBtn) boyBtn.classList.add('active');
        if (girlBtn) girlBtn.classList.remove('active');
        if (girlBow) girlBow.style.display = 'none';
        if (boyCap) boyCap.style.display = 'block';
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
    playSound(soundType);

    const babyContainer = document.querySelector('.baby-container');
    if (babyContainer) {
        babyContainer.classList.add('bounce-animation');
        setTimeout(() => {
            babyContainer.classList.remove('bounce-animation');
        }, 500);
    }

    const bubble = document.createElement('div');
    bubble.className = 'reaction-bubble';
    bubble.textContent = text;
    bubble.style.left = (x - 40) + 'px';
    bubble.style.top = (y - 60) + 'px';
    document.body.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 1200);
}

function createHeartsAtPosition(x, y) {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = (x + (Math.random() * 30 - 15)) + 'px';
        heart.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        heart.style.animation = `float-up ${1 + Math.random() * 1}s forwards`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '300';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dragItems = document.querySelectorAll('.drag-item');
    const babyContainer = document.querySelector('.baby-container');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-type'));
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'copy';
            playSound('click');
        });

        item.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
        });
    });

    if (babyContainer) {
        babyContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        babyContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            const itemType = e.dataTransfer.getData('text/plain');
            const dropX = e.clientX;
            const dropY = e.clientY;

            const head = document.querySelector('.head');
            if (head) {
                const headRect = head.getBoundingClientRect();
                const isOnFace = dropX >= headRect.left && dropX <= headRect.right &&
                                 dropY >= headRect.top && dropY <= headRect.bottom;

                if (isOnFace) {
                    if (itemType === 'feeder') {
                        showReaction('Yummy! 🥛', dropX, dropY, 'yummy');
                    } else if (itemType === 'pacifier') {
                        showReaction('Chu chu! 👶', dropX, dropY, 'chu');
                    } else if (itemType === 'rattle') {
                        showReaction('Hee hee! 😊', dropX, dropY, 'giggle');
                        setTimeout(() => playSound('rattle'), 100);
                    }
                } else {
                    showReaction('😢 Missed!', dropX, dropY, 'click');
                }
            }
        });

        babyContainer.addEventListener('click', function(e) {
            const rect = babyContainer.getBoundingClientRect();
            createHeartsAtPosition(rect.left + 175, rect.top + 255);
            playSound('giggle');
            showReactionMessage('😊 Giggles!', rect.left + 175, rect.top + 150);
        });
    }

    setGender('girl');
});