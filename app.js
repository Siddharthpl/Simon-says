let userSeq=[];
let gameSeq=[];
let highScore = 0

let btns = ["yellow","red","purple","green"];

let started=false;
let level  = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is started");
        started = true;
        levelup();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },500);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },150);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);
    gameFlash(randBtn);
}


function checkAns(idx){
    

    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup(),1000);
        }

    }else{
        let currScore = level;
        if(currScore>highScore){
            highScore = currScore;
        }

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        h2.innerHTML = `Game Over! Your score: <b> ${level}</b> <br> Highest Score: ${highScore}  <br> Press any key to start.`; 
        resetTo();
    }
}


function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}


function resetTo(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}