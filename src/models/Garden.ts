export default class Garden {
  // Number of column of the garden
  private _column: number;

  // Number of row of the garden
  private _row: number;

  constructor(column: number, row: number) {
    this._row = row;
    this._column = column;
  }

  get column(): number {
    return this._column;
  }

  get row(): number {
    return this._row;
  }
}
