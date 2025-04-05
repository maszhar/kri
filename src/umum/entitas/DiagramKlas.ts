import { ElemenKlas } from './ElemenKlas'
import { Model } from './Model'

export class DiagramKlas extends Model {
  koleksiElemenKlas: ElemenKlas[]

  constructor(parameter: ParameterBuatDiagramKlas = {}) {
    super({
      nama: parameter.nama ?? 'DiagramKlas1'
    })
    this.koleksiElemenKlas = parameter.koleksiElemenKlas ?? []
  }

  // hapus
  hapusElemenKlas(indeks: number): void {
    this.koleksiElemenKlas.splice(indeks, 1)
  }

  bungkusUntukAi(): any {
    /**
     * Daftar Kunci :
     * k = koleksi elemen klas
     */
    return {
      k: this.koleksiElemenKlas.map((elemenKlas) => elemenKlas.bungkusUntukAi())
    }
  }
}

export interface ParameterBuatDiagramKlas {
  nama?: string
  koleksiElemenKlas?: ElemenKlas[]
}
