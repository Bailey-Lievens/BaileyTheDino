import html2canvas from "html2canvas";

// Canvas
let canvas = document.getElementById('canvas');

if (canvas) {
    var canvasContext = canvas.getContext("2d");

    canvasContext.canvas.width = window.innerWidth;
    canvasContext.canvas.height = window.innerHeight;

// Mouse and brush settings
    var mouseCoordinates = {x:0, y:0};

    var brushColor = window.getComputedStyle(document.querySelector('a')).color;
    var eraserColor = window.getComputedStyle(document.body).backgroundColor;

    var brushSizes = {small: 5, medium: 15, big: 30};
    var brushSettings = {size: brushSizes.medium, color: brushColor, linecap:"round"};

// Icons
    var trashCan = document.getElementById("trash-icon");

    var smallBrush = document.getElementById("small-icon");
    var mediumBrush = document.getElementById("medium-icon");
    var bigBrush = document.getElementById("big-icon");

    var brush = document.getElementById("brush-icon");
    var eraser = document.getElementById("eraser-icon");
    var save = document.getElementById("save-icon");

// Other vars
    var colorInput = "";
    var filenames = ["artpiece", "masterpiece", "art", "my_first_design", "look_mom", "illustration", "finalfinalFinal_v3"];

// Event listeners
    document.addEventListener("mouseup", stopBrush);
    document.addEventListener("mousedown", startBrush);

    document.addEventListener("touchstart", startBrush);
    document.addEventListener("touchend", stopBrush);

    document.addEventListener("keydown", keyboardPress);

    window.addEventListener("resize", resize);

    trashCan.addEventListener("click", clearCanvas);

    smallBrush.addEventListener("click", changeBrushSize);
    mediumBrush.addEventListener("click", changeBrushSize);
    bigBrush.addEventListener("click", changeBrushSize);

    brush.addEventListener("click", changeOption);
    eraser.addEventListener("click", changeOption);
    save.addEventListener("click", saveScreen);
}

function updateMouseCoords(e) {
    try {
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;

        mouseCoordinates.x = clientX - canvas.offsetLeft;
        mouseCoordinates.y = clientY - canvas.offsetTop;
    } catch(error) {
        //Ignore this error because it is stupid :))
    }
}

function resize() {
    canvasContext.canvas.width = window.innerWidth;
    canvasContext.canvas.height = window.innerHeight;
}

function startBrush(e) {
    document.addEventListener("mousemove", drawBrush);
    document.addEventListener("touchmove", drawBrush);
    updateMouseCoords(e);
}

function stopBrush() {
    document.removeEventListener("mousemove", drawBrush);
    document.removeEventListener("touchmove", drawBrush);
}

function drawBrush(e) {
    canvasContext.beginPath();

    canvasContext.lineWidth = brushSettings.size;
    canvasContext.lineCap = brushSettings.linecap;
    canvasContext.strokeStyle = brushSettings.color;

    canvasContext.moveTo(mouseCoordinates.x, mouseCoordinates.y);
    updateMouseCoords(e);
    canvasContext.lineTo(mouseCoordinates.x, mouseCoordinates.y);

    canvasContext.stroke();
}

function clearCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    enableBrush();
}

function changeBrushSize(e) {
    let clickedSize = e.target.attributes[4].nodeValue;

    if (clickedSize === "small") {
        brushSettings.size = brushSizes.small;
        setBrushSizeActive(smallBrush);
        return;
    }

    if (clickedSize === "medium") {
        brushSettings.size = brushSizes.medium;
        setBrushSizeActive(mediumBrush);
        return;
    }

    brushSettings.size = brushSizes.big;
    setBrushSizeActive(bigBrush);
}

function changeOption(e) {
    let option = e.target.attributes[4].nodeValue;

    if (option === "eraser") {
        enableEraser();
        return;
    }

    enableBrush();
}

function keyboardPress(e) {
    let key = e.key;

    if (key === "Enter") {
        brushColor = colorInput;
        enableBrush();
        colorInput = "";
        return;
    }

    if (key === "Shift" || key === "AltGraph" || key === "Control" || key === "Alt" || key === "Tab" || key === "CapsLock") {
        return;
    }

    colorInput = colorInput + key;
}

function enableBrush() {
    brushSettings.color = brushColor;
    eraser.classList.remove("active-icon");
    brush.classList.add("active-icon");
}

function enableEraser() {
    brushSettings.color = eraserColor;
    eraser.classList.add("active-icon");
    brush.classList.remove("active-icon");
}

function saveScreen() {
    html2canvas(document.querySelector('body')).then(canvas => {
        let img = canvas.toDataURL("image/jpg");
        let a = document.createElement('a');
        a.href = img;
        a.download = filenames[Math.floor(Math.random()*filenames.length)] + ".jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}

function setBrushSizeActive(activeElement) {
    smallBrush.classList.remove("active-icon");
    mediumBrush.classList.remove("active-icon");
    bigBrush.classList.remove("active-icon");

    activeElement.classList.add("active-icon");
}