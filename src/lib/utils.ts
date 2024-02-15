export const rand = (min: number, max?: number) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
};

export const createPoints = (num: number, ranges: number[][]) =>
  new Array(num)
    .fill(0)
    .map((_) => ranges.map((range) => rand(range[0], range[1])))
    .flat();

export const drawPointsInGrid = (
  WIDTH: number,
  HEIGHT: number,
  picWidth: number,
  picHeight: number
) => {
  const startX: number = Math.floor((WIDTH - picWidth) / 2);
  const startY: number = Math.floor((HEIGHT - picHeight) / 2);

  // 점들을 담을 배열 초기화
  const positions: number[] = [];
  const texs: number[] = [];

  // 그림을 커버하는 범위 내에서 점 찍기
  for (let y = startY; y < startY + picHeight; y++) {
    for (let x = startX; x < startX + picWidth; x++) {
      positions.push(x, y);

      texs.push(
        (x - (WIDTH - picWidth) / 2.0) / picWidth,
        1 - (y - (HEIGHT - picHeight) / 2.0) / picHeight
      );
    }
  }

  return { positions, texs };
};

export const orthographic = (
  left: number,
  right: number,
  bottom: number,
  top: number,
  near: number,
  far: number
) => {
  return [
    2 / (right - left),
    0,
    0,
    0,
    0,
    2 / (top - bottom),
    0,
    0,
    0,
    0,
    2 / (near - far),
    0,

    (left + right) / (left - right),
    (bottom + top) / (bottom - top),
    (near + far) / (near - far),
    1,
  ];
};

export const swapBuffers = (buffer1: object, buffer2: object) => {
  const temp = { ...buffer1 };
  Object.assign(buffer1, buffer2);
  Object.assign(buffer2, temp);
};
