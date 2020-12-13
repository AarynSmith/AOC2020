class Ship {
  constructor() {
    this.x = 0
    this.y = 0
    this.heading = 90;
    this.waypoint = {x: 10, y: 1}
  }

  shipCommand(command) {
    if (command == '') return;
    let [_, c, v] = command.match(/(\w)(\d+)/);
    v = Number(v);
    switch (c) {
      case 'N': this.y += v; break;
      case 'S': this.y -= v; break;
      case 'E': this.x += v; break;
      case 'W': this.x -= v; break;
      case 'F':
        switch (this.heading) {
          case 0: this.y += v; break;
          case 90: this.x += v; break;
          case 180: this.y -= v; break;
          case 270: this.x -= v; break;
        }
        break;
      case 'R': this.heading = (this.heading + v) % 360; break;
      case 'L':
        this.heading = (this.heading - v) % 360;
        if (this.heading < 0) this.heading += 360;
        break;
    }
  }

  waypointCommand(command) {
    if (command == '') return;
    let [_, c, v] = command.match(/(\w)(\d+)/);
    v = Number(v);
    switch (c) {
      case 'N': this.waypoint.y += v; break;
      case 'S': this.waypoint.y -= v; break;
      case 'E': this.waypoint.x += v; break;
      case 'W': this.waypoint.x -= v; break;
      case 'L':
        if (v === 90) this.waypoint = {
          x: -1 * this.waypoint.y,
          y: this.waypoint.x
        };
        else if (v === 180) this.waypoint = {
          x: -1 * this.waypoint.x,
          y: -1 * this.waypoint.y
        }
        else if (v === 270) this.waypoint = {
          x: this.waypoint.y,
          y: -1 * this.waypoint.x
        }
        else console.log("Unhandled L turn:", {c, v})
        break;
      case 'R':
        if (v === 90) this.waypoint = {
          x: this.waypoint.y,
          y: -1 * this.waypoint.x
        };
        else if (v === 180) this.waypoint = {
          x: -1 * this.waypoint.x,
          y: -1 * this.waypoint.y
        }
        else if (v === 270) this.waypoint = {
          x: -1 * this.waypoint.y,
          y: this.waypoint.x
        };
        else console.log("Unhandled L turn:", {c, v})

        break;
      case 'F':
        this.x += this.waypoint.x * v;
        this.y += this.waypoint.y * v;
        break;
      default:
        console.log("Unhandled command", {c, v})
    }
  }

  manhattanDist() {
    return Math.abs(this.x) + Math.abs(this.y)
  }

}

function part1(input) {
  const ship = new Ship;
  input.forEach(cmd => ship.shipCommand(cmd));
  return ship.manhattanDist();
}

function part2(input) {
  const ship = new Ship;
  input.forEach(cmd => ship.waypointCommand(cmd));
  return ship.manhattanDist();
}

module.exports = {part1, part2, Ship};