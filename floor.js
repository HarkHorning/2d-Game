export class Floor{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 30;
        this.image = document.getElementById('groundChunkImage');
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed;
        }
        if (left){
            this.x += scrollSpeed;
        }
    }
    draw(context){
        context.fillStyle = 'brown';
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Wall{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 360;
        this.height = 600;
        this.image = document.getElementById('wallImage');
    }
    update(right, left, scrollSpeed){
        if (right){
            this.x -= scrollSpeed;
        }
        if (left){
            this.x += scrollSpeed;
        }
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}