import Position from "parent/position.js";
import func     from "parent/func.js";

export default (o1, o2) => {
  const p1 = new Position(o1.x, o1.y)
  const p2 = new Position(o2.x, o2.y)
  return func(p1, p2)
}
