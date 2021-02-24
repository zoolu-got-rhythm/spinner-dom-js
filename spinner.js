

// api
function spinner(container, size = 200, radius = 25,
                 speedFps = 15, dotSize = 4, gapSize = 0.9, nOfDots = 4, dotsColour = "#00ffff"){

    let c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    container.appendChild(c);
    let ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";

    // initialize state vars
    let i = 0;
    let gapSizeBetweenDot = 0.9;
    let j = 0;
    let increment = 0.1;
    let toggle = true;
    const FPS = 60;
    let speedTimerId = null;
    let renderTimerId = null;

    function getOffset(cubeSize){
        return (size/2) - (cubeSize/2);
    }

    function draw(pointsArr){
        ctx.clearRect(0,0,200,200);
        ctx.fillStyle = dotsColour;
        pointsArr.forEach((point, index) => {
            let offset = getOffset(dotSize);
            // console.log(index);
            // ctx.fillRect(Math.sin(-point) * 20 + offset,Math.cos(point) * 20 + offset,  5, 5);

            ctx.beginPath();
            ctx.arc(Math.sin(-point) * radius + offset,Math.cos(point) * radius + offset, dotSize, 0, 2 * Math.PI);

            ctx.stroke();
            ctx.fill();
        });
    }

    return {
        start: function(){
            if(renderTimerId == null)
                renderTimerId = window.setInterval(()=>{
                    let points = [];
                    for(let n = 0; n < nOfDots; n++){
                        points.push(j+(gapSizeBetweenDot*n));
                    }

                    // let points = [j, j+(gapSizeBetweenDot), j+(gapSizeBetweenDot*2)];
                    draw(points);
                }, 1000 / FPS);

            if(speedTimerId == null)
                speedTimerId = window.setInterval(()=>{
                    j += Math.abs(Math.tanh(i));
                    if(toggle){
                        i += increment;
                        if(i >= 2)
                            toggle = false;
                    }else{
                        i -= increment;
                        if(i <= increment * 2)
                            toggle = true;
                    }
                },1000 / speedFps);

        },

        pause: function(){
            if(renderTimerId != null)
                window.clearInterval(renderTimerId);
            if(speedTimerId != null)
                window.clearInterval(speedTimerId);
            renderTimerId = null;
            speedTimerId = null;
        },

        destroy: function(){
            // kill timers
            this.pause(); // clear/kill timers
            container.removeChild(c);
        }
    }
}
