class Player {
    constructor(game) {
        this.game = game;
        this.width = 80;
        this.height = 80;
        this.x = (this.game.width - this.width) * 0.5;
        this.y = (this.game.height - this.height) * 0.5;
        this.speed = 3;
        this.lives = 3;
        this.maxLives = 10;
        this.image = document.getElementById("hexagon-player");
        this.frameX = 0;
        this.jetsFrame = 1;
    }

    draw(context) {
        // handle sprite frames
        // if (this.game.keys.indexOf("1") > -1) { this.frameX = 1; }
        // else { this.frameX = 0; }

        context.drawImage(this.image,
            this.frameX * this.width, 0,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height);
    }

    update() {
        // horizantal boundaries
        if (this.x < -this.width * 0.5) { this.x = -this.width * 0.5; }
        else if (this.x > this.game.width - this.width * 0.5) { this.x = this.game.width - this.width * 0.5 }
    }

    shoot() {
        // need to fix projectile array to allow for proper one-at-a-time fire
        const projectile = this.game.getProjectile();
        const projectiles = this.game.getProjectiles();

        // if (projectile) { projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5); }
        for (let i = 0; i < 6; i++) {
            if (projectiles[i]) {
                projectiles[i].start(this.x + this.width * 0.5, this.y + this.height * 0.5);
            }
        }
    }

    restart() {
        this.x = (this.game.width - this.width) * 0.5;
        this.y = (this.game.height - this.height) * 0.5;
        this.lives = 3;
    }
}

export { Player }