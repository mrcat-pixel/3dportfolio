class PaneCluster {
    constructor(scene) {
        for (let x = -3; x < 4; x++)
        for (let y = -2; y < 2; y++) {
            let offset = x % 2 === 0? 0 : 11;
            new Pane(scene, 'Lorem', [
                    'Lorem ipsum dolor sit amet, consectetur',
                    'adipiscing elit, sed do eiusmod tempor',
                    'incididunt ut labore et dolore magna '
            ],
                x * 17, y * 22 + offset, Math.random() * 4 - 2);
        }
    }
}