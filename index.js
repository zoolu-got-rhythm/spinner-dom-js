let c = document.getElementById("c");
let ctx = c.getContext("2d");

ctx.fillStyle = "#000000";

let blockSize = 15;
// var blockSize = 200 / 10;
let i = 0;
let fps = 1000 / 40;
let currentFps = fps;
let gapSizeBetweenDot = 0.9;
// let tid = window.setInterval(()=>{
//
// },1000 / currentFps)

let milliSecsElapsed = 0;
for(let k = 0; k < 100; k += 0.01){
    window.setTimeout(()=>{
        let points = [i, i+(gapSizeBetweenDot), i+(gapSizeBetweenDot*2), i+(gapSizeBetweenDot*3)];
        draw(points);
        i += 0.2;
    }, milliSecsElapsed);
    currentFps = fps * Math.abs(Math.cos(k));
    milliSecsElapsed += currentFps;
    console.log(currentFps);
}

function getOffset(cubeSize){
    return 100 - (cubeSize/2);
}

function draw(pointsArr){
    ctx.clearRect(0,0,200,200);
    ctx.fillStyle = "#00ffff";
    pointsArr.forEach((point, index) => {
        let offset = getOffset(4);
        // console.log(index);
        // ctx.fillRect(Math.sin(-point) * 20 + offset,Math.cos(point) * 20 + offset,  5, 5);

        ctx.beginPath();
        ctx.arc(Math.sin(-point) * 25 + offset,Math.cos(point) * 25 + offset, 4, 0, 2 * Math.PI);

        ctx.stroke();
        ctx.fill();
    });

}
