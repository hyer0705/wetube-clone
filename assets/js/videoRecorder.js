const recorderContainer = document.getElementById("jsRecordContainer");
const recordeBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;

const handleVideoData = event => {
    console.log(event);
}

const startRecording = () => {
    const videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailabe", handleVideoData);
}

const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordeBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    } catch (error) {
        recordeBtn.innerHTML = "Cant record....:(";
    } finally {
        recordeBtn.removeEventListener("click", getVideo);
    }
}


function init() {
    recordeBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    init();
}