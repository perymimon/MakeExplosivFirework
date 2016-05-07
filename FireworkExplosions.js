var FireworkExplosions = (function () {

    var particlesPool = ParticlePool(300);
    return {
        circle: function (lastParticle) {
            let i = 100;
            let angle = (Math.PI * 2) / i;

            while (i--){
                var p = particlesPool.getOne();
                particles.push(p);

                let randomVelocity = 4 +  Math.random() * 4;
                let particleAngle = i * angle;
                p.vel.x = Math.cos( particleAngle ) * randomVelocity;
                p.vel.y = Math.sin( particleAngle ) * randomVelocity;
                p.pos.x = lastParticle.pos.x;
                p.pos.y = lastParticle.pos.y;
                p.color = lastParticle.color;
                p.usePhysics = true;
            }

        }
    };

})();