const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 854,
    scale: {
        parent: game-container,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 1,
    },
    scene: {
        LogScene: LogScene,
        ScanScene: ScanScene,
    }
};
const game = new Phaser.Game(config);
