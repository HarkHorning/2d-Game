export class Bullet{
    constructor(direction, charX, charY) {
        this.x = charX + 5;
        this.y = charY + 5; 
        this.width = 48;
        this.height = 38;
        this.spriteHeight = 48;
        this.speed = 10;
        this.direction = direction;
        this.markForDeletion = false;
        this.verticalAcc = -0.4 + 1 * Math.random();
        this.image = document.getElementById('fireShot');
        this.spriteFrame = 0
        this.frameWidth = 64;
        this.gameFrame = 0
        this.staggerFrames = 5;
    }  
    update(canWidth, canHeight, right, left, scrollSpeed){
        this.y += this.verticalAcc;
        if (this.direction){
             this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
        if (this.x >= canWidth + 15 || this.x <= 0){
            this.markForDeletion = true;
        }

        this.gameFrame++;
        let position = Math.floor(this.gameFrame/this.staggerFrames) % 3;
        this.spriteFrame = this.frameWidth * position;



        if (right){
            this.x -= scrollSpeed;
        }
        if (left){
            this.x += scrollSpeed;
        }
    }
    draw(context){
        context.drawImage(this.image, this.spriteFrame, 0, this.width, this.spriteHeight, this.x, this.y, this.width, this.height);
    }   
}