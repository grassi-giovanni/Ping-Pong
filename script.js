var Giocatore1;
var Giocatore2;

var ball;



//Bordi
var myGameSide;
var myGameSide2;
var myGameSide3;
var myGameSide4;

function startGame() {
    Giocatore1 = new component(10, 200, "green", 150, 300);
    Giocatore2 = new component(10, 200, "red", 1200, 300);

    ball = new component(25,25,"black", 700,300);
    ball.speedX =10;
    ball.speedY = 3;

    
    myGameSide = new component(10, 1000, "blue", 0, 10);
    myGameSide2 = new component(10, 1000, "blue", 1500, 10);
    myGameSide3 = new component(1510, 10, "blue", 0, 0);
    myGameSide4 = new component(1500, 10, "blue", 0, 660);

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1510;
        this.canvas.height = 670;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    drawGameObject: function(gameObject) {
        this.context.drawImage(
          gameObject.image,
          gameObject.x,
          gameObject.y,
          gameObject.width,
          gameObject.height
        );
    
    }


    
      
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }   
    this.crashWith = function(otherobj) {
        var myleft = this.x + this.speedX;
        var myright = this.x + (this.width) + this.speedX;
        var mytop = this.y + this.speedY;
        var mybottom = this.y + (this.height) + this.speedY;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      } 
}
hsp = 9;
//Punteggio
let punteggioG1 = 0;
let punteggioG2 = 0;
function updateGameArea() {


 

    myGameArea.clear();

   
   
    

    Giocatore1.newPos();    
    Giocatore1.update();

   
    Giocatore1.speedX = 0;
    Giocatore1.speedY = 0;    
    Giocatore1.speedX = hsp * ((myGameArea.key == 68) - (myGameArea.key == 65));
    Giocatore1.speedY = hsp * ((myGameArea.key == 83) - (myGameArea.key == 87));
    

    Giocatore2.newPos();    
    Giocatore2.update();

    Giocatore2.speedX = 0;
    Giocatore2.speedY = 0;    
    Giocatore2.speedX = hsp * ((myGameArea.key == 39) - (myGameArea.key == 37));
    Giocatore2.speedY = hsp * ((myGameArea.key == 40) - (myGameArea.key == 38));


    ball.newPos();    
    ball.update();

    myGameSide.update();
    myGameSide2.update();
    myGameSide3.update();
    myGameSide4.update();

 

    //LA PALLA RIMBALZA SUI BORDI
    if (ball.crashWith(myGameSide)){

        ball.speedX = -ball.speedX;
        punteggioG2++;
        console.log("punteggio g2 " + punteggioG2);

    }
    if (ball.crashWith(myGameSide2)){

        ball.speedX = -ball.speedX
        punteggioG1++;
        console.log("punteggio g1 " + punteggioG1);

    }
    if (ball.crashWith(myGameSide3) || ball.crashWith(myGameSide4)){

        ball.speedY = -ball.speedY;

    }

    //LA PALLA RIMBALZA SUI GIOCATORI
    if (ball.crashWith(Giocatore2)){
        ball.speedX = -ball.speedX;
    }

    if (ball.crashWith(Giocatore1)){
        ball.speedX = -ball.speedX;
    }
    

    document.getElementById("puntiG1").innerHTML = punteggioG1;
    document.getElementById("puntiG2").innerHTML = punteggioG2;




//BORDI
if (Giocatore1.crashWith(myGameSide)){ Giocatore1.x += 9; }
if (Giocatore1.crashWith(myGameSide2)){ Giocatore1.x -= 9; }
if (Giocatore1.crashWith(myGameSide3)){ Giocatore1.y += 9; }
if (Giocatore1.crashWith(myGameSide4)){ Giocatore1.y -= 9; }

if (Giocatore2.crashWith(myGameSide)){ Giocatore2.x += 9; }
if (Giocatore2.crashWith(myGameSide2)){ Giocatore2.x -= 9; }
if (Giocatore2.crashWith(myGameSide3)){ Giocatore2.y += 9; }
if (Giocatore2.crashWith(myGameSide4)){ Giocatore2.y -= 9; }
  
  

}















