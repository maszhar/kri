import type { Asosiasi } from '../../../../umum/entitas/Asosiasi'
import type { Atribut } from '../../../../umum/entitas/Atribut'
import { Kelas } from '../../../../umum/entitas/Kelas'
import { readonly, writable, type Readable } from 'svelte/store'
import type { Operasi } from '../../../../umum/entitas/Operasi'

export class KlasLangsung extends Kelas {
  private namaLangsung = writable(this.nama)

  constructor(parameter: ParameterBuatKlasLangsung) {
    super(parameter)
  }

  dapatkanNamaLangsung(): Readable<string> {
    return readonly(this.namaLangsung)
  }

  aturNama(nama: string): void {
    this.namaLangsung.set(nama)
    this.nama = nama
  }
}

interface ParameterBuatKlasLangsung {
  id?: number
  nama?: string
  koleksiAtribut?: Atribut[]
  koleksiAsosiasi?: Asosiasi[]
  koleksiOperasi?: Operasi[]
}
