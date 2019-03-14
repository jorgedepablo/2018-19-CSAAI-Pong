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

        this.ctx.font = '80px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.points1, 220, 70);
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
    }
}

function main(){
    var timer = null;
    var sacar = document.getElementById('sacar');
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

    bola.init(ctx)
    pala1.init(ctx)
    pala2.init(ctx)
    campo.init(ctx)
    bola.draw()
    pala1.draw()
    pala2.draw()
    campo.draw()

    sacar.onclick = () => {
        if (!timer) {
            timer = setInterval(()=>{
                bola.update();
                pala1.update();
                pala2.update();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                bola.draw();
                pala1.draw();
                pala2.draw();
                campo.draw();

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
                }
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
                }

                if (bola.x > canvas.width - bola.width){
                    bola.vx = -bola.vx;
                    campo.points1 += 1;
                }else if (bola.x < bola.width) {
                    bola.vx = -bola.vx;
                    campo.points2 += 1;
                }

                if (bola.x <= (pala1.x + pala1.width) - bola.width){

                    bola.vx = -bola.vx;
                }

                if (campo.points1 == 7 || campo.points2 == 7) {
                    clearInterval(timer)
                    timer = null;
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
