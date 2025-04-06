import { writable } from 'svelte/store'
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
}
