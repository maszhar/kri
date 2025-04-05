export class Koordinat {
  constructor(
    public x = 0,
    public y = 0
  ) {}

  bungkus(): any {
    return {
      x: this.x,
      y: this.y
    }
  }
}
