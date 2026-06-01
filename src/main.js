import Phaser from 'phaser';
import './style.css';
import { GameScene as visorScene } from './scenes/ScanScene';

const config = {
type: Phaser.Scale.FIT,
width: 480, height: 854,
parent: 'game-container', // Enllaç amb l'HTML
backgroundColor: 'black',
scene: visorScene
};
new Phaser.Game(config); // Engeguem la màquina