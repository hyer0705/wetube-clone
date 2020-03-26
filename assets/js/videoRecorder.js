const recorderContainer = document.getElementById("jsRecordContainer");
const recordeBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    const {
        data: videoFile
    } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
};

const stopRecording = () => {
    videoRecorder.stop();
    recordeBtn.removeEventListener("click", stopRecording);
    recordeBtn.addEventListener("click", getVideo);
    recordeBtn.innerHTML = "Start recording";
};

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordeBtn.addEventListener("click", stopRecording);
};


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
};


function init() {
    recordeBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    init();
}