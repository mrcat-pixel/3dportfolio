const pane_resolution = 800;

class Pane {

    createCanvas() {
        this.canvas = document.createElement( "canvas" );
        this.canvas.width = this.width; this.canvas.height = this.height;

        this.ctx = this.canvas.getContext("2d");
    }

    drawBg() {
        this.ctx.fillStyle = "#B7ABCE";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawTitle() {
        this.ctx.fillStyle = "black";
        this.ctx.font = 0.128 * this.height + "px texfont";
        this.ctx.fillText(
            this.title,
            0.066 * this.width,
            0.75 * this.height
        );
    }

    drawDesc() {
        this.ctx.font = 0.032 * this.height + "px texfont";
        for ( let i = 0; i < this.desc.length; i ++ )
            this.ctx.fillText(
                this.desc[ i ],
                0.066 * this.width,
                0.04 * this.height * i + 0.85 * this.height
            );
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

    animate() {
        this.backpane.position.z += (this.targetz - this.backpane.position.z) / 7;
    }

    constructor(scene, title, desc, x, y, z) {
        this.height = pane_resolution;
        this.width = 0.75 * this.height;

        this.title = title; this.desc = desc;

        this.createCanvas();

        this.drawBg();
        this.drawTitle();
        this.drawDesc();

        this.createMesh(scene, x, y, z);
        this.targetz = z;
    }
}