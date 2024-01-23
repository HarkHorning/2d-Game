export class Character {
    constructor() {
        this.x = 220;
        this.y = 375;
        this.width = 95;
        this.height = 121;
        this.displayHeight = 73;
        this.displayWidth = 75;
        this.speed = 4;
        this.acc = 0;
        this.onGround = true;
        this.health = 100;
        this.mana = 75;
        this.border = 375;
        this.scrollRight = false;
        this.scrollLeft = false;
        this.image = document.getElementById('characterImage');
        this.spriteHeight = 78.8;
        this.spriteWidth = 128;
        this.frameHeight = 76;
        this.frameWidth = 128;
        this.spriteFrame = 0;
        this.spriteAnimation = 1;
        this.gameFrame = 0;
        this.staggerFrames = 19;
        this.frameCount = 5;
        this.point = 0;
        this.gameFrame = false;
        this.blub = 0;
        this.blub = 0;
    }
    update(right, left, up, down, canWidth, canHeight, 
        terrain, enemies, bats, shoot, direction, slimes, walls){
        //onGround or other
        if (this.y < canHeight - this.height - 25){
            this.onGround = false;
        } else {
            this.onGround = true;
            this.y = canHeight - this.height - 25;
        }


        //ground collision
        terrain.forEach(floor => {
            if (
                this.x + 10 > floor.x + floor.width ||
                this.x + this.width/1.8 < floor.x ||
                this.y > floor.y + floor.height ||
                this.y + this.height < floor.y
            ){
            } else {
                if (this.y + this.height + 5 >= floor.y && this.y < floor.y + 5){
                    this.onGround = true;
                    this.y = floor.y - this.height;
                }
                if (this.y <= floor.y + floor.height + 15 && this.y > floor.y + 5){
                    this.acc = 0.75;
                }
                if (floor.x + floor.width >= this.x && floor.x < this.x && this.y + this.height > floor.y){
                    left = false;
                    up = false;
                }
            }
        })

        walls.forEach(wall => {
            if (
                this.x > wall.x + wall.width ||
                this.x + this.width/1.8 < wall.x ||
                this.y > wall.y + wall.height ||
                this.y + this.height < wall.y
            ){
            } 
            if (wall.x + wall.width >= this.x && wall.x < this.x) {
                left = false;
            }
            if (wall.x < this.x + this.width && this.x < wall.x) {
                right = false;
            }
        })

        //gravity
        this.y += this.acc;
        if (!this.onGround){
            this.acc += 1.01;
        } else {
            this.acc = 0;
        } 


                //sprite animation
        this.gameFrame++;
        let position = Math.floor(this.gameFrame/this.staggerFrames) % 6;
        this.spriteFrame = this.frameWidth * position;

        //enemy collision
        enemies.forEach(enemy =>{
            if (
                this.x + 20 > enemy.x + enemy.width ||
                this.x + this.width/1.8 < enemy.x ||
                this.y > enemy.y + enemy.height ||
                this.y + this.height < enemy.y
                ){
            } else {
                if (position === 1 && this.health > 0)
                {
                    this.health -= 3;
                }
                if (this.x + this.width / 2 <= enemy.x + enemy.width / 2){
                    this.x -= 1;
                }
                if (this.x + this.width / 2 > enemy.x + enemy.width / 2){
                    this.x += 1;
                }
            }
        })

        bats.forEach(bat =>{
            if (
                this.x + 20 > bat.x + bat.width ||
                this.x + this.width/1.8 < bat.x ||
                this.y > bat.y + bat.height ||
                this.y + this.height < bat.y
                ){
            } else {
                if (this.health > 0)
                {
                    this.health -= 0.05;
                }
                if (this.x + this.width / 2 <= bat.x + bat.width / 2){
                    this.x -= 3;
                }
                if (this.x + this.width / 2 > bat.x + bat.width / 2){
                    this.x += 3;
                }
            }
        })

        slimes.forEach(slime =>{
            if (
                this.x + 20 > slime.x + slime.width ||
                this.x + this.width/1.8 < slime.x ||
                this.y > slime.y + slime.height ||
                this.y + this.height < slime.y
                ){
                    this.speed = 5;
            } else {
                if (this.health > 0) {
                    this.health -= 0.25;
                    this.speed = 2;
                } else {
                    this.speed = 5;
                }
            }
        })

        if (!direction){
            this.point = 5;
        } else {
            this.point = 0;
        }
 
        if (!this.onGround){
            this.spriteAnimation = 2;
        } else {
            this.spriteAnimation = 1;
        }

        if (right || left && this.onGround){
            this.spriteAnimation = 0;
        }

        if (shoot){
            this.spriteAnimation = 3;
        }
        if (this.health <= 0){
            this.spriteAnimation = 4;
            this.point = 0
            this.gameOver = true;
        }

        //movement
        //right
        if (right && this.x + this.width <= canWidth - this.border){
            this.x += this.speed;
        }
        if (right && this.x + this.width >= canWidth - this.border - 1){
            this.scrollRight = true;
        } 
        if (!right){
            this.scrollRight = false;
        }
        //left
        if (left && this.x > 0 + this.border){
            this.x -= this.speed;
        }
        if (left && this.x <= 1 + this.border){
            this.scrollLeft = true;
        } 
        if (!left) {
            this.scrollLeft = false;
        }
        //up
        if (up && this.y > 0 && this.onGround){
            this.acc -= 19;
        }
        //down
        if (down && this.y < canHeight - this.height){
            this.y += this.speed;
        }

        //health and mana regeneration
        if (position = 1 && this.health < 100){
            if(this.blub === 200){
                this.blub = 0;
                this.health += 2.5;
            } else {
                this.blub ++;
            }
        }

        if (this.mana < 75){
            this.mana += 0.3;
        }
    }
    draw(context){
        context.fillStyle = 'white';
        context.drawImage(this.image, 35 + this.spriteFrame, (this.point + this.spriteAnimation) * this.spriteHeight  + 4, this.displayWidth, this.displayHeight, this.x, this.y, this.width, this.height);
    }
}