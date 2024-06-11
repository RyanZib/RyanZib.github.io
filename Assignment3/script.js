const dropArea = document.getElementById('dropArea');
const bin = document.getElementById('bin');
const masterVolumeControl = document.getElementById('masterVolume');
const instrumentVolumeContainer = document.getElementById('instrumentVolume');
let sounds = [];
let isPlaying = false;

// Stores inital icon postions so when instrument is put in the bin they can return to the propper spot
const initialPositions = {};

document.querySelectorAll('.icon').forEach(icon => {
    const rect = icon.getBoundingClientRect();
    initialPositions[icon.id] = {
        top: icon.style.top,
        left: icon.style.left,
        parent: icon.parentElement
    };
// so sound is found when dragging over, most of these codes where through the help of https://forum.freecodecamp.org/t/javascript-html-drag-and-drop-with-sound/408197

    icon.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.getAttribute('data-sound'));
    });

    icon.addEventListener('click', () => {
        showInstrumentVolume(icon);
    });
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.querySelector(`.icon[data-sound='${data}']`);
    const soundFile = draggedElement.getAttribute('data-sound');

    // Calculate position within the drop area
    const dropX = event.clientX - dropArea.offsetLeft - (draggedElement.offsetWidth / 2);
    const dropY = event.clientY - dropArea.offsetTop - (draggedElement.offsetHeight / 2);
    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${Math.max(0, Math.min(dropX, dropArea.offsetWidth - draggedElement.offsetWidth))}px`;
    draggedElement.style.top = `${Math.max(0, Math.min(dropY, dropArea.offsetHeight - draggedElement.offsetHeight))}px`;
    dropArea.appendChild(draggedElement);

    console.log(`Dropped: ${data} at X: ${draggedElement.style.left}, Y: ${draggedElement.style.top}`);

    // Check if the sound is already playing
    const existingSound = sounds.find(({ element }) => element === draggedElement);
    if (!existingSound) {
        stopAllSounds();
        playSound(soundFile, draggedElement);
        restartAllSounds();
    }
});

bin.addEventListener('dragover', (event) => {
    event.preventDefault();
});

bin.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.querySelector(`.icon[data-sound='${data}']`);
    stopSound(draggedElement);

    // Reset the element to its initial position
    const initialPosition = initialPositions[draggedElement.id];
    draggedElement.style.position = '';
    draggedElement.style.left = initialPosition.left;
    draggedElement.style.top = initialPosition.top;
    initialPosition.parent.appendChild(draggedElement);

    hideInstrumentVolume();
});

masterVolumeControl.addEventListener('input', () => {
    const masterVolume = masterVolumeControl.value;
    sounds.forEach(({ audio }) => {
        audio.volume = masterVolume;
    });
});

function playSound(soundFile, element) {
    const audio = new Audio(soundFile);
    audio.loop = true;
    const volumeControl = document.createElement('input');
    volumeControl.type = 'range';
    volumeControl.min = '0';
    volumeControl.max = '1';
    volumeControl.step = '0.01';
    volumeControl.value = '1';
    volumeControl.style.width = '60px';

    const label = document.createElement('label');
    label.textContent = 'Instrument Volume: ';
    label.appendChild(volumeControl);

    sounds.push({ audio, element, volumeControl });

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
    });

    audio.addEventListener('ended', () => {
        sounds = sounds.filter(sound => sound.audio !== audio);
        instrumentVolumeContainer.innerHTML = '';
        hideInstrumentVolume();
    });

    showInstrumentVolume(element);
}

function stopSound(element) {
    const soundObject = sounds.find(({ element: el }) => el === element);
    if (soundObject) {
        soundObject.audio.pause();
        soundObject.audio.currentTime = 0;
        sounds = sounds.filter(({ element: el }) => el !== element);
        instrumentVolumeContainer.innerHTML = '';
        hideInstrumentVolume();
    }
}

function stopAllSounds() {
    sounds.forEach(({ audio }) => {
        audio.pause();
        audio.currentTime = 0;
    });
}

function restartAllSounds() {
    sounds.forEach(({ audio }) => {
        audio.play();
    });
}

function showInstrumentVolume(icon) {
    const soundObject = sounds.find(({ element }) => element === icon);
    if (soundObject) {
        instrumentVolumeContainer.innerHTML = '';
        const volumeControl = soundObject.volumeControl.cloneNode(true);
        const label = document.createElement('label');
        label.textContent = 'Instrument Volume: ';
        label.appendChild(volumeControl);

        instrumentVolumeContainer.appendChild(label);

        volumeControl.addEventListener('input', () => {
            soundObject.audio.volume = volumeControl.value;
        });
    }
}

function hideInstrumentVolume() {
    instrumentVolumeContainer.innerHTML = '';
}
