

// api
function spinner(container, size = 200, radius = 15,
                 speedFps = 40, dotSize = 3, gapSize = 2, dotsColours = ["#ff9933", "#4dff4d", "#ff80df"]){

    let c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    container.appendChild(c);
    let ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";

    // initialize state vars
    let x = 0;
    let j = 0;
    let gapSizeBetweenDot = gapSize;
    let increment = 0.1; // make this a constant?
    let toggle = true;
    const FPS = 60; // could to try modes between 60 and 30(less intensive mode)
    let speedTimerId = null;
    let renderTimerId = null;

    function getOffset(cubeSize){
        return (size/2) - (cubeSize/2);
    }

    function draw(pointsArr){
        ctx.clearRect(0,0,200,200);
        pointsArr.forEach((point, index) => {

            ctx.fillStyle = dotsColours[index];

            let offset = getOffset(dotSize);

            // console.log(index);
            // ctx.fillRect(Math.sin(-point) * 20 + offset,Math.cos(point) * 20 + offset,  5, 5);

            ctx.beginPath();
            ctx.arc(Math.sin(-point) * radius + offset,Math.cos(point) * radius + offset, dotSize, 0, 2 * Math.PI);

            ctx.stroke();
            ctx.fill();
        });
    }

    let rafId = null;
    return {
        start: function(){
            if(rafId != null)
                return;

            const RAF_INTERVAL = 16.7;
            let fpsInterval, startTime, now, then, elapsed;
            const nOfDots = dotsColours.length;

            let step = () => {
                let points = [];
                for(let n = 0; n < nOfDots; n++){
                    points.push(j+(gapSizeBetweenDot*n));
                }

                // let points = [j, j+(gapSizeBetweenDot), j+(gapSizeBetweenDot*2)];
                draw(points);
                let y = smoothTanhFunction(x);
                j += y;
                // console.log(y);
                if(toggle){
                    x += increment;
                    if(x >= +5)
                        toggle = false;
                }else{
                    x -= increment;
                    if(x <= -3)
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

                rafId = requestAnimationFrame(animate);

                // calc elapsed time since last loop

                now = Date.now();
                elapsed = now - then;

                // if enough time has elapsed, draw the next frame

                if (elapsed > fpsInterval) {

                    // Get ready for next frame by setting then=now, but also adjust for your
                    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)

                    // overhead can lead to drift?
                    let overhead = (elapsed % fpsInterval);

                    // if(overhead > 0)
                    // console.log(overhead);
                    then = now - overhead;

                    // Put your drawing code here
                    step(overhead / RAF_INTERVAL);

                }
            }

            startAnimating(FPS);
        },

        pause: function(){
            if(rafId != null){
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }
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
    return Math.tanh(x*0.5) * 0.4 + 0.4;
}
