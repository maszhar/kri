import { Klas } from '../../../../umum/entitas/Klas'
import { readonly, writable, type Readable } from 'svelte/store'

export class KlasLangsung extends Klas {
  private namaLangsung = writable(this.nama)

  dapatkanNamaLangsung(): Readable<string> {
    return readonly(this.namaLangsung)
  }

  aturNama(nama: string): void {
    this.namaLangsung.set(nama)
    this.nama = nama
  }
}
