import { Proyek } from '../../../../umum/entitas/Proyek'
import type { ParameterBuatProyek } from '../../../../umum/entitas/Proyek'
import { SistemLangsung } from './SistemLangsung.svelte'

export class ProyekLangsung extends Proyek {
  private namaLangsung = $state('')
  private koleksiSistemLangsung: SistemLangsung[] = $state([])

  constructor(parameter: ParameterBuatProyek = {}) {
    super(parameter)

    this.namaLangsung = this.nama
    this.koleksiSistemLangsung = this.koleksiSistem as SistemLangsung[]
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung = nama
  }

  dapatkanKoleksiSistemLangsung(): SistemLangsung[] {
    return this.koleksiSistemLangsung
  }

  override buatSistem(): SistemLangsung {
    const sistemBaru = new SistemLangsung()
    super.buatSistem(sistemBaru)
    this.koleksiSistemLangsung.push(sistemBaru)
    return sistemBaru
  }
}
