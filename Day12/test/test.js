const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')
// .filter(v => v !== '')
const example = `F10
N3
F7
R90
F11
`.split('\n');

suite('Class tests', () => {
  suite('Ship command', () => {
    test('Move North', () => {
      const s = new idx.Ship();
      s.shipCommand('N10');
      expect(s.y).to.equal(10);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
    });
    test('Move South', () => {
      const s = new idx.Ship();
      s.shipCommand('S10');
      expect(s.y).to.equal(-10);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
    });
    test('Move East', () => {
      const s = new idx.Ship();
      s.shipCommand('E10');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(10);
      expect(s.heading).to.equal(90);
    });
    test('Move West', () => {
      const s = new idx.Ship();
      s.shipCommand('W10');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(-10);
      expect(s.heading).to.equal(90);
    });
    test('Turn Left 90', () => {
      const s = new idx.Ship();
      s.shipCommand('L90');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(0);
    });
    test('Turn Right 90', () => {
      const s = new idx.Ship();
      s.shipCommand('R90');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(180);
    });
    test('Turn Left 180', () => {
      const s = new idx.Ship();
      s.shipCommand('L180');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(270);
    });
    test('Turn Left 720', () => {
      const s = new idx.Ship();
      s.shipCommand('L720');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
    });
    test('Turn Right 180', () => {
      const s = new idx.Ship();
      s.shipCommand('R180');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(270);
    });
    test('Forward 10', () => {
      const s = new idx.Ship();
      s.shipCommand('F10');
      expect(s.x).to.equal(10);
      expect(s.y).to.equal(0);
      expect(s.heading).to.equal(90);
    });
  });
  suite('Waypoint command', () => {
    test('Move North', () => {
      const s = new idx.Ship();
      s.waypointCommand('N10');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
      expect(s.waypoint.y).to.equal(11);
      expect(s.waypoint.x).to.equal(10);

    });
    test('Move South', () => {
      const s = new idx.Ship();
      s.waypointCommand('S10');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
      expect(s.waypoint.y).to.equal(-9);
      expect(s.waypoint.x).to.equal(10);
    });
    test('Move East', () => {
      const s = new idx.Ship();
      s.waypointCommand('E10');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
      expect(s.waypoint.y).to.equal(1);
      expect(s.waypoint.x).to.equal(20);
    });
    test('Move West', () => {
      const s = new idx.Ship();
      s.waypointCommand('W10');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
      expect(s.waypoint.y).to.equal(1);
      expect(s.waypoint.x).to.equal(0);
    });
    test('Rotate Left 90', () => {
      const s = new idx.Ship();
      s.waypointCommand('L90');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
      expect(s.waypoint.x).to.equal(-1);
      expect(s.waypoint.y).to.equal(10);
    });
    test('Rotate Right 90', () => {
      const s = new idx.Ship();
      s.waypointCommand('R90');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
      expect(s.waypoint.x).to.equal(1);
      expect(s.waypoint.y).to.equal(-10);
    });
    test('Rotate Left 180', () => {
      const s = new idx.Ship();
      s.waypointCommand('L180');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
      expect(s.waypoint.x).to.equal(-10);
      expect(s.waypoint.y).to.equal(-1);
    });
    test('Rotate Right 180', () => {
      const s = new idx.Ship();
      s.waypointCommand('R180');
      expect(s.y).to.equal(0);
      expect(s.x).to.equal(0);
      expect(s.heading).to.equal(90);
      expect(s.waypoint.x).to.equal(-10);
      expect(s.waypoint.y).to.equal(-1);
    });
    test('Forward 10', () => {
      const s = new idx.Ship();
      s.waypointCommand('F10');
      expect(s.x).to.equal(100);
      expect(s.y).to.equal(10);
      expect(s.heading).to.equal(90);
    });
  });
  suite('Waypoint Rotation/Translation', () => {
    const s = new idx.Ship();
    test('N3', () => {
      s.waypointCommand('N3');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(10);
      expect(s.waypoint.y).to.equal(4);
    });
    test('R90', () => {
      s.waypointCommand('R90');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(4);
      expect(s.waypoint.y).to.equal(-10);
    });
    test('L90', () => {
      s.waypointCommand('L90');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(10);
      expect(s.waypoint.y).to.equal(4);
    });
    test('R90', () => {
      s.waypointCommand('R90');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(4);
      expect(s.waypoint.y).to.equal(-10);
    });
    test('R90', () => {
      s.waypointCommand('R90');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(-10);
      expect(s.waypoint.y).to.equal(-4);
    });
    test('R90', () => {
      s.waypointCommand('R90');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(-4);
      expect(s.waypoint.y).to.equal(10);
    });
    test('N1', () => {
      s.waypointCommand('N1');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(-4);
      expect(s.waypoint.y).to.equal(11);
    });
    test('E10', () => {
      s.waypointCommand('E10');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(6);
      expect(s.waypoint.y).to.equal(11);
    });
    test('S4', () => {
      s.waypointCommand('S4');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(6);
      expect(s.waypoint.y).to.equal(7);
    });
    test('W1', () => {
      s.waypointCommand('W1');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(5);
      expect(s.waypoint.y).to.equal(7);
    });
    test('R180', () => {
      s.waypointCommand('R180');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(-5);
      expect(s.waypoint.y).to.equal(-7);
    });
    test('L90', () => {
      s.waypointCommand('L90');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(7);
      expect(s.waypoint.y).to.equal(-5);
    });
    test('L180', () => {
      s.waypointCommand('L180');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(-7);
      expect(s.waypoint.y).to.equal(5);
    });
  });
  suite('Waypoint Movement', () => {
    test('Move Multiples', () => {
      const s = new idx.Ship;
      s.waypoint = {x: 2, y: 1};
      s.waypointCommand('F1');
      expect(s.x).to.equal(2);
      expect(s.y).to.equal(1);
      expect(s.waypoint.x).to.equal(2);
      expect(s.waypoint.y).to.equal(1);
      s.waypointCommand('F1');
      expect(s.x).to.equal(4);
      expect(s.y).to.equal(2);
      expect(s.waypoint.x).to.equal(2);
      expect(s.waypoint.y).to.equal(1);
      s.waypointCommand('F2');
      expect(s.x).to.equal(8);
      expect(s.y).to.equal(4);
      expect(s.waypoint.x).to.equal(2);
      expect(s.waypoint.y).to.equal(1);
    });
    test('R90 F Multiples', () => {
      const s = new idx.Ship;
      s.waypoint = {x: 2, y: 1};
      s.waypointCommand('R90');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(1);
      expect(s.waypoint.y).to.equal(-2);
      s.waypointCommand('F1');
      expect(s.x).to.equal(1);
      expect(s.y).to.equal(-2);
      expect(s.waypoint.x).to.equal(1);
      expect(s.waypoint.y).to.equal(-2);
      s.waypointCommand('F1');
      expect(s.x).to.equal(2);
      expect(s.y).to.equal(-4);
      expect(s.waypoint.x).to.equal(1);
      expect(s.waypoint.y).to.equal(-2);
      s.waypointCommand('F2');
      expect(s.x).to.equal(4);
      expect(s.y).to.equal(-8);
      expect(s.waypoint.x).to.equal(1);
      expect(s.waypoint.y).to.equal(-2);
    })
    test('L90 F Multiples', () => {
      const s = new idx.Ship;
      s.waypoint = {x: 2, y: 1};
      s.waypointCommand('L90');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(-1);
      expect(s.waypoint.y).to.equal(2);
      s.waypointCommand('F1');
      expect(s.x).to.equal(-1);
      expect(s.y).to.equal(2);
      expect(s.waypoint.x).to.equal(-1);
      expect(s.waypoint.y).to.equal(2);
      s.waypointCommand('F1');
      expect(s.x).to.equal(-2);
      expect(s.y).to.equal(4);
      expect(s.waypoint.x).to.equal(-1);
      expect(s.waypoint.y).to.equal(2);
      s.waypointCommand('F2');
      expect(s.x).to.equal(-4);
      expect(s.y).to.equal(8);
      expect(s.waypoint.x).to.equal(-1);
      expect(s.waypoint.y).to.equal(2);
    })
    test('R180 F Multiples', () => {
      const s = new idx.Ship;
      s.waypoint = {x: 2, y: 1};
      s.waypointCommand('R180');
      expect(s.x).to.equal(0);
      expect(s.y).to.equal(0);
      expect(s.waypoint.x).to.equal(-2);
      expect(s.waypoint.y).to.equal(-1);
      s.waypointCommand('F1');
      expect(s.x).to.equal(-2);
      expect(s.y).to.equal(-1);
      expect(s.waypoint.x).to.equal(-2);
      expect(s.waypoint.y).to.equal(-1);
      s.waypointCommand('F1');
      expect(s.x).to.equal(-4);
      expect(s.y).to.equal(-2);
      expect(s.waypoint.x).to.equal(-2);
      expect(s.waypoint.y).to.equal(-1);
      s.waypointCommand('F2');
      expect(s.x).to.equal(-8);
      expect(s.y).to.equal(-4);
      expect(s.waypoint.x).to.equal(-2);
      expect(s.waypoint.y).to.equal(-1);
    });
    test('Left Spiral', () => {
      const s = new idx.Ship
    });
  });
});

suite('Part 1', () => {
  suite("Examples", () => {
    const expected = 25
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(1645)
    });
  });
});

suite('Part 2', () => {
  suite("Examples", () => {
    const expected = 286
    test(`should return ${expected}`, () => {
      expect(idx.part2(example)).to.equal(expected);
    });
  })
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
      expect(part2).to.equal(35292)
    });
  });
});
