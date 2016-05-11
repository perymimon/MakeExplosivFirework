var particles = []
    ,particlePool = []
    ,mainCanvas = null
    ,mainCtx = null
    ,viewportWidth = 0
    ,viewportHeight = 0
    ,particleSize = 11
;


function drawFireworks(){
    var i = particles.length;
    while (i--){
        var particle = particles[i];

        /*is it die make big explode*/
        if(particle.update()){
            particles.splice( i ,1);
            if( !particle.usePhysics ){
                var r = Math.random();
                if( r> 0.9 ){
                    FireworkExplosions.star(particle);
                }else if(r>0.8){
                    FireworkExplosions.goblet(particle);
                }else if(r > 0.5) {
                    // FireworkExplosions.flower(particle);
                }else {
                    FireworkExplosions.circle(particle);
                }

            }
        }else{
            particle.render(mainCtx);
        }
    }
}

function clearContext(){
    mainCtx.fillStyle = "rgba(0,0,0,0.06)";
    mainCtx.fillRect(0,0,viewportWidth, viewportHeight);
}


/****************************************/

function ParticlePool( amount ) {
    var pool = [];
    while( amount-- ){
        pool.push(new Particle())
    }

    return {
        getOne : function (particle) {
           let p = pool.pop();
           pool.unshift(p);
           p.init(particle);
           return p;
        }
    };
}

window.addEventListener('load',function initialize() {

    mainCanvas = document.createElement('canvas');
    onWindowResize();
    mainCtx = mainCanvas.getContext('2d');

    // add the canvas in
    document.body.appendChild(mainCanvas);

    particlePool = ParticlePool( 10);


    window.addEventListener('click',function () {
        // (i) = ++i % particles.length;
        particles.push( particlePool.getOne() );
    });

    var i = 10;
    while(i--){
        particles.push( particlePool.getOne() );
    }

    function onWindowResize() {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        mainCanvas.width = viewportWidth;
        mainCanvas.height = viewportHeight;
    }

    window.addEventListener('resize', onWindowResize );

    (function update() {
        clearContext();
        requestAnimationFrame(update);
        drawFireworks();

    })();

});

/*****************************************************************/
