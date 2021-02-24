let container = document.getElementById("container");
let spinnerControlsObject = spinner(container);
spinnerControlsObject.start();

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => { spinnerControlsObject.start() });

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => { spinnerControlsObject.pause() });

let destroyButton = document.getElementById("destroy");
destroyButton.addEventListener("click", () => { spinnerControlsObject.destroy() });