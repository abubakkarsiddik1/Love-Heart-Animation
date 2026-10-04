const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// Heart equation
function heartPosition(t) {

  const x = 16 * Math.pow(Math.sin(t), 3);

  const y =
    13 * Math.cos(t)
    - 5 * Math.cos(2 * t)
    - 2 * Math.cos(3 * t)
    - Math.cos(4 * t);

  return {
    x: x,
    y: -y
  };
}


// Create particles
function createParticles() {

  particles = [];

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const scale = Math.min(canvas.width, canvas.height) / 38;

  for (let i = 0; i < 1800; i++) {

    const t = Math.random() * Math.PI * 2;

    const heart = heartPosition(t);

    const targetX =
      centerX + heart.x * scale;

    const targetY =
      centerY + heart.y * scale;

   particles.push({

  x: centerX,
  y: centerY,

  targetX: targetX,
  targetY: targetY,

  size: Math.random() * 2 + 2,

  speed: Math.random() * 0.025 + 0.008,

  delay: Math.random() * 2,

  alpha: Math.random() * 0.8 + 0.2

});

  }
}

createParticles();

let startTime = performance.now();

function animate(time) {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const elapsed =
    (time - startTime) / 1000;


  particles.forEach(p => {

    let progress =
      (elapsed - p.delay) * p.speed;

    progress =
      Math.max(0, Math.min(progress, 1));


    // Smooth movement
    const ease =
      progress * progress * (3 - 2 * progress);


    p.x +=
      (p.targetX - p.x) * ease * 0.08;

    p.y +=
      (p.targetY - p.y) * ease * 0.08;


    // ❤️ Heart particle

    ctx.font = `${p.size * 3}px Arial`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.globalAlpha = p.alpha;

    ctx.shadowBlur = 10;
    ctx.shadowColor = "red";

    ctx.fillText("❤️", p.x, p.y);

    ctx.globalAlpha = 1;

  });


  // Vertical glowing line
  const centerX = canvas.width / 2;

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height
    );

  gradient.addColorStop(
    0,
    "rgb(0, 238, 255)"
  );

  gradient.addColorStop(
    0.5,
    "rgba(255,0,0,0.9)"
  );

  gradient.addColorStop(
    1,
    "rgb(0, 255, 221)"
  );

  ctx.beginPath();

  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1.5;

  ctx.shadowBlur = 15;
  ctx.shadowColor = "red";

  ctx.stroke();


  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);