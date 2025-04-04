import { writable, type Readable, type Writable } from 'svelte/store'
import { Koordinat } from '../../../../umum/entitas/Koordinat'

export class KoordinatLangsung extends Koordinat {
  private xLangsung: Writable<number>
  private yLangsung: Writable<number>

  constructor(x: number, y: number) {
    super(x, y)
    this.xLangsung = writable(this.x)
    this.yLangsung = writable(this.y)
  }

  dapatkanXLangsung(): Readable<number> {
    return this.xLangsung
  }

  aturX(x: number): void {
    this.xLangsung.set(x)
    this.x = x
  }

  dapatkanYLangsung(): Readable<number> {
    return this.yLangsung
  }

  aturY(y: number): void {
    this.yLangsung.set(y)
    this.y = y
  }
}
