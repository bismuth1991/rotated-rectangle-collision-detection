import Rectangle from './rectangle';
import isCollided from './collision_detection';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');

  // new Rectangle(x, y, width, height, angle)
  const rotatedRect = new Rectangle(100, 100, 80, 20, 80);
  const testRect = new Rectangle(100, 100, 80, 20, 20);

  const draw = (fps) => {
    const fpsInterval = 1000 / fps;
    let then = performance.now();

    const drawRect = (rect) => {
      ctx.save();
      ctx.translate(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2,
      );
      ctx.rotate(rect.rotationAngle);
      ctx.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
      ctx.restore();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const now = performance.now();
      const elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawRect(rotatedRect);

        testRect.updatePos();
        if (isCollided(rotatedRect, testRect)) {
          ctx.fillStyle = 'red';
        } else {
          ctx.fillStyle = 'green';
        }
        drawRect(testRect);
      }
    };

    animate();
  };

  draw(60);

  document.addEventListener('keydown', ({ key }) => {
    if (key === 'w') {
      testRect.dY = -5;
    }
    if (key === 's') {
      testRect.dY = 5;
    }
    if (key === 'a') {
      testRect.dX = -5;
    }
    if (key === 'd') {
      testRect.dX = 5;
    }
  });

  document.addEventListener('keyup', ({ key }) => {
    if (key === 'w') {
      testRect.dY = 0;
    }
    if (key === 's') {
      testRect.dY = 0;
    }
    if (key === 'a') {
      testRect.dX = 0;
    }
    if (key === 'd') {
      testRect.dX = 0;
    }
  });
});
