function field (w, h){
    this.ctx = null;
    this.width = w;
    this.height = h;

    this.init = function(ctx) {
        this.ctx = ctx;
    };

    this.draw = function(points1, points2){
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.setLineDash([5, 5]);
        this.ctx.moveTo(this.width/2,0);
        this.ctx.lineTo(this.width/2, this.height)
        this.ctx.stroke();

        this.ctx.font = "80px Arial";
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(points1, 220, 70);
        this.ctx.fillText(points2, 340, 70);
    };
}

function pala(x, y){
    this.ctx = null;
    this.width = 10;
    this.height = 40;
    this.x_ini = x;
    this.y_ini = y;

    this.init = function(ctx) {
        this.ctx = ctx;
        this.reset();
    };

    this.draw = function() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.p_x, this.p_y, this.width, this.height);
    };

    this.update = function(p_x, p_y) {
        this.p_x = p_x;
        this.p_y = p_y;
    }

    this.reset = function() {
        this.p_x = this.x_ini;
        this.p_y = this.y_ini;
    };
}

function ball(){
    this.ctx = null;
    this.x_ini = 50;
    this.y_ini = 50;
    this.width = 5;
    this.height = 5;
    this.x = 0;
    this.y = 0;
    this.vx = 4;
    this.vy = 1;


    this.init = function(ctx) {
        this.ctx = ctx;
        this.reset();
    };

    this.draw = function () {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    };

    this.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y > 400 - 5){
            this.y = 400 - 5;
            this.vy = this.vy * -1;
        }
        if (this.y < 5){
            this.y = 5;
            this.vy = this.vy * -1;
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
    var points1 = 0;
    var points2 = 0;
    var p_x1 = 50;
    var p_y1 = 100;
    var p_x2 = 550;
    var p_y2 = 300;

    var canvas = document.getElementById('display')
    canvas.width = 600;
    canvas.height = 400;

    var ctx = canvas.getContext("2d");

    var campo = new field(canvas.width, canvas.height);
    var bola = new ball();
    var player1 = new pala(p_x1, p_y1);
    var player2 = new pala(p_x2, p_y2);

    bola.init(ctx)
    player1.init(ctx)
    player2.init(ctx)
    campo.init(ctx)
    bola.draw()
    player1.draw()
    player2.draw()
    campo.draw(points1, points2)

    sacar.onclick = () => {
        if (!timer) {
            timer = setInterval(()=>{
                bola.update();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                bola.draw();
                player1.draw();
                player2.draw();
                campo.draw(points1, points2);

                if (bola.x > canvas.width) {
                    clearInterval(timer)
                    timer = null;
                    bola.reset();
                    bola.draw();
                }
            },20);
        }
    }
}
