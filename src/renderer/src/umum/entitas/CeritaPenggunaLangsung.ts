import { writable, type Writable } from 'svelte/store'
import {
  CeritaPengguna,
  type ParameterBuatCeritaPengguna
} from '../../../../umum/entitas/CeritaPengguna'

export class CeritaPenggunaLangsung extends CeritaPengguna {
  private namaLangsung = writable('')
  private ceritaLangsung = writable('')

  constructor(parameter: ParameterBuatCeritaPengguna) {
    super(parameter)

    this.namaLangsung.set(this.nama)
    this.ceritaLangsung.set(this.cerita)
  }

  dapatkanNamaLangsung(): Writable<string> {
    return this.namaLangsung
  }

  dapatkanCeritaLangsung(): Writable<string> {
    return this.ceritaLangsung
  }
}
