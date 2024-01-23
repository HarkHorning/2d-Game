export class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 1300;
        this.height = 600;
        this.image = document.getElementById('mountainImage');
    }
    update(){
    }
    draw(context){
        context.fillStyle = 'brown';
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class BackgroundForest{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 1300;
        this.height = 600;
        this.image = document.getElementById('mountainForestImage');
        this.scrollChange = 2;
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.x += scrollSpeed - this.scrollChange;
        }
    }
    draw(context){
        context.fillStyle = 'brown';
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class BackgroundShrub{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 1000;
        this.height = 700;
        this.image = document.getElementById('grassImage');
        this.image2 = document.getElementById('treeImage');
        this.scrollChange = 1.75;
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.x += scrollSpeed - this.scrollChange;
        }
    }
    draw(context){
        context.fillStyle = 'brown';
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        context.drawImage(this.image2, this.x, 0, this.width, this.height);

    }
}

export class BackgroundVines{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 1300;
        this.height = 600;
        this.image = document.getElementById('vinesImage');
        this.scrollChange = 1.5;
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.x += scrollSpeed - this.scrollChange;
        }
    }
    draw(context){
        context.fillStyle = 'brown';
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class BackgroundFireflies{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 1300;
        this.height = 600;
        this.image = document.getElementById('fliesImage');
        this.image2 = document.getElementById('shrubImage');
        this.scrollChange = 1.5;
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.x += scrollSpeed - this.scrollChange;
        }
    }
    draw(context){
        context.fillStyle = 'brown';
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        context.drawImage(this.image2, this.x, this.y + 250, this.width, this.height);
        context.drawImage(this.image2, this.x + this.width, this.y + 250, this.width, this.height);

    }
}

export class BackgroundStatue{
    constructor(){
        this.x = 700;
        this.y = 215;
        this.width = 1500;
        this.height = 700;
        this.image = document.getElementById('statueImage');

        this.scrollChange = 1;
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.x += scrollSpeed - this.scrollChange;
        }
    }
    draw(context){
        context.fillStyle = 'brown';
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class BackgroundCrumbledWall{
    constructor(){
        this.x = 500;
        this.y = 0;
        this.width = 1300;
        this.height = 600;
        this.image = document.getElementById('crumbledWalls');
        this.scrollChange = 0.5;
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.x += scrollSpeed - this.scrollChange;
        }
    }
    draw(context){
        context.fillStyle = 'brown';
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + 200 + this.width, this.y, this.width, this.height);
    }
}

export class BackgroundFloor{
    constructor(){
        this.x = 0;
        this.xR = 1920;
        this.xL = -1920;
        this.y = 0;
        this.width = 1920;
        this.height = 600;
        this.image = document.getElementById('floorImage');
        this.scrollChange = 0;
        this.markForDeletion = false;
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.x += scrollSpeed - this.scrollChange;
        }

        if (right){
            this.xR -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.xR += scrollSpeed - this.scrollChange;
        }

        if (right){
            this.xL -= scrollSpeed - this.scrollChange;
        }
        if (left){
            this.xL += scrollSpeed - this.scrollChange;
        }

        //middle
        if (this.x + this.width <= 0 || this.x >= this.width) {
            this.x = 0
            console.log("middle");
        } 

        //right
        if (this.xR + this.width <= this.width || this.xR >= this.width + this.width) {
            this.xR = this.width;
            console.log("right");
        }

        //left
        if (this.xL >= 0 || this.xL <= - this.width - this.width) {
            this.xL = -1920;
            console.log("left");
        }
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

        context.drawImage(this.image, this.xR, this.y, this.width, this.height);

        context.drawImage(this.image, this.xL, this.y, this.width, this.height);
    }
}