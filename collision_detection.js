// following this tutorial
// https://www.gamedev.net/articles/programming/general-and-gameplay-programming/2d-rotated-rectangle-collision-r2604

const projectCornerToAxis = (corner, axis) => {
  const projectedX = (corner.x * axis.x + corner.y * axis.y) / ((axis.x ** 2) + (axis.y ** 2)) * axis.x;
  const projectedY = (corner.x * axis.x + corner.y * axis.y) / ((axis.x ** 2) + (axis.y ** 2)) * axis.y;

  return { projectedX, projectedY };
};

const scalarValues = (projectedCorners, axis) => projectedCorners.map((corner) => {
  const { projectedX, projectedY } = corner;
  return projectedX * axis.x + projectedY * axis.y;
});

const checkScalarForColision = (scalar1, scalar2) => {
  const min1 = Math.min(...scalar1);
  const max1 = Math.max(...scalar1);

  const min2 = Math.min(...scalar2);
  const max2 = Math.max(...scalar2);

  if (min2 <= max1 && min1 <= max2) {
    return true;
  }
  return false;
};

const isCollided = (rect1, rect2) => {
  const axis1 = {
    x: rect1.topRight().x - rect1.topLeft().x,
    y: rect1.topRight().y - rect1.topLeft().y,
  };
  const axis2 = {
    x: rect1.topRight().x - rect1.bottomRight().x,
    y: rect1.topRight().y - rect1.bottomRight().y,
  };
  const axis3 = {
    x: rect2.topLeft().x - rect2.bottomLeft().x,
    y: rect2.topLeft().y - rect2.bottomLeft().y,
  };
  const axis4 = {
    x: rect2.topLeft().x - rect2.topRight().x,
    y: rect2.topLeft().y - rect2.topRight().y,
  };

  const corners1 = [rect1.topRight(), rect1.topLeft(), rect1.bottomRight(), rect1.bottomLeft()];
  const corners2 = [rect2.topRight(), rect2.topLeft(), rect2.bottomRight(), rect2.bottomLeft()];

  const axes = [axis1, axis2, axis3, axis4];

  for (let i = 0; i < axes.length; i += 1) {
    const corners1ToAxis = corners1.map(corner => projectCornerToAxis(corner, axes[i]));
    const corners2ToAxis = corners2.map(corner => projectCornerToAxis(corner, axes[i]));

    const scalar1 = scalarValues(corners1ToAxis, axes[i]);
    const scalar2 = scalarValues(corners2ToAxis, axes[i]);

    if (checkScalarForColision(scalar1, scalar2) === false) {
      return false;
    }
  }
  return true;
};

export default isCollided;
