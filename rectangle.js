const findCornerCoordinates = (x, y, midPointX, midPointY, rotationAngle) => {
  // translate to reference (0, 0)
  const translatedX = x - midPointX;
  const translatedY = y - midPointY;

  const rotatedX = translatedX * Math.cos(rotationAngle) - translatedY * Math.sin(rotationAngle);
  const rotatedY = translatedX * Math.sin(rotationAngle) + translatedY * Math.cos(rotationAngle);

  // translate back to original reference (midPointX, midPointY)
  const finalX = rotatedX + midPointX;
  const finalY = rotatedY + midPointY;

  return { x: finalX, y: finalY };
};


class Rectangle {
  constructor(x, y, width, height, rotationAngle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.midPointX = x + this.width / 2;
    this.midPointY = y + this.height / 2;
    this.rotationAngle = rotationAngle * Math.PI / 180;

    this.dX = 0;
    this.dY = 0;
  }

  topLeft() {
    return findCornerCoordinates(
      this.x,
      this.y,
      this.midPointX,
      this.midPointY,
      this.rotationAngle,
    );
  }

  topRight() {
    return findCornerCoordinates(
      this.x + this.width,
      this.y,
      this.midPointX,
      this.midPointY,
      this.rotationAngle,
    );
  }

  bottomLeft() {
    return findCornerCoordinates(
      this.x,
      this.y + this.height,
      this.midPointX,
      this.midPointY,
      this.rotationAngle,
    );
  }

  bottomRight() {
    return findCornerCoordinates(
      this.x + this.width,
      this.y + this.height,
      this.midPointX,
      this.midPointY,
      this.rotationAngle,
    );
  }

  updatePos() {
    this.x += this.dX;
    this.y += this.dY;
  }
}

export default Rectangle;
