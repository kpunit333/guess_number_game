let range = $('#range');
let outRange = $('.outrange');

let target = range.val();
let randomNum = Math.floor((Math.random() * target) + 1);

let score = 20;
let hiscore = 0;

let upArrow = 'url(./upArrow.png)'

let dnArrow = 'url(./dnArrow.png)'

let tick = 'url(./green-tick.png)'

let partyGif = 'url(./party.webp)'
let failedGif = 'url(./failed.webp)'

let lvlText = ['Too low', 'Low guess', 'Correct Number', 'High guess', 'Too High'];

let celBox = $('.game-screen-container')

let guessHead = $('.guessNo-head')
let guessNo = $('.guessNo')

let scorelvl = $('.score-level')
let scoreText = $('.level-text')

let scr = $('.score')
let hiscr = $('.hiscore')

let bX = $('.game-screen')
let bU = $('.game-upper')
let bL = $('.game-lower')

let greenG = 'green'
let greenX = 'rgb(24, 121, 35)'
let greenU = 'rgb(12, 183, 55)'
let greenL = 'rgb(60, 216, 101)'

let blueG = 'rgb(1, 26, 102)'
let blueX = 'rgb(0, 127, 196)'
let blueU = 'rgb(44, 167, 238)'
let blueL = 'rgb(79, 180, 211)'

let redG = 'rgb(133, 0, 0)'
let redX = 'rgb(92, 14, 1)'
let redU = 'rgb(238, 86, 44)'
let redL = 'rgb(211, 151, 79)'

let inputBox = $('.check-input')
let restartBtn = $('.restart-btn')
let checkBtn = $('.check-btn')


let rst = true;
let match = false;

let fail = false;
let celeb = false;


function reset()
{
    rst = true;
    match = false;
    fail = false;
    celeb = false;

    guessHead.text('Guess the number');    
    guessNo.text('?');  
    
    guessNo.css('background',blueG);
    bX.css('background',blueX);
    bU.css('background',blueU);
    bL.css('background',blueL);

    celBox.css('background', '');
    scorelvl.css('content','');
    scoreText.text('Guess it...');

    scr.text('0');
    inputBox.val('');

    checkBtn.attr('disabled',false);

    updateTarget();
    updateRandom(target);

    randomNum = Math.floor((Math.random() * 20) + 1);
    score = 20;
}

function failed()
{
    guessHead.text('Oops !! You failed to guess...');    
    
    guessNo.css('background',redG);
    bX.css('background',redX);
    bU.css('background',redU);
    bL.css('background',redL);
    
    celBox.css('background', failedGif);
    scoreText.text('Try again...');
    // console.log(scoreText.text());

    updateScoreBoard(randomNum);

}

function celebrate()
{
    guessHead.text('Woww !! You guessed it..');  
    
    guessNo.css('background',greenG);
    bX.css('background',greenX);
    bU.css('background',greenU);
    bL.css('background',greenL);
    
    celBox.css('background', partyGif);

    updateScoreBoard(randomNum);
}


function accuracy(n,k)
{
    let ans = 0;

    if(n == k)
    {
        ans = 2;
    }

    if(k/2 <= n && n < k)
    {
        ans = 1;
    }

    if(k < n && n <= 3*k/2)
    {
        ans = 3;
    }

    if(3*k/2 < n )
    {
        ans = 4;
    }

    return ans;
}

function updateRandom(value)
{
    randomNum = Math.floor((Math.random()*value) + 1);
    // console.log("value ",value);
}

function updateTarget()
{
    target = range.val();
    outRange.text(target);
    // console.log("target ",target);
}

function updateScoreText(text)
{    
    scr.text(score);
    scoreText.text(text);
}

function updateScoreBoard(text)
{
    guessNo.text(text);
}

function updateArrow(arrow)
{    
    scorelvl.css('content',arrow);    
}

function updateAll(n,k)
{
    let a = accuracy(n,k);
    let arrow = (a==2) ? tick : (a<2) ? dnArrow : upArrow;

    if(a == 2){
        match = true;

        if(score>hiscore)
        {
            hiscore = score;
            hiscr.text(hiscore);
        }

        celeb = true;
    }
    else
    {
        score--;

        if(score < 0)
        {
            fail = true;
            score = 0;
        }
    }

    updateArrow(arrow);
    updateScoreText(lvlText[a], n);

    if(celeb){
        celeb = false;
        celebrate();
        return;
    }

    if(fail)
    {
        fail = false;
        failed();
        return;
    }
}


function gameplay()
{
    
    checkBtn.click(()=>{
        
        if(rst)
        {
            let num = inputBox.val();
            updateAll(num, randomNum);
    
            if(match || fail)
            {
                rst = false;
                checkBtn.attr('disabled',true);
                return;
            }
        }
    })

    if(match || fail)
    {
        return;
    }

    restartBtn.click(()=>{reset()});

    range.on('change',()=>{updateTarget()});
}

$(document).ready(function(){

    gameplay();   

})