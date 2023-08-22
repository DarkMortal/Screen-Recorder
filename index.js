const start = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: 'screen'
        }
    });
    const data = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (evt) => data.push(evt.data);
    mediaRecorder.onstop = () => {
        document.querySelector('video').src = URL.createObjectURL(
            new Blob(data, { type: data[0].type })
        );
        const link = document.createElement('a');
        link.href = document.querySelector("video").src;
        link.download = "videoplayback.mp4";
        link.click();
    }
    mediaRecorder.onerror = () => alert("There was some error");
    mediaRecorder.start();
}

window.onload = () => {
    document.querySelector('.recording').onclick = start;
}