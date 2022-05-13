const pane_resolution = 800;

class Pane {

    createCanvas() {
        this.canvas = document.createElement( "canvas" );
        this.canvas.width = this.width; this.canvas.height = this.height;

        this.ctx = this.canvas.getContext("2d");
    }

    drawBg(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawTitle() {
        this.ctx.fillStyle = "black";
        this.ctx.font = 0.096 * this.height + "px texfont";
        this.ctx.fillText(
            this.title,
            0.066 * this.width,
            0.75 * this.height
        );
    }

    drawDesc() {
        this.ctx.fillStyle = "black";
        this.ctx.font = 0.032 * this.height + "px texfont";
        for ( let i = 0; i < this.desc.length; i ++ )
            this.ctx.fillText(
                this.desc[ i ],
                0.066 * this.width,
                0.04 * this.height * i + 0.85 * this.height
            );
    }

    drawShadow() {
        this.ctx.fillStyle = "#131021";
        this.ctx.globalAlpha = 0.25;
        this.ctx.fillRect(0.05 * this.width, 0.04 * this.height, 0.9 * this.width, 0.6 * this.height);
    }

    createMesh(scene, x, y, z) {
        this.texture = new THREE.CanvasTexture(this.canvas);

        this.backpane = new THREE.Mesh(
            new THREE.PlaneGeometry(15, 20),
            new THREE.MeshBasicMaterial( { map: this.texture } )
        );
        this.backpane.position.set(x, y, z);
        scene.add(this.backpane);
    }

    createImageMesh(scene, x, y, z, imgId) {
        this.textureImg = new THREE.TextureLoader().load('../texture/cards/' + imgId + '.png');
        this.backpaneImg = new THREE.Mesh(
            new THREE.PlaneGeometry(14.4, 12),
            new THREE.MeshBasicMaterial( { map: this.textureImg } )
        );
        this.backpaneImg.position.set(x, y+3.5, z + 3);
        scene.add(this.backpaneImg);
    }

    animate() {
        this.backpane.position.z += (this.targetz - this.backpane.position.z) / 7;
    }

    constructor(scene, title, desc, x, y, z, color, imgId) {
        this.height = pane_resolution;
        this.width = 0.75 * this.height;

        this.title = title;
        this.desc = desc;

        this.createCanvas();

        this.drawBg(color);
        this.drawTitle();
        this.drawDesc();
        this.drawShadow();

        this.createMesh(scene, x, y, z);
        this.createImageMesh(scene, x, y, z, imgId);
        this.targetz = z;
    }
}