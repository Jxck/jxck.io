import Position from "./position.mjs";
import distance from "./distance.mjs";

export default ([x1, y1], [x2, y2]) => {
  const p1 = new Position(x1, y1)
  const p2 = new Position(x2, y2)
  return distance(p1, p2)
}
