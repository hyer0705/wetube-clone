const recorderContainer = document.getElementById("jsRecordContainer");
const recordeBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
    } catch (error) {
        recordeBtn.innerHTML = "Cant record....:(";
        recordeBtn.removeEventListener("click", startRecording);
    }
}


function init() {
    recordeBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
    init();
}