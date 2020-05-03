var snakeDirection = 0;
var arrayLength = 30;
var FullSnake = [];
var scoreObject = new Object();
var contentArray;
var inter = ""
var scores = 0;
var firstTime = true
setTimeout(preStart, 50)

function preStart(){
    if(firstTime) {
        firstTime = false;
        resizePlayingfield()


        var id_counter = 0;
        contentArray.forEach(function (value, index, array) {
            for (let i = 0; i < contentArray.length; i++) {
                let tempVar = new Object()
                tempVar.id = ++id_counter;
                tempVar.snake = false;
                tempVar.color = 'black';
                contentArray[index][i] = tempVar;
                $('<div>', {
                    'id': id_counter,
                    'class': 'Content'
                }).appendTo('main')
            }
        })
    }
    var snakeObject = new Object();
        snakeObject.pos = contentArray[14][14].id;
        snakeObject.color = 'white';
    FullSnake.push(snakeObject)
    createScoreObject()

}
function resizePlayingfield(){
    $('main').css('width', Math.floor($('main').width() / 20) * 20 + 2)
    arrayLength = Math.floor($('main').width() / 20);
    contentArray = new Array(arrayLength);
    for(let i = 0; i < contentArray.length; i++){
        contentArray[i] = new Array(arrayLength)
    }
}
function newSnakeObject(){
    for(let x = 0; x < newSnakeObject2(0); x++){
        let snakeObject = new Object();
        snakeObject.pos = checkDir(1);
        snakeObject.color = newSnakeObject2(1);
        FullSnake.push(snakeObject);
    }
    createScoreObject()
}
function newSnakeObject2(IntString){
    let returnNumber;
    if(scoreObject.color == 'yellow'){
        if(IntString == 0){
            returnNumber = 5;
        }else{
            returnNumber = 'yellow'
        }
    }else{
        if(IntString == 0){
            returnNumber = 1;
        }else{
            returnNumber = 'gray'
        }
    }
    return returnNumber;
}
function createScoreObject(){
    scoreObject.pos = Math.floor(Math.random() * contentArray[arrayLength - 1][arrayLength - 1].id) + 1
    contentArray.forEach(function(value, index, array){
        for(let i = 0; i < contentArray.length; i++){
            if(contentArray[index][i].id == scoreObject.pos && contentArray[index][i].snake == true){
                createScoreObject()
            }else if(contentArray[index][i].id == scoreObject.pos){
                if(Math.floor(Math.random() * 25) == 9){
                    scoreObject.color = 'yellow'
                    scoreObject.score = 5
                }else{
                    scoreObject.color = 'red'
                    scoreObject.score = 1
                }
            }
        }
    })
}
function checkDir(num){
    switch(snakeDirection){
        case 0:
            if(num == 0){
                    FullSnake[0].pos -= arrayLength
            }else if(num == 1){

                return FullSnake[FullSnake.length - 1].pos + arrayLength;
            }
            break;
        case 1:
            if(num == 0){
                FullSnake[0].pos += 1
            }else if(num == 1){

                return FullSnake[FullSnake.length - 1].pos - 1;
            }
            break;
        case 2:
            if(num == 0){
                FullSnake[0].pos += arrayLength
            }else if(num == 1){

                return FullSnake[FullSnake.length - 1].pos - arrayLength;
            }
            break;
        case 3:
            if(num == 0){
                FullSnake[0].pos -= 1
            }else if(num == 1){

                return FullSnake[FullSnake.length - 1].pos + 1;
            }
            break;
    }
}
function gameTick(){
    for(let i = FullSnake.length; i > 1; i--){
        FullSnake[i - 1].pos = FullSnake[i - 2].pos
    }
   checkDir(0)
    contentArray.forEach(function(value, index, array){
        for(let i = 0; i< contentArray.length; i++) {
            let conArray = contentArray[index][i]
            if(FullSnake[0].pos == conArray.id){
                if(conArray.snake){
                    GameOver()
                }
            }
            if(FullSnake[0].pos > (arrayLength * arrayLength) || FullSnake[0].pos <= 0){
                GameOver()
                break;
            }
            conArray.snake = false;
            conArray.color = 'black';
            document.getElementById(conArray.id).style = 'background-color: ' + conArray.color + ';'

            //Snake Object
            for(let y = 0; y < FullSnake.length; y++){
                if(conArray.id == FullSnake[y].pos){
                    conArray.snake = true;
                    conArray.color = FullSnake[y].color;
                    document.getElementById(conArray.id).style = 'background-color: ' + conArray.color + ';'
                }
            }

            // Score Object
            if(conArray.id == scoreObject.pos){
                conArray.color = scoreObject.color;
                document.getElementById(conArray.id).style = 'background-color: ' + conArray.color + ';'
                if(conArray.snake) {
                    document.getElementById("nom").play()
                    scores += scoreObject.score
                    $('.score').html("Score: " + scores )
                    newSnakeObject()
                }
            }
        }
    })
}
$(document).on('keypress',function(e){
    console.log(e.which)
    if(e.which == 119){ //W key
        snakeDirection = 0;
    }else if(e.which == 100){//D key
        snakeDirection = 1;
    }else if(e.which == 115){//S key
        snakeDirection = 2;
    }else if(e.which == 97){//A key
        snakeDirection = 3;
    }
});
function GameOver(){
    clearInterval(inter)
    document.getElementById("static").pause()
    document.getElementById("gameOver").play();
    $('.end').css("display", "block")
}
function start(){
    snakeDirection = 0;
    FullSnake = [];
    scoreObject = new Object();
    contentArray;
    scores = 0;
    preStart()
    inter = setInterval('gameTick()', 100)
    document.getElementById("static").play()
    document.getElementById("static").volume = 0.1
    $('.start').css("display", "none")
    $('.end').css("display", "none")
}

