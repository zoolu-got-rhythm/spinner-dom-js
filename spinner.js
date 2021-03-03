

// api
function spinner(container, size = 200, radius = 15,
                 speedFps = 40, dotSize = 3, gapSize = 2, nOfDots = 3, dotsColour = "#00ffff"){

    let c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    container.appendChild(c);
    let ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";

    // initialize state vars
    let i = 0;
    let gapSizeBetweenDot = gapSize;
    let j = 0;
    let increment = 0.08;
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
            let fpsInterval, startTime, now, then, elapsed;

            let step = () => {
                let points = [];
                for(let n = 0; n < nOfDots; n++){
                    points.push(j+(gapSizeBetweenDot*n));
                }

                // let points = [j, j+(gapSizeBetweenDot), j+(gapSizeBetweenDot*2)];
                draw(points);
                j += smoothTanhFunction(i);
                if(toggle){
                    i += increment;
                    if(i >= +5)
                        toggle = false;
                }else{
                    i -= increment;
                    if(i <= -3)
                        toggle = true;
                }
            }

            function startAnimating(fps) {
                fpsInterval = 1000 / fps;
                then = Date.now();
                startTime = then;
                animate();
            }

            // the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

            function animate() {

                // request another frame

                requestAnimationFrame(animate);

                // calc elapsed time since last loop

                now = Date.now();
                elapsed = now - then;

                // if enough time has elapsed, draw the next frame

                if (elapsed > fpsInterval) {

                    // Get ready for next frame by setting then=now, but also adjust for your
                    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                    then = now - (elapsed % fpsInterval);

                    // Put your drawing code here
                    step();

                }
            }

            startAnimating(FPS);

            // if(renderTimerId == null)
            //     renderTimerId = window.requestAnimationFrame();



            // if(speedTimerId == null)
            //     speedTimerId = window.setInterval(()=>{
            //         j += smoothTanhFunction(i);
            //         if(toggle){
            //             i += increment;
            //             if(i >= +2)
            //                 toggle = false;
            //         }else{
            //             i -= increment;
            //             if(i <= -2)
            //                 toggle = true;
            //         }
            //     },1000 / speedFps);

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
// \tanh\left(x\cdot0.8\right)\cdot0.5\ +\ 0.6
function smoothTanhFunction(x){
    return Math.tanh(x*0.4) * 0.09 + 0.15;
}
