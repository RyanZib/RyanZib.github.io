const dropArea = document.getElementById('dropArea');
const bin = document.getElementById('bin');
const masterVolumeControl = document.getElementById('masterVolume');
const instrumentVolumeContainer = document.getElementById('instrumentVolume');
let sounds = [];
let syncTime = 0;

// Store initial positions
const initialPositions = {};

document.querySelectorAll('.icon').forEach(icon => {
    const rect = icon.getBoundingClientRect();
    initialPositions[icon.id] = {
        top: icon.style.top,
        left: icon.style.left,
        parent: icon.parentElement
    };

    icon.setAttribute('data-text', icon.textContent);
    icon.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.textContent);
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
    const draggedElement = document.querySelector(`.icon[data-text='${data}']`);
    const soundFile = draggedElement.getAttribute('data-sound');

    // Calculate position within the drop area
    const dropX = event.clientX - dropArea.offsetLeft - (draggedElement.offsetWidth / 2);
    const dropY = event.clientY - dropArea.offsetTop - (draggedElement.offsetHeight / 2);
    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${Math.max(0, Math.min(dropX, dropArea.offsetWidth - draggedElement.offsetWidth))}px`;
    draggedElement.style.top = `${Math.max(0, Math.min(dropY, dropArea.offsetHeight - draggedElement.offsetHeight))}px`;
    dropArea.appendChild(draggedElement);

    console.log(`Dropped: ${data} at X: ${draggedElement.style.left}, Y: ${draggedElement.style.top}`);

    playSound(soundFile, draggedElement);
});

bin.addEventListener('dragover', (event) => {
    event.preventDefault();
});

bin.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.querySelector(`.icon[data-text='${data}']`);
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
    sounds.forEach(({ audio }) => {
        audio.volume = masterVolumeControl.value;
    });
});

function playSound(soundFile, element) {
    const audio = new Audio(soundFile);
    audio.loop = true; // Set loop to true for continuous playback
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

    instrumentVolumeContainer.innerHTML = '';
    instrumentVolumeContainer.appendChild(label);

    sounds.push({ audio, element, volumeControl });

    if (sounds.length === 1) {
        audio.play();
        syncTime = audio.currentTime;
    } else {
        audio.currentTime = syncTime;
        audio.play();
    }

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
    });

    audio.addEventListener('ended', () => {
        sounds = sounds.filter(sound => sound.audio !== audio);
        instrumentVolumeContainer.innerHTML = '';
        hideInstrumentVolume();
    });
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

function showInstrumentVolume(icon) {
    const soundObject = sounds.find(({ element }) => element === icon);
    if (soundObject) {
        const volumeControl = soundObject.volumeControl.cloneNode(true);
        const label = document.createElement('label');
        label.textContent = 'Instrument Volume: ';
        label.appendChild(volumeControl);

        instrumentVolumeContainer.innerHTML = '';
        instrumentVolumeContainer.appendChild(label);
    }
}

function hideInstrumentVolume() {
    instrumentVolumeContainer.innerHTML = '';
}
