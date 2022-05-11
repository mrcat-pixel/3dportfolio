class Circle {
    makeSprite(scene, color) {
        const texture = new THREE.TextureLoader().load('texture/cloud.png');
        const spriteMat = new THREE.SpriteMaterial( {
            map: texture,
            color: color
        } );
        this.sprite = new THREE.Sprite( spriteMat );
        scene.add( this.sprite );
    }

    constructor(scene, z, scale, color, angle, speed, radius) {
        this.angle = angle;
        this.speed = speed;
        this.radius = radius;

        this.makeSprite(scene, color);

        this.sprite.position.set(0, 0, z);
        this.sprite.scale.set(scale, scale, scale);
    }
    animate() {
        this.angle += this.speed;
        this.sprite.position.x = Math.cos(this.angle) * this.radius;
        this.sprite.position.y = Math.sin(this.angle) * this.radius;
    }
}