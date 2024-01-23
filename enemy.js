export class Slime{
    constructor(x){
        this.randomNum = Math.random();
        this.floor = 540 + this.randomNum * 10;
        this.x = x;
        this.y = this.floor;
        this.width = 60;
        this.height = 30;
        this.health = 0.5;
        this.markForDeletion = false;
        this.speed = 0;
        this.initialAcc = 0
        this.gameFrame = 0;
        this.staggerFrames = 18;
        this.blub = 0;
        this.image = document.getElementById('slime');
        this.staggerFrames = 6;
        this.gameFrame = 0;
        this.spriteFrame = 0;
        this.frameWidth = 60;
        this.frameHeight = 30;
    }

    update(bullets, right, left, scrollSpeed, player, gameStart){

        if (this.y < this.floor) {
            this.initialAcc += 1;
            this.speed = 3 + 3 * this.randomNum;
        } else {
            this.initialAcc = 0
            this.speed = 0;
        }

        
        this.gameFrame++;
        let position = Math.floor(this.gameFrame/this.staggerFrames) % 6;
        this.spriteFrame = this.frameWidth * position;

        if (position = 1 && this.y >= this.floor){
            if(this.blub === 50 + 25){
                this.blub = 0;
                this.initialAcc -= 12 + 4 * this.randomNum;
            } else {
                this.blub ++;
            }
        }

        this.y += this.initialAcc;


        //relative scrolling
        if (right){
            this.x -= scrollSpeed;
        }
        if (left){
            this.x += scrollSpeed;
        }

        if (gameStart && player.x <= this.x){
            this.x -= this.speed;
        }
        if (gameStart && player.x >= this.x){
            this.x += this.speed;
        }


        //bullet collisions
        bullets.forEach(bullet => {
            if (
                this.x > bullet.x + bullet.width ||
                this.x + this.width < bullet.x ||
                this.y > bullet.y + bullet.height / 1.8 ||
                this.y + this.height / 1.8 < bullet.y
                ){
            } else {
                if (this.health > 0.5){
                this.health -= 0.5;
                bullet.markForDeletion = true;
                console.log(this.health)
                } else {
                    this.markForDeletion = true;
                }
            }
        })
        
    }
    draw(context){
        context.fillStyle = 'white';
        context.drawImage(this.image, this.spriteFrame, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
    }
}


//dino/squid man?
export class EnemyTwo{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 102;
        this.height = 120;
        this.health = 1.5;
        this.markForDeletion = false;
        this.speed = 3.5 - Math.random();
        this.hasSeen = false;
        this.image = document.getElementById('squidMan');

        this.displayHeight = 73;
        this.spriteHeight = 120;
        this.spriteWidth = 120;
        this.frameHeight = 78.5;
        this.frameWidth = 128;
        this.spriteFrame = 0;
        this.gameFrame = 0;
        this.staggerFrames = 15;
        this.frameCount = 5;
        this.displayWidth = 65;
        this.animationFrame = 0;
        this.animationState = 0;
        this.facingLeft = true;
        this.stagger = false;
        this.facingMod = 3;
        this.knockBack = 0
        this.sped = 0;
    }
    update(bullets, right, left, scrollSpeed, player){

        this.animationFrame = this.animationState + this.facingMod;
        this.sped = this.speed - this.knockBack;

        if(this.facingLeft){
            this.facingMod = 3;
        } else {
            this.facingMod = 0;
        }

        //relative scrolling
        if (right){
            this.x -= scrollSpeed;
        }
        if (left){
            this.x += scrollSpeed;
        }

        if (player.x <= this.x - 40 && player.x >= this.x - 750 && player.y + player.height >= this.y - 60){
            this.x -= this.sped;
            this.hasSeen = true;
            this.animationState = 0
            this.facingLeft = true;
        }

        if (player.x >= this.x + 60 && player.x <= this.x + 750 && player.y + player.height >= this.y - 60){
            this.x += this.sped;
            this.hasSeen = true;
            this.animationState = 0
            this.facingLeft = false;
        }


        if (player.x > this.x - 40 && player.x < this.x + 60){
            this.animationState = 2;
        }

        if(this.knockBack > 0) this.knockBack -= 0.5;

        //bullet collisions
        bullets.forEach(bullet => {
            if (
                this.x > bullet.x + bullet.width ||
                this.x + this.width < bullet.x ||
                this.y > bullet.y + bullet.height ||
                this.y + this.height < bullet.y
                ){
            } else {
                if (this.health >= 0){
                    this.health -= 0.5;
                    this.knockBack = 10;
                    bullet.markForDeletion = true;
                    this.animationState = 5;
                } else {
                    this.markForDeletion = true;
                }
            }
        })

        this.gameFrame++;
        let position = Math.floor(this.gameFrame/this.staggerFrames) % 6;
        this.spriteFrame = this.frameWidth * position;


    }
    draw(context){
        context.fillStyle = 'white';
        context.drawImage(this.image, 35 + this.spriteFrame, 3.5 + (this.animationFrame * this.frameHeight), this.displayWidth, 73, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
}

export class Bat{
    constructor(x, y){
        this.randomNum = Math.random();
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 15;
        this.health = 0.5;
        this.speed = 3 + this.randomNum;
        this.markForDeletion = false;
        this.targetY = 100 + 50 * this.randomNum;
        this.flap = 2 * this.randomNum;
        this.image = document.getElementById('bat');
        this.staggerFrames = 6;
        this.gameFrame = 0;
        this.spriteFrame = 0;
        this.frameWidth = 61;
        this.frameHeight = 30;
    }

    update(bullets, right, left, scrollSpeed, player, gameStart){

        //relative scrolling
        if (right){
            this.x -= scrollSpeed;
        }
        if (left){
            this.x += scrollSpeed;
        }

        if (player.y <= 250){
            if (gameStart && player.x <= this.x){
                this.x -= this.speed;
            }
            if (gameStart && player.x >= this.x){
                this.x += this.speed;
            }
            this.targetY = player.y + 50 * this.randomNum;
        } else {
            this.targetY = 75 + 75 * this.randomNum;
        }

        this.y += this.flap;

        if (this.flap < 5){
            this.flap += 0.2;
        }

        if (this.y >= this.targetY && this.flap > -2){
            this.flap -= 1.2;
        }

        //bullet collisions
        bullets.forEach(bullet => {
            if (
                this.x > bullet.x + bullet.width ||
                this.x + this.width < bullet.x ||
                this.y > bullet.y + bullet.height / 1.8 ||
                this.y + this.height / 1.8 < bullet.y
                ){
            } else {
                if (this.health > 0.5){
                this.health -= 0.5;
                bullet.markForDeletion = true;
                console.log(this.health)
                } else {
                    this.markForDeletion = true;
                }
            }
        })

        this.gameFrame++;
        let position = Math.floor(this.gameFrame/this.staggerFrames) % 6;
        this.spriteFrame = this.frameWidth * position;
    }
    draw(context){
        context.fillStyle = 'white';
        context.drawImage(this.image, this.spriteFrame, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
    }
}