import { Player } from "./player.js";
import { Projectile, ProjectileUpRight, ProjectileUpLeft, ProjectileDown, ProjectileDownRight, ProjectileDownLeft } from "./projectile.js";
import { Wave } from "./wave.js";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.player = new Player(this);
        this.projectilesPool = [];
        this.numberOfProjectiles = 120; // HEX
        this.createProjectiles();
        this.playerHasFired = false;

        this.columns = 1;
        this.rows = 1;
        this.enemySize = 80;
        // this.waves = [];
        // this.waves.push(new Wave(this));
        // this.waveCount = this.waves.length;

        // if checkCollision() => appropriate animation
        // this.spriteUpdate = false;
        // this.spriteTimer = 0;
        // this.spriteInterval = 150;

        this.score = 0;
        this.gameOver = false;

        let game = this
        setInterval(() => { game.player.shoot() }, 250);

        //event listeners
        window.addEventListener('keydown', e => {
            if (!this.keys.includes(e.key)) { this.keys.push(e.key); }

            if (e.key === 'r' && this.gameOver) { this.restart(); }
        });

        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            this.keys.splice(index, 1);
            // if (e.key === '1') { this.playerHasFired = false; }
        });

        window.addEventListener('touchstart', e => {
            console.log(e.changedTouches[0].pageY);
        });

        window.addEventListener('touchmove', e => {
            //e.preventDefault();
            let touchX = e.changedTouches[0].pageX;
            let touchRadX = e.changedTouches[0].radiusX;
            let touchY = e.changedTouches[0].pageY;
            let touchRadY = e.changedTouches[0].radiusY;
            //console.log(e.changedTouches[0].pageY);
            if ((this.player.x - touchRadX < touchX && this.player.x + touchRadX > touchRadX) && (this.player.y - touchRadY < touchY && this.player.y + touchRadY > touchRadY)) {
                this.player.x = touchX - this.player.width * 0.5;
                this.player.y = touchY - this.player.height * 0.5;
            }

            // if ((this.player.y - touchRadY < touchY && this.player.y + touchRadY > touchRadY)) {
            //     this.player.y = touchY - this.player.height * 0.5;
            // }

        });

        window.addEventListener('touchend', e => {
            console.log(e.changedTouches[0].pageY);
        });
    }

    render(context, dt) {
        if (this.spriteTimer > this.spriteInterval) {
            this.spriteUpdate = true;
            this.spriteTimer -= this.spriteInterval;
        } else {
            this.spriteUpdate = false;
            this.spriteTimer += dt;
        }

        // this.drawStatusText(context);


        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });

        this.player.draw(context);
        this.player.update();

        // this.waves.forEach(wave => {
        //     wave.render(context);
        //     if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
        //         this.newWave(context);
        //         this.waveCount = this.waves.length;
        //         wave.nextWaveTrigger = true;
        //         if (this.player.lives < this.player.maxLives) { this.player.lives++; }
        //     }
        // });
    }

    // create projectile object pool
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i += 6) {
            this.projectilesPool.push(new Projectile());
            this.projectilesPool.push(new ProjectileUpRight());
            this.projectilesPool.push(new ProjectileUpLeft());
            this.projectilesPool.push(new ProjectileDown());
            this.projectilesPool.push(new ProjectileDownRight());
            this.projectilesPool.push(new ProjectileDownLeft());
        }
    }

    // get free projectile object from pool
    getProjectile() {
        for (let i = 0; i < this.projectilesPool.length; i++) {
            if (this.projectilesPool[i].free) { return this.projectilesPool[i]; }
        }
    }

    getProjectiles() {
        for (let i = 0; i < this.projectilesPool.length; i++) {
            if (this.projectilesPool[i].free) {
                return this.projectilesPool.slice(i, i + 6);
            }
        }
    }

    // collision detection between 2 rectangles
    // return boolean true if collision detected between a and b, else false
    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    // drawStatusText(context) {
    //     context.save();
    //     context.shadowOffestX = 2;
    //     context.shadowOffestY = 2;
    //     context.shadowColor = "black"
    //     context.fillText("Score: " + this.score, 20, 40);
    //     context.fillText("Wave " + this.waveCount, 20, 80);

    //     for (let i = 0; i < this.player.maxLives; i++) {
    //         context.strokeRect(20 + 20 * i, 100, 10, 15)
    //     }

    //     for (let i = 0; i < this.player.lives; i++) {
    //         context.fillRect(20 + 20 * i, 100, 10, 15)
    //     }

    //     if (this.gameOver) {
    //         context.textAlign = "center";
    //         context.font = "100px Impact";
    //         context.fillText("GAME OVER", this.width * 0.5, this.height * 0.5);
    //         context.font = "30px Impact";
    //         context.fillText("Press R to restart, stupid", this.width * 0.5, this.height * 0.5 + 100);
    //     }
    //     context.restore();
    // }

    // newWave(context) {
    //     if (Math.random() < 0.5 && this.columns * this.enemySize <= 0.8 * this.width) {
    //         this.columns++;
    //     } else if (this.rows * this.enemySize <= 0.6 * this.height) {
    //         this.rows++;
    //     }

    //     this.waves.push(new Wave(this));
    // }

    restart() {
        this.player.restart();
        this.columns = 2;
        this.rows = 2;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = this.waves.length;
        this.score = 0;
        this.gameOver = false;
    }
}

export { Game }