class Starfield {
    makeSprite(scene, x, y, z, scale) {
        const texture = new THREE.TextureLoader().load('texture/cloud.png');
        const spriteMat = new THREE.SpriteMaterial( {
            map: texture
        } );
        const sprite = new THREE.Sprite( spriteMat );
        scene.add( sprite );

        sprite.position.set(x, y, z);
        sprite.scale.set(scale, scale, scale);
    }

    constructor(scene) {
        for (let i = 0; i < 50; i++) {
            this.makeSprite(scene,
                (Math.random() * 1000 - 500),
                (Math.random() * 1000 - 500),
                (Math.random() * 200 - 500),
                (Math.random() * 2 + 1)
            );
        }
    }
}