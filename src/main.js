import Phaser from 'phaser';
import './style.css';
class EscenaProva extends Phaser.Scene {
constructor() { super({ key: 'EscenaProva' }); }
create() {
this.add.text(400, 300, '🚀PHASER ESTÀ VIU!', {
fontSize: '40px', color: '#00ff00', fontStyle: 'bold'
}).setOrigin(0.5); // Centrem el text
}}
const config = {
type: Phaser.AUTO,
width: 800, height: 600,
parent: 'game-container', // Enllaç amb l'HTML
backgroundColor: '#1a1a1a',
scene: EscenaProva // Escena inicial
};
new Phaser.Game(config); // Engeguem la màquina