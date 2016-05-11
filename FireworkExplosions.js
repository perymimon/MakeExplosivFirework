var FireworkExplosions = (function () {

    var particlesPool = ParticlePool(1000);
    return {
        circle: function (lastParticle) {
            let i = 100;
            let angle = (Math.PI * 2) / i;

            while (i--){
                let randomVelocity = 4 +  Math.random() * 4;
                let particleAngle = i * angle;
                makePractle( particleAngle, randomVelocity, lastParticle);
            }

        },
        flower: function (lastParticle) {
            let i = 100;
            let angle = (Math.PI * 2) / i;

            while (i--){
                let randomVelocity = 4 ;
                let particleAngle = i * angle;
                makePractle( particleAngle, randomVelocity, lastParticle);
            }

            setTimeout(function () {
                i = 100;
                while (i--){
                    var p = particlesPool.getOne();
                    particles.push(p);

                    let randomVelocity = 2 ;
                    let particleAngle = i * angle;
                    makePractle( particleAngle, randomVelocity, lastParticle);
                }
            },150);
        },
        goblet: function (lastParticle) {
            let i = 100;
            let angle =  ((Math.PI/2) / i);

            while (i--){
                let randomVelocity = 2 +  Math.random() * 3;
                let particleAngle =i * angle - 3 * Math.PI/4 ;
                console.log(particleAngle);
                makePractle( particleAngle, randomVelocity, lastParticle);
            }

        },
        star: function ( firework ) {

            // set up how many points the firework
            // should have as well as the velocity
            // of the exploded particles etc
            var points          = 6 + ~~(Math.random() * 15);
            var jump            = 3 + ~~(Math.random() * 7);
            var subdivisions    = 10;
            var radius          = 80;
            var randomVelocity  = -(Math.random() * 3 - 6);

            var start           = 0;
            var end             = 0;
            var circle          = Math.PI * 2;
            var adjustment      = Math.random() * circle;

            do {

                // work out the start, end
                // and change values
                start = end;
                end = (end + jump) % points;

                var sAngle = (start / points) * circle - adjustment;
                var eAngle = ((start + jump) / points) * circle - adjustment;

                var startPos = {
                    x: firework.pos.x + Math.cos(sAngle) * radius,
                    y: firework.pos.y + Math.sin(sAngle) * radius
                };

                var endPos = {
                    x: firework.pos.x + Math.cos(eAngle) * radius,
                    y: firework.pos.y + Math.sin(eAngle) * radius
                };

                var diffPos = {
                    x: endPos.x - startPos.x,
                    y: endPos.y - startPos.y,
                    a: eAngle - sAngle
                };

                // now linearly interpolate across
                // the subdivisions to get to a final
                // set of particles
                for(var s = 0; s < subdivisions; s++) {

                    var sub = s / subdivisions;
                    var subAngle = sAngle + (sub * diffPos.a);
                    var p = particlesPool.getOne();
                    particles.push(p);
                    p.vel.x = Math.cos(subAngle) * randomVelocity ;
                    p.vel.y = Math.sin(subAngle) * randomVelocity ;
                    p.pos.x = startPos.x + (sub * diffPos.x);
                    p.pos.y = startPos.y + (sub * diffPos.y);
                    p.color = Math.random() > 0.5? 70: 60;
                    p.usePhysics = true;

                }

                // loop until we're back at the start
            } while(end !== 0);

}

};

    function makePractle( particleAngle, randomVelocity, point ){
        var p = particlesPool.getOne();
        particles.push(p);
        p.vel.x = Math.cos( particleAngle ) * randomVelocity;
        p.vel.y = Math.sin( particleAngle ) * randomVelocity;
        p.pos.x = point.pos.x;
        p.pos.y = point.pos.y;
        p.color = point.color;
        p.usePhysics = true;
        return p ;
    }
})();