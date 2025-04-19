import { ElemenKlas } from './ElemenKlas'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'

export class DiagramKelas extends IsiProyek {
  koleksiElemenKlas: ElemenKlas[]

  constructor(parameter: ParameterBuatDiagramKlas = {}) {
    super({
      ...parameter,
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

export interface ParameterBuatDiagramKlas extends ParameterBuatIsiProyek {
  koleksiElemenKlas?: ElemenKlas[]
}
