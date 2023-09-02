class Projectile {
    constructor() {
        this.width = 8;
        this.height = 8;
        this.x = 0;
        this.y = 0;
        this.speed = 5;
        this.free = true;
    }

    draw(context) {
        if (!this.free) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update() {
        if (!this.free) {
            this.y -= this.speed
            if (this.y < -this.height) { this.reset(); }
        }
    }

    start(x, y) {
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.free = false;
    }

    reset() {
        this.free = true;
    }
}

class ProjectileUpRight extends Projectile {
    update() {
        if (!this.free) {
            this.x += this.speed * Math.sqrt(3) / 2
            this.y -= this.speed / 2;
            if (this.y < -this.height) { this.reset(); }
        }
    }
}

class ProjectileUpLeft extends Projectile {
    update() {
        if (!this.free) {
            this.x -= this.speed * Math.sqrt(3) / 2
            this.y -= this.speed / 2;
            if (this.y < -this.height) { this.reset(); }
        }
    }
}

class ProjectileDown extends Projectile {
    update() {
        if (!this.free) {
            this.y += this.speed;
            if (this.y < -this.height) { this.reset(); }
        }
    }
}

class ProjectileDownRight extends Projectile {
    update() {
        if (!this.free) {
            this.x += this.speed * Math.sqrt(3) / 2
            this.y += this.speed / 2;
            if (this.y < -this.height) { this.reset(); }
        }
    }
}

class ProjectileDownLeft extends Projectile {
    update() {
        if (!this.free) {
            this.x -= this.speed * Math.sqrt(3) / 2
            this.y += this.speed / 2;
            if (this.y < -this.height) { this.reset(); }
        }
    }
}

export { Projectile, ProjectileUpRight, ProjectileUpLeft, ProjectileDown, ProjectileDownRight, ProjectileDownLeft }