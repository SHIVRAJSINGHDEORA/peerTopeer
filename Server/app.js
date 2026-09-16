// Updates the select element with the provided set of cameras
function updateCameraList(cameras) {
  const listElement = document.querySelector("select#availableCameras");
  listElement.innerHTML = "";
  cameras.forEach((camera) => {
    const cameraoption = document.createElement("option");

    cameraoption.label = camera.label;
    cameraoption.value = camera.deviceId;

    listElement.appendChild(cameraoption);
  });
}

// Fetch an array of devices of a certain type
async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

// Get the initial set of cameras connected
const init = async () => {
  const constraints = { video: true, audio: true };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  console.log(stream);

  const videoCameras = await getConnectedDevices("videoinput");
  console.log(videoCameras);
  updateCameraList(videoCameras);
};

init();

// Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener("devicechange", async (event) => {
  const newCameraList = await getConnectedDevices("videoinput");
  updateCameraList(newCameraList);
});
