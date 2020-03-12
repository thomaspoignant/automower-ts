import Orientation from './Orientation';
import Garden from './Garden';
import { Movement } from './Movement';
import NoGardenError from '../errors/NoGardenError';

export default class AutoMower {
  // Current x position on the grid
  private _x = 0;

  // Current y position on the grid
  private _y = 0;

  // Current orientation.
  private _orientation: Orientation;

  // Garden where the mower is.
  private _garden?: Garden;

  constructor(x: number, y: number, orientation: Orientation) {
    this._x = x;
    this._y = y;
    this._orientation = orientation;
  }

  // Give movements to the mower to drive it inside the garden.
  public drive(movements: Array<Movement>): void {
    if (!this.garden) {
      throw new NoGardenError();
    }

    movements.forEach((movement: Movement) => {
      switch (movement) {
        case 'F':
          // We can force the type here cause we are sure that garden is not undefined.
          this.moveForward(this.garden as Garden);
          break;
        case 'L':
          this.turnLeft();
          break;
        case 'R':
          this.turnRight();
          break;
        default:
          // Not supposed to happen.
          break;
      }
    });
  }

  private turnLeft(): void {
    // We are doing 2 modulo to be sure to have a positive number.
    this._orientation = ((((this._orientation - 1) % 4) + 4) % 4);
  }

  private turnRight(): void {
    this._orientation = (this._orientation + 1) % 4;
  }

  private moveForward(garden: Garden): void {
    switch (this._orientation) {
      case Orientation.N:
        this._y = Math.min(this._y + 1, garden.row);
        break;

      case Orientation.S:
        this._y = Math.max(this._y - 1, 0);
        break;

      case Orientation.E:
        this._x = Math.min(this._x + 1, garden.column);
        break;

      case Orientation.W:
        this._x = Math.max(this._x - 1, 0);
        break;

      default:
        // not supposed to happen
        break;
    }
  }

  get orientation(): Orientation {
    return this._orientation;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get garden(): Garden | undefined {
    return this._garden;
  }

  set garden(value: Garden | undefined) {
    this._garden = value;
  }
}
