import * as Phaser from 'phaser';
import { Scene } from "phaser"; 

import VisorImg from "/assets/sprites/visor.png";

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    preload(){
        this.load.spritesheet('VisorImg', VisorImg, { frameWidth: 480, frameHeight: 854 });
    }
    create(){
        this.add.sprite(480, 854, 'VisorImg');
        this.anims.create({
            key: 'VisorImg',
            frames: this.anims.generateFrameNumbers('VisorImg', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1,
            yoyo: true,
});
}
}