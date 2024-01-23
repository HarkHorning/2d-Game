import { Character } from "./character.js";
import { Bullet } from "./bullet.js";
import { Floor, Wall } from "./floor.js";
import { Health, HealthBar, Mana } from "./healthbar.js";
import { Slime, EnemyTwo, Bat } from "./enemy.js";
import { Background, BackgroundCrumbledWall, BackgroundFireflies, BackgroundFloor, BackgroundForest, BackgroundStatue, BackgroundVines, BackgroundShrub } from "./background.js";

window.addEventListener('load', function() {

    const canvas = document.getElementById('canvasOne');
    const ctx = canvas.getContext('2d');
    const scrollSpeed = 4;

    canvas.width = 1200;
    canvas.height = 600;

    let gameStart = false;
    let moveLeft = false;
    let moveRight = false;
    let moveUp = false;
    let moveDown = false;

    let pointRight = true;
    let shoot = false;
    let canFire = true;

    let terrain = [];
    let walls = [];
    let bullets = [];
    let enemies = [];
    let slimes = [];
    let bats = [];
    let maxBullets = 5;
    let backgrounds = [];
    let stopAll = false;

    //keyboard inputs
    document.addEventListener('keydown', e => {
        if ((e.key === 'ArrowLeft' && gameStart)){
            moveLeft = true;
            pointRight = false;
        }
        if ((e.key === 'ArrowRight' && gameStart)){
            moveRight = true;
            pointRight = true;
        }
        if ((e.key === 'ArrowUp' && gameStart)){
            moveUp = true;
        }
        if ((e.key === 'ArrowDown' && gameStart)){
            moveDown = true;
        }
        if ((e.key === 'x' && bullets.length < maxBullets && canFire && gameStart)){
            if (player.mana > 25){
                shoot = true;
                bullets.push(new Bullet(pointRight, player.x, player.y));
                // canFire = false;
                // fireInterval;
                player.mana -= 25;
            } else {shoot = false}
        }
        if ((e.key === 'Enter')){
            gameStart = true;
            console.log("start");
            if (stopAll) location.reload();
        }
    });
    window.addEventListener('keyup', e => {
        if ((e.key === 'ArrowLeft')){
            moveLeft = false;
        }
        if ((e.key === 'ArrowRight')){
            moveRight = false;
        }
        if ((e.key === 'ArrowUp')){
            moveUp = false;
        }
        if ((e.key === 'ArrowDown')){
            moveDown = false;
        }
        if ((e.key === 'x')){
            shoot = false;
        }
    });

    // terrain
    terrain.push(new Floor(500, 380));
    terrain.push(new Floor(560, 380));
    terrain.push(new Floor(725, 235));
    terrain.push(new Floor(950, 280));
    terrain.push(new Floor(1140, 180));
    terrain.push(new Floor(1200, 180));
    terrain.push(new Floor(1260, 180));
    terrain.push(new Floor(1320, 180));
    terrain.push(new Floor(1470, 180));
    terrain.push(new Floor(1680, 190));
    terrain.push(new Floor(1740, 190));
    terrain.push(new Floor(1920, 180));
    terrain.push(new Floor(2100, 140));
    terrain.push(new Floor(2160, 180));

    walls.push(new Wall(3000, 0));
    walls.push(new Wall(-290, 0));

    backgrounds.push(new Background());
    backgrounds.push(new BackgroundForest());
    backgrounds.push(new BackgroundShrub());
    backgrounds.push(new BackgroundVines());
    backgrounds.push(new BackgroundFireflies());
    backgrounds.push(new BackgroundStatue());
    backgrounds.push(new BackgroundCrumbledWall());
    backgrounds.push(new BackgroundFloor());

    // enemies
    slimes.push(new Slime(900));
    slimes.push(new Slime(4000));
    enemies.push(new EnemyTwo(1525, 455));
    enemies.push(new EnemyTwo(2700, 450));
    // enemies.push(new EnemyTwo(2250, 462));
    enemies.push(new EnemyTwo(2600, 465));
    bats.push(new Bat(1600, 150));
    bats.push(new Bat(2000, 140));
    bats.push(new Bat(100, 150));
    bats.push(new Bat(2200, 140));
    bats.push(new Bat(3500, 140));

    //game cycle functions
    function backgroundScrollManager(){
        backgrounds.forEach(background => {
            background.update(player.scrollRight, player.scrollLeft, scrollSpeed);
            background.draw(ctx);
            backgrounds = backgrounds.filter(backgroundFloor => !backgroundFloor.markForDeletion);
        })
    }

    function startScreen(context){
        context.fillStyle = 'rgba(0, 75, 50, 0.25)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = '40px Helvetica';
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText('Welcome, press ENTER!', canvas.width/2 + 2, 200);
    }

    function backgroundScrollManager(){
        backgrounds.forEach(background => {
            background.update(player.scrollRight, player.scrollLeft, scrollSpeed);
            background.draw(ctx);
        })
    }

    function groundsManager(){
        terrain.forEach(floor => {
            floor.update(player.scrollRight, player.scrollLeft, scrollSpeed);
            floor.draw(ctx);
        })
        walls.forEach(wall => {
            wall.update(player.scrollRight, player.scrollLeft, scrollSpeed);
            wall.draw(ctx);
        })
    }

    function enemyManager(){
        enemies.forEach(enemy1 => {
            enemy1.update(bullets, player.scrollRight, player.scrollLeft, scrollSpeed, player, gameStart);
            enemy1.draw(ctx);
            enemies = enemies.filter(enemy1 => !enemy1.markForDeletion);
            if (enemies.length === 0) console.log("Victory!");
        })
        bats.forEach(bat => {
            bat.update(bullets, player.scrollRight, player.scrollLeft, scrollSpeed, player, gameStart);
            bat.draw(ctx);
            bats = bats.filter(bat => !bat.markForDeletion);
        })
        slimes.forEach(slime => {
            slime.update(bullets, player.scrollRight, player.scrollLeft, scrollSpeed, player, gameStart);
            slime.draw(ctx);
            slimes = slimes.filter(slime => !slime.markForDeletion);
        })
    }

    function bulletManager(){
        bullets.forEach(bullet => {
            bullet.draw(ctx);
            bullet.update(canvas.width, canvas.height, player.scrollRight, player.scrollLeft, scrollSpeed);
            bullets = bullets.filter(bullet => !bullet.markForDeletion);
        })
    }

    function deathScreenDelay(){
        setInterval(deathScreen(ctx), 20000);
    }
    function deathScreen(context){
        stopAll = true;
        context.fillStyle = 'rgba(150, 0, 0, 0.5)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = '50px Helvetica';
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText('I am sorry to say that you have died.', canvas.width/2 + 2, 225);
        context.font = '30px Helvetica';
        context.fillText('press ENTER to restart.', canvas.width/2 + 2, 275);
    }

    const player = new Character();
    const health = new Health(player.health);
    const healthBar = new HealthBar();
    const mana = new Mana(player.mana);

    function gameCycle(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        backgroundScrollManager();
        bulletManager();
        player.update(moveRight, moveLeft, moveUp, moveDown, canvas.width, 
            canvas.height, terrain, enemies, bats, shoot, pointRight, slimes, walls);
        player.draw(ctx);
        enemyManager();
        groundsManager();
        healthBar.draw(ctx);
        health.update(player.health);
        health.draw(ctx);
        mana.update(player.mana);
        mana.draw(ctx);
        if (!gameStart) startScreen(ctx);
        if (player.gameOver) deathScreenDelay();
        if (!stopAll) requestAnimationFrame(gameCycle);
    }
    gameCycle();
});