import { Controller } from '@hotwired/stimulus';
import html2canvas from 'html2canvas';

export default class extends Controller {
    connect() {
        //Canvas variables
        const canvas = document.getElementById('canvas');
        const canvasContext = canvas.getContext('2d');

        //Mouse and brush variables
        let mouseCoord = {x:0, y:0};
        let brushColor = window.getComputedStyle( document.getElementById('websiteLogo') ,null).getPropertyValue('color');
        let eraserColor = window.getComputedStyle(document.body).backgroundColor;
        let brushSizes = {small: 5, medium: 15, big: 30};
        let brushSettings = {size: brushSizes.medium, color: brushColor, linecap:'round'};

        //Icon variables
        let trashCan = document.getElementById('trashIcon');
        let smallBrush = document.getElementById('smallIcon');
        let mediumBrush = document.getElementById('mediumIcon');
        let bigBrush = document.getElementById('bigIcon');
        let brush = document.getElementById('brushIcon');
        let eraser = document.getElementById('eraserIcon');
        let save = document.getElementById('saveIcon');

        //Other variables
        let colorInput = '';
        let filenames = ['artpiece', 'masterpiece', 'art', 'my_first_design', 'look_mom', 'illustration'];

        //Event listeners
        document.addEventListener('mouseup', stopBrush);
        document.addEventListener('mousedown', startBrush);

        document.addEventListener('touchstart', startBrush);
        document.addEventListener('touchend', stopBrush);

        document.addEventListener('keydown', keyboardPress);

        window.addEventListener('resize', resize);

        trashCan.addEventListener('click', clearCanvas);
        smallBrush.addEventListener('click', changeBrushSize);
        mediumBrush.addEventListener('click', changeBrushSize);
        bigBrush.addEventListener('click', changeBrushSize);
        brush.addEventListener('click', changeOption);
        eraser.addEventListener('click', changeOption);
        save.addEventListener('click', saveScreen);

        resize();

        startingScreen();

        function resize() {
            canvasContext.canvas.width = window.innerWidth;
            canvasContext.canvas.height = window.innerHeight;
        }

        function startingScreen() {
            // fetch(''/ajax/visitorCount.php'', {
            //     method: ''GET''
            // })
            // .then(response => response.json())
            // .then(result => {
            //     let visitorCount = result.result;
            //     visitorCount = visitorCount.padStart(9, '0');
            //     visitorCount = visitorCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ''.'');
            //     canvasContext.font = ''40px sans-serif'';
            //
            //     let text1 = visitorCount;
            //     let text1Offset = (canvas.width / 2) - (canvasContext.measureText(text1).width / 2);
            //     canvasContext.fillText(text1, text1Offset, 200);
            // })
            // .catch(error => {
            //     console.error(''Error:'', error);
            // })
        }

        function updateMouseCoords(e) {
            try {
                let clientX = e.clientX || e.touches[0].clientX;
                let clientY = e.clientY || e.touches[0].clientY;

                mouseCoord.x = clientX - canvas.offsetLeft;
                mouseCoord.y = clientY - canvas.offsetTop;
            } catch(error) {
                //Ignore this error because it is stupid :))
            }
        }

        function startBrush(e) {
            document.addEventListener('mousemove', drawBrush);
            document.addEventListener('touchmove', drawBrush);
            updateMouseCoords(e);
        }

        function stopBrush() {
            document.removeEventListener('mousemove', drawBrush);
            document.removeEventListener('touchmove', drawBrush);
        }

        function drawBrush(e) {
            canvasContext.beginPath();

            canvasContext.lineWidth = brushSettings.size;
            canvasContext.lineCap = brushSettings.linecap;
            canvasContext.strokeStyle = brushSettings.color;

            canvasContext.moveTo(mouseCoord.x, mouseCoord.y);
            updateMouseCoords(e);
            canvasContext.lineTo(mouseCoord.x, mouseCoord.y);

            canvasContext.stroke();
        }

        function clearCanvas() {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            enableBrush();
        }

        function changeBrushSize(e) {
            let clickedSize = e.target.attributes[4].nodeValue;

            if (clickedSize === 'small') {
                brushSettings.size = brushSizes.small;
                setBrushSizeActive(smallBrush);
                return;
            }

            if (clickedSize === 'medium') {
                brushSettings.size = brushSizes.medium;
                setBrushSizeActive(mediumBrush);
                return;
            }

            brushSettings.size = brushSizes.big;
            setBrushSizeActive(bigBrush);
        }

        function changeOption(e) {
            let option = e.target.attributes[4].nodeValue;

            if (option === 'eraser') {
                enableEraser();
                return;
            }

            enableBrush();
        }

        function keyboardPress(e) {
            let key = e.key;

            if (key === 'Enter') {
                brushColor = colorInput;
                enableBrush();
                colorInput = '';
                return;
            }

            if (key === 'Shift' || key === 'AltGraph' || key === 'Control' || key === 'Alt' || key === 'ab' || key === 'CapsLock') {
                return;
            }

            colorInput = colorInput + key;
        }

        function updateBrushColor() {
            brushSettings.color = brushColor;
        }

        function enableBrush() {
            updateBrushColor();
            eraser.classList.remove('active-icon');
            brush.classList.add('active-icon');
        }

        function enableEraser() {
            brushSettings.color = eraserColor;
            eraser.classList.add('active-icon');
            brush.classList.remove('active-icon');
        }

        function saveScreen() {
            html2canvas(document.getElementById('capture')).then(canvas => {
                let img = canvas.toDataURL('image/jpg');
                let a = document.createElement('a');
                a.href = img;
                a.download = filenames[Math.floor(Math.random()*filenames.length)] + '.jpg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        }

        function setBrushSizeActive(activeElement) {
            smallBrush.classList.remove('active-icon');
            mediumBrush.classList.remove('active-icon');
            bigBrush.classList.remove('active-icon');

            activeElement.classList.add('active-icon');
        }
    }
}
