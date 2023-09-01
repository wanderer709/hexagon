<template>
  <canvas id="canvas"></canvas>
  <img id="hexagon-player" src="./assets/images/hexagon-player.png" alt="hexagon-player">
</template>

<script>
import { Game } from "./components/game.js"

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = 400
  canvas.height = 850
  ctx.fillStyle = "white"
  ctx.strokeStyle = "white"
  ctx.font = "30px Impact"

  const game = new Game(canvas)

  let lastTime = 0

  function animate(timeStamp) {
    const dt = timeStamp - lastTime
    lastTime = timeStamp

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.render(ctx, dt)
    requestAnimationFrame(animate)
  }

  animate(0)
  // setInterval(() => { game.player.shoot() }, 100);
})

export default {
  name: 'App',
  components: {}
}
</script>

<style>
#canvas {
  border: 5px solid white;
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 100%;
  max-height: 100%;
  translate: -50% -50%;
  background: black
}

#hexagon-player {
  display: none;
}
</style>
