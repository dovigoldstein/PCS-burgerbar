(function () {
    "use strict";
    var canvas = document.getElementById("theCanvas"),
        context = canvas.getContext('2d'),
        bounceSound = document.getElementById("bounce"),
        radius = 50,
        x = 75,
        y = 75,
        directionX = 1,
        directionY = 1,
        bounce = true;



    function resizeCanvas() {
        canvas.width = window.innerWidth - 10;
        canvas.height = window.innerHeight - 10;
    }

    window.addEventListener('resize', resizeCanvas);

    function drawCircle() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        // context.fillStyle = '#e40c2a';
        if (bounce) {
            context.fillStyle = rgbGenerate();
        }
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.stroke();
        context.fill();
    }

    setInterval(function () {
        bounce = false;
        if (x + radius >= canvas.width) {
            directionX = -1;
            bounce = true;
        } else if (x - radius <= 0) {
            directionX = 1;
            bounce = true;
        } else if (y + radius >= canvas.height) {
            directionY = -1;
            bounce = true;
        } else if (y - radius <= 0) {
            directionY = 1;
            bounce = true;
        }

        if (bounce) {
            bounceSound.currentTime = 0;
            bounceSound.play();
        }

        x += directionX;
        y += directionY;
        drawCircle();
    }, 10);

    function rgbGenerate() {
        var rgb = 'rgb(';
        var rgbArray = [];
        for (var x = 0; x < 3; x++) {
            rgbArray.push(Math.floor(Math.random() * 256));
        }
        return rgb += rgbArray.join(',') + ')';
    }

    resizeCanvas();
    drawCircle();
}());