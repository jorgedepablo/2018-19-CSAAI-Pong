function field (w, h){
    this.ctx = null;
    this.width = w;
    this.height = h;
    this.points1 = 0;
    this.points2 = 0;

    this.init = function(ctx) {
        this.ctx = ctx;
        this.reset();
    };

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';
        this.ctx.setLineDash([5, 5]);
        this.ctx.moveTo(this.width/2,0);
        this.ctx.lineTo(this.width/2, this.height)
        this.ctx.stroke();
        this.ctx.font = '100px Pixeldub';
        this.ctx.fillStyle = 'grey';
        this.ctx.fillText(this.points1, 195, 70);
        this.ctx.fillText(this.points2, 340, 70);
    };

    this.reset = function(){
        this.points1 = 0;
        this.points2 = 0;
    };
}

function pala(x, y, h){
    this.ctx = null;
    this.x_ini = x;
    this.y_ini = y;
    this.fh = h;
    this.width = 10;
    this.height = 40;
    this.vy = 0;
    this.speed = 6;

    this.init = function(ctx) {
        this.ctx = ctx;
        this.reset();
    };

    this.draw = function() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.update = function() {
        this.y += this.vy*this.speed;
        if (this.y > this.fh - this.height){
            this.y = this.fh - this.height;
        } else if (this.y < 0) {
            this.y = 0;
        }
    }

    this.reset = function() {
        this.y = this.y_ini;
        this.x = this.x_ini;
    };
}

function ball(h){
    this.ctx = null;
    this.fh = h;
    this.x_ini = 50;
    this.y_ini = 50;
    this.width = 5;
    this.height = 5;
    this.x = 0;
    this.y = 0;
    this.vx = 4;
    this.vy = 1;
    this.speed = 1;


    this.init = function(ctx) {
        this.ctx = ctx;
        this.reset();
    };

    this.draw = function () {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    };

    this.update = function () {
        this.x += this.vx*this.speed;
        this.y += this.vy*this.speed;
        if (this.y > this.fh - this.height || this.y < this.height){
            this.vy = -this.vy;
        }
    };

    this.reset = function() {
        this.x = this.x_ini;
        this.y = this.y_ini;
    };
}

function mover_palas(pala1, pala2){
    window.onkeydown = (p) => {
        p.preventDefault();
        switch (p.key) {
            case 'w':
                pala1.vy = -1;
                break;
            case 's':
                pala1.vy = 1;
                break;
            case 'ArrowUp':
                pala2.vy = -1;
                break;
            case 'ArrowDown':
                pala2.vy = 1;
                break;
            default:
                break;
        }
    };
    window.onkeyup = (p) => {
        p.preventDefault();
        switch (p.key) {
            case 'w':
                pala1.vy = 0;
                break;
            case 's':
                pala1.vy = 0;
                break;
            case 'ArrowUp':
                pala2.vy = 0;
                break;
            case 'ArrowDown':
                pala2.vy = 0;
                break;
            default:
                break;
        }
    };
}

function rebote(pala1, pala2, bola){
    if (bola.x <= (pala1.x + pala1.width) && bola.x >= pala1.x){
        if (bola.y >= pala1.y && bola.y <= (pala1.y + pala1.height)){
            bola.vx = -bola.vx;
        };
    };

    if ((bola.x + bola.width) >= pala2.x && (bola.x + bola.width) <= (pala2.x + pala2.width)){
        if ((bola.y + bola.height) <= (pala2.y + pala2.height) && (bola.y + bola.height) >= pala2.y){
            bola.vx = -bola.vx
        };
    };
}

function saque(win, bola, pala1, pala2){
    if (win == 1){
        bola.x_ini = 50;
    }else if (win == 2) {
        bola.x_ini = 550;
    };
    bola.vx = 0;
    bola.vy = 0;
    bola.reset();
    pala1.reset();
    pala2.reset();
    pala1.draw();
    pala2.draw();
    bola.draw();
}

function check_difficulty(b, p1, p2){
    var diffc = document.querySelector('input[name="difficulty"]:checked').value;
    if (diffc == 'Normal'){
      b.speed = 1;
      p1.speed = 6;
      p2.speed = 6;
    } else if (diffc == 'Hard') {
      b.speed = 1.5;
      p1.speed = 8;
      p2.speed = 8;
    } else if (diffc == 'Expert') {
      b.speed = 2;
      p1.speed = 10;
      p2.speed = 10;
    }else if (diffc == 'God') {
      b.speed = 3;
      p1.speed = 12;
      p2.speed = 12;
    };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function main(){
    var timer = null;
    var p_x1 = 50;
    var p_y1 = 100;
    var p_x2 = 550;
    var p_y2 = 300;

    var canvas = document.getElementById('display')
    canvas.width = 600;
    canvas.height = 400;

    var ctx = canvas.getContext("2d");

    var campo = new field(canvas.width, canvas.height);
    var bola = new ball(canvas.height);
    var pala1 = new pala(p_x1, p_y1, canvas.height);
    var pala2 = new pala(p_x2, p_y2, canvas.height);

    bola.init(ctx);
    pala1.init(ctx);
    pala2.init(ctx);
    campo.init(ctx);
    bola.draw();
    pala1.draw();
    pala2.draw();
    campo.draw();


    var sacar = document.getElementById('sacar');

    sacar.onclick = () => {
        var puntos = document.querySelector('input[name="targetPoints"]:checked').value;

        if (bola.x_ini == p_x1){
            bola.vx = getRandomInt(3,6);
            bola.vy =  getRandomInt(1,4);
        }else if (bola.x_ini == p_x2) {
            bola.vx =  -1 * getRandomInt(3,6);
            bola.vy =  getRandomInt(1,4);
        }

        if (!timer) {
            timer = setInterval(()=>{
                check_difficulty(bola, pala1, pala2);
                bola.update();
                pala1.update();
                pala2.update();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                bola.draw();
                pala1.draw();
                pala2.draw();
                campo.draw();

                mover_palas(pala1, pala2);
                rebote(pala1, pala2, bola);

                if (bola.x > canvas.width - bola.width){
                    campo.points1 += 1;
                    saque(1, bola, pala1, pala2);
                }else if (bola.x < bola.width) {
                    campo.points2 += 1;
                    saque(2, bola, pala1, pala2);
                }

                if (campo.points1 == puntos || campo.points2 == puntos) {
                    clearInterval(timer)
                    timer = null;
                    bola.x_ini = 50;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    bola.reset();
                    pala1.reset();
                    pala2.reset();
                    campo.reset();
                    pala1.draw();
                    pala2.draw();
                    bola.draw();
                    campo.draw();
                }
            },20);
        }
    }
}
