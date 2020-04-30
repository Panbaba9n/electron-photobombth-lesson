const { ipcRenderer, shell, remote } = require('electron');

const video = require('./video');
const countdown = require('./countdown');
const flash = require('./flash');
const effects = require('./effects');

const images = remote.require('./images'); // creates ipc betwean capture and images

let canvasTarget;
let seriously;
let videoSrc;

window.addEventListener('DOMContentLoaded', () => {
    const videoEl = document.getElementById('video');
    const canvasEl = document.getElementById('canvas');
    const recordEl = document.getElementById('record');
    const photosEl = document.querySelector('.photosContainer');
    const counterEl = document.getElementById('counter');
    const flashEl = document.getElementById('flash');

    const ctx = canvasEl.getContext('2d');

    seriously = new Seriously();
    videoSrc = seriously.source('#video');
    canvasTarget = seriously.target('#canvas');
    effects.choose(seriously, videoSrc, canvasTarget, 'ascii');

    video.init(navigator, videoEl);

    recordEl.addEventListener('click', () => {
        countdown.start(counterEl, 3, () => {
            flash(flashEl);
            const bytes = video.captureBytes(videoEl, ctx, canvasEl);
            ipcRenderer.send('image-captured', bytes);
            photosEl.appendChild(formatImgTag(document, bytes));
        });
    });

    photosEl.addEventListener('click', (evt) => {
        const isRm = evt.target.classList.contains('photoClose');
        const selector = isRm ? '.photoClose' : '.photoImg';

        const photos = Array.from(document.querySelectorAll(selector));
        const index = photos.findIndex(el => el = evt.target);

        if(index > -1) {
            if (isRm) {
                ipcRenderer.send('image-remove', index);
            } else {
                shell.showItemInFolder(images.getFromCache(index));
            }
        }
    });
});

function formatImgTag(doc, bytes) {
    const div = doc.createElement('div');
    div.classList.add('photo');
    const close = doc.createElement('div');
    close.classList.add('photoClose');
    const img = new Image();
    img.classList.add('photoImg');
    img.src = bytes;
    div.appendChild(img);
    div.appendChild(close);
    return div;
}

ipcRenderer.on('image-removed', (evt, index) => {
    document.getElementById('photos').removeChild(Array.from(document.querySelectorAll('.photo'))[index]);
});