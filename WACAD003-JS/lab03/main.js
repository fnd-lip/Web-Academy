const c = document.querySelector("canvas"), ctx = c.getContext("2d");
const w = c.width = innerWidth, h = c.height = innerHeight;
const hue = 200, rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const tone = () => `hsl(${hue}, 70%, ${rand(40, 80)}%)`;
const shapes = ['circle', 'square', 'triangle'], balls = [];

function Ball(x, y, vx, vy, r, s) {
  Object.assign(this, {x, y, vx, vy, r, s, color: tone()});
}

Ball.prototype = {
  draw() {
    ctx.fillStyle = this.color;
    if (this.s === 'circle') {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI); ctx.fill();
    } else if (this.s === 'square') {
      ctx.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    } else {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.r);
      ctx.lineTo(this.x + this.r, this.y + this.r);
      ctx.lineTo(this.x - this.r, this.y + this.r);
      ctx.closePath(); ctx.fill();
    }
  },
  update() {
    if (this.x + this.r > w || this.x - this.r < 0) this.vx *= -1;
    if (this.y + this.r > h || this.y - this.r < 0) this.vy *= -1;
    this.x += this.vx; this.y += this.vy;
  },
  collide() {
    for (let b of balls) {
      if (b !== this && Math.hypot(this.x - b.x, this.y - b.y) < this.r + b.r) {
        b.color = this.color = tone();
      }
    }
  }
};

while (balls.length < 25) {
  let r = rand(10, 20);
  balls.push(new Ball(rand(r, w - r), rand(r, h - r), rand(-2, 2), rand(-2, 2), r, shapes[rand(0, 2)]));
}

(function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, w, h);
  for (let b of balls) b.draw(), b.update(), b.collide();
  requestAnimationFrame(loop);
})();
