import { readonly, writable, type Readable } from 'svelte/store'
import {
  CeritaPengguna,
  type ParameterBuatCeritaPengguna
} from '../../../../umum/entitas/CeritaPengguna'
import type { IModelLangsung } from './IModelLangsung'

export class CeritaPenggunaLangsung extends CeritaPengguna implements IModelLangsung {
  private namaLangsung = writable('')
  private ceritaLangsung = writable('')

  constructor(parameter: ParameterBuatCeritaPengguna) {
    super(parameter)

    this.namaLangsung.set(this.nama)
    this.ceritaLangsung.set(this.cerita)
  }

  dapatkanNamaLangsung(): Readable<string> {
    return readonly(this.namaLangsung)
  }

  aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung.set(nama)
  }

  dapatkanCeritaLangsung(): Readable<string> {
    return this.ceritaLangsung
  }

  aturCerita(cerita: string): void {
    this.cerita = cerita
    this.ceritaLangsung.set(cerita)
  }
}
