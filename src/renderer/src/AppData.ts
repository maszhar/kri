import { readonly, writable } from 'svelte/store'
import { Komponen } from './common/entitas/Komponen'

export class AppData {
  private _kumpulanKomponen$ = writable<Komponen[]>([])
  kumpulanKomponen$ = readonly(this._kumpulanKomponen$)

  private constructor() {}

  static instance = new AppData()
}
