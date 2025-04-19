import {
  DiagramKelas,
  type ParameterBuatDiagramKlas as ParameterBuatDiagramKelas
} from '../../../../umum/entitas/DiagramKelas'
import type { Kelas } from '../../../../umum/entitas/Kelas'
import type { Koordinat } from '../../../../umum/entitas/Koordinat'
import { ElemenKlasLangsung } from './ElemenKlasLangsung'

export class DiagramKelasLangsung extends DiagramKelas {
  private namaLangsung = $state('')
  private koleksiElemenKlasLangsung: ElemenKlasLangsung[] = $state([])

  constructor(parameter: ParameterBuatDiagramKelas = {}) {
    super(parameter)

    this.koleksiElemenKlasLangsung = this.koleksiElemenKlas as ElemenKlasLangsung[]
    this.namaLangsung = this.nama
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung = nama
  }

  dapatkanKoleksiElemenKlasLangsung(): ElemenKlasLangsung[] {
    return this.koleksiElemenKlasLangsung
  }

  tambahElemenKlasBaru(klas: Kelas, posisi: Koordinat): ElemenKlasLangsung {
    const elemenKlas = new ElemenKlasLangsung({ klas: klas, posisi })
    this.koleksiElemenKlasLangsung.update((koleksiLama) => {
      koleksiLama.push(elemenKlas)
      return koleksiLama
    })
    this.koleksiElemenKlas.push(elemenKlas)
    return elemenKlas
  }
}
