const constraints = {
    audio: false,
    video: {
        mandatory: {
            minWidth: 853,
            minHeight: 480,
            maxWidth: 853,
            maxHeight: 480
        }
    }
};


exports.init = (nav, videoEl) => {
    // nav is navigator
    nav.getUserMedia = nav.webkitGetUserMedia;
    nav.getUserMedia(constraints, (stream) => handleSuccess(videoEl, stream), handleError);
}

exports.captureBytes = (videoEl, ctx, canvasEl) => {
    ctx.drawImage(videoEl, 0, 0);
    return canvasEl.toDataURL('image/png');
}

exports.captureBytesFromLiveCanvas = (canvasEl) => {
    return canvasEl.toDataURL('image/png');
}

function handleSuccess(videoEl, stream) {
    videoEl.src = window.URL.createObjectURL(stream);
}

function handleError(err) {
    console.log('Camera error: ', err);
}