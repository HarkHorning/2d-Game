export class Health{
    constructor(playerHealth){
        this.x = 15;
        this.y = 10;
        this.width = playerHealth;
        this.height = 6;
    }
    update(playerHealth){
        this.width = playerHealth
    }
    draw(context){
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width * 1.5, this.height);
    }
}

export class HealthBar{
    constructor(){
        this.x = 15;
        this.y = 10;
        this.width = 150;
        this.height = 6;
    }
    update(){

    }
    draw(context){
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillRect(this.x, 24, 112, this.height);
    }
}

export class Mana{
    constructor(playermana){
        this.x = 15;
        this.y = 24;
        this.width = playermana;
        this.height = 6;
    }
    update(playermana){
        this.width = playermana;
    }
    draw(context){
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width * 1.5, this.height);
    }
}