import { ElemenKlas } from './ElemenKlas'
import { Klas } from './Klas'
import { Model } from './Model'

export class DiagramKlas extends Model {
  koleksiElemenKlas: ElemenKlas[]

  constructor(parameter: ParameterBuatDiagramKlas = {}) {
    super({
      nama: parameter.nama ?? 'DiagramKlas1'
    })
    this.koleksiElemenKlas = parameter.koleksiElemenKlas ?? []
  }

  tambahElemenKlasBaru(klas: Klas): ElemenKlas {
    const elemenKlas = new ElemenKlas({ klas: klas })
    this.koleksiElemenKlas.push(elemenKlas)
    return elemenKlas
  }

  terapkanPerubahanKlas(indeks: number): void {
    this.koleksiElemenKlas[indeks] = this.koleksiElemenKlas[indeks].buatKlona()
  }

  // hapus
  hapusElemenKlas(indeks: number): void {
    this.koleksiElemenKlas.splice(indeks, 1)
  }
}

interface ParameterBuatDiagramKlas {
  nama?: string
  koleksiElemenKlas?: ElemenKlas[]
}
