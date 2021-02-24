let c = document.getElementById("c");
let ctx = c.getContext("2d");

ctx.fillStyle = "#000000";

let blockSize = 15;
// var blockSize = 200 / 10;
// let fps = 1000 / 40;
// let currentFps = fps;


let i = 0;
let gapSizeBetweenDot = 0.9;
// let tid = window.setInterval(()=>{
//
// },1000 / currentFps)
let j = 0;
// let milliSecsElapsed = 0;
// for(let k = 0; k < 100; k += 0.01){

let incrementor = 0.1;

let toggle = true;



window.setInterval(()=>{
    j += Math.abs(Math.tanh(i));
    if(toggle){
        i += incrementor;
        if(i >= 2)
            toggle = false;
    }else{
        i -= incrementor;
        if(i <= incrementor * 2)
            toggle = true;
    }
},1000 / 15);


window.setInterval(()=>{
    let points = [j, j+(gapSizeBetweenDot), j+(gapSizeBetweenDot*2)];
    draw(points);
}, 1000 / 60);
    // currentFps = fps * Math.abs(Math.cos(k));
    // milliSecsElapsed += currentFps;
    // console.log(currentFps);
// }

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
