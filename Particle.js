/*make it global*/
window.Particle = Particle;



function createFireworkPlate(gridSize) {

    var Library = {
        bigGlow: document.getElementById('big-glow'),
        smallGlow: document.getElementById('small-glow')
    };

    let size = gridSize * 10;


    let canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    let ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation ='source-over';

    let c = 100;
    let step = 360 / c;
    while(c-- ){
        let cursor = (c * gridSize);
        let gridX = cursor % size;
        let gridY = ~~( cursor / size ) * gridSize;

        ctx.fillStyle = `hsl(${ ~~(c * step) },100%,60%)`;
        ctx.fillRect(gridX, gridY, gridSize, gridSize);
        ctx.drawImage(Library.bigGlow, gridX, gridY);
    }

    return canvas;

}

function Particle () {

    this.GRAVITY  = 0.06;
    this.alpha    = 1;
    this.easing   = Math.random() * 0.02;
    this.fade     = Math.random() * 0.1;

    this.init();

}
// window.addEventListener('load',function () {
    Particle.prototype.particleImage = createFireworkPlate(11);
// });

Particle.prototype.init = function (particle) {
        /*clone other particle*/
        if (particle instanceof  Particle){
            Object.assign(this, JSON.parse(JSON.stringify(particle)));
            this.die = false;
            return this;
        }
        /*position*/
        this.pos ={
            x : viewportWidth * 0.5,
            y : viewportHeight + 10
        } ;

        /*target*/
        this.target = {
            y : 150 + Math.random() * 100
        };

        /*velocity*/
        this.vel = {
            x: Math.random() * 3 - 1.5,
            y: 10
        };

        this.color = ~~(Math.random() * 100);

        this.lastPos = {
            x : this.pos.x,
            y : this.pos.y
        };

        this.usePhysics = false ;
        this.die = false;
        this.alpha = 1;
};

Particle.prototype.update  = function () {
        if (this.die) return false;

        this.lastPos = {
            x: this.pos.x,
            y: this.pos.y
        };

        if( this.usePhysics){
            this.vel.y +=this.GRAVITY;
            this.pos.y += this.vel.y;
            this.alpha -=this.fade;
        }else{
            var distance = (this.target.y - this.pos.y);

            // ease the position
            this.pos.y += distance * (0.03 + this.easing);

            // cap to 1
            this.alpha = Math.min( distance * distance * 0.00005, 1);
        }

        this.pos.x += this.vel.x;
        this.die = (this.alpha < 0.005);
        return this.die;

};

Particle.prototype.render =  function( context, fireworkCanvas){
        
        let x = ~~this.pos.x,
            y = ~~this.pos.y,
            xVel = (x - this.lastPos.x) * -5,
            yVel = (y - this.lastPos.y) * -5
            ;

        context.save();
        context.globalCompositeOperation ='lighter';
        context.globalAlpha = Math.random() * this.alpha;

        context.fillStyle = "rgba(255,255,255,0.3)";

        context.beginPath();
        context.lineTo(x + 1.5, y);
        context.lineTo(x +  xVel, y + yVel);
        context.lineTo(x - 1.5, y);
        context.closePath();
        context.fill();

        let s = particleSize;
        let gx = (this.color % 10) * s  ;
        let gy = ~~(this.color / 10) * s ;

        context.drawImage(
            this.particleImage, gx, gy, s,s, // original image
            x - s/2, y - s/2, s, s
        );
        
        context.restore();

};

