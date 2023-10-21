import { Controller } from '@hotwired/stimulus';
import html2canvas from "html2canvas";

export default class extends Controller {
    connect() {
        this.canvas = this.element.querySelector('canvas');

        this.canvasContext = this.canvas.getContext("2d");

        this.canvasContext.canvas.width = window.innerWidth;
        this.canvasContext.canvas.height = window.innerHeight;

        this.mouseCoordinates = {x:0, y:0};

        this.brushColor = window.getComputedStyle(document.querySelector('a')).color;
        this.eraserColor = window.getComputedStyle(document.body).backgroundColor;

        this.brushSizes = {small: 5, medium: 15, big: 30};
        this.brushSettings = {size: this.brushSizes.medium, color: this.brushColor, linecap:"round"};

        this.trashCan = document.getElementById("trash-icon");

        this.smallBrush = document.getElementById("small-icon");
        this.mediumBrush = document.getElementById("medium-icon");
        this.bigBrush = document.getElementById("big-icon");

        this.brush = document.getElementById("brush-icon");
        this.eraser = document.getElementById("eraser-icon");
        this.save = document.getElementById("save-icon");

        this.colorInput = "";
        this.filenames = ["artpiece", "masterpiece", "art", "my_first_design", "look_mom", "illustration", "finalfinalFinal_v3"];

        document.addEventListener("mouseup", this.stopBrush.bind(this));
        document.addEventListener("mousedown", this.startBrush.bind(this));

        document.addEventListener("touchstart", this.startBrush.bind(this));
        document.addEventListener("touchend", this.stopBrush.bind(this));

        this.boundDrawBrush = this.drawBrush.bind(this);

        document.addEventListener("keydown", this.keyboardPress.bind(this));

        window.addEventListener("resize", this.resize.bind(this));

        this.trashCan.addEventListener("click", this.clearCanvas.bind(this));

        this.smallBrush.addEventListener("click", this.changeBrushSize.bind(this));
        this.mediumBrush.addEventListener("click", this.changeBrushSize.bind(this));
        this.bigBrush.addEventListener("click", this.changeBrushSize.bind(this));

        this.brush.addEventListener("click", this.changeOption.bind(this));
        this.eraser.addEventListener("click", this.changeOption.bind(this));
        this.save.addEventListener("click", this.saveScreen.bind(this));
    }

    updateMouseCoords(e) {
        try {
            let clientX = e.clientX || e.touches[0].clientX;
            let clientY = e.clientY || e.touches[0].clientY;

            this.mouseCoordinates.x = clientX - this.canvas.offsetLeft;
            this.mouseCoordinates.y = clientY - this.canvas.offsetTop;
        } catch(error) {
            //Ignore this error because it is stupid :))
        }
    }

    resize() {
        this.canvasContext.canvas.width = window.innerWidth;
        this.canvasContext.canvas.height = window.innerHeight;
    }

    startBrush(e) {
        document.addEventListener("mousemove", this.boundDrawBrush);
        document.addEventListener("touchmove", this.boundDrawBrush);
        this.updateMouseCoords(e);
    }

    stopBrush() {
        document.removeEventListener("mousemove", this.boundDrawBrush);
        document.removeEventListener("touchmove", this.boundDrawBrush);
    }

    drawBrush(e) {
        this.canvasContext.beginPath();

        this.canvasContext.lineWidth = this.brushSettings.size;
        this.canvasContext.lineCap = this.brushSettings.linecap;
        this.canvasContext.strokeStyle = this.brushSettings.color;

        this.canvasContext.moveTo(this.mouseCoordinates.x, this.mouseCoordinates.y);
        this.updateMouseCoords(e);
        this.canvasContext.lineTo(this.mouseCoordinates.x, this.mouseCoordinates.y);

        this.canvasContext.stroke();
    }

    clearCanvas() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.enableBrush();
    }

    changeBrushSize(e) {
        let clickedSize = e.target.attributes[4].nodeValue;

        if (clickedSize === "small") {
            this.brushSettings.size = this.brushSizes.small;
            this.setBrushSizeActive(this.smallBrush);
            return;
        }

        if (clickedSize === "medium") {
            this.brushSettings.size = this.brushSizes.medium;
            this.setBrushSizeActive(this.mediumBrush);
            return;
        }

        this.brushSettings.size = this.brushSizes.big;
        this.setBrushSizeActive(this.bigBrush);
    }

    changeOption(e) {
        let option = e.target.attributes[4].nodeValue;

        if (option === "eraser") {
            this.enableEraser();
            return;
        }

        this.enableBrush();
    }

    keyboardPress(e) {
        let key = e.key;

        if (key === "Enter") {
            this.brushColor = this.colorInput;
            this.enableBrush();
            this.colorInput = "";
            return;
        }

        if (key === "Shift" || key === "AltGraph" || key === "Control" || key === "Alt" || key === "Tab" || key === "CapsLock") {
            return;
        }

        this.colorInput = this.colorInput + key;
    }

    enableBrush() {
        this.brushSettings.color = this.brushColor;
        this.eraser.classList.remove("active-icon");
        this.brush.classList.add("active-icon");
    }

    enableEraser() {
        this.brushSettings.color = this.eraserColor;
        this.eraser.classList.add("active-icon");
        this.brush.classList.remove("active-icon");
    }

    saveScreen() {
        html2canvas(document.querySelector('body')).then(canvas => {
            let img = this.canvas.toDataURL("image/jpg");
            let a = document.createElement('a');
            a.href = img;
            a.download = this.filenames[Math.floor(Math.random() * this.filenames.length)] + ".jpg";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    setBrushSizeActive(activeElement) {
        this.smallBrush.classList.remove("active-icon");
        this.mediumBrush.classList.remove("active-icon");
        this.bigBrush.classList.remove("active-icon");

        activeElement.classList.add("active-icon");
    }
}
