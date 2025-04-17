import { Elemen } from './Elemen'
import { Kelas } from './Kelas'
import { Koordinat } from './Koordinat'

export class ElemenKlas extends Elemen {
  klas: Kelas

  constructor(parameter: ParameterBuatElemenKlas) {
    super({
      posisi: parameter.posisi
    })
    this.klas = parameter.klas
  }

  buatKlona(): ElemenKlas {
    return new ElemenKlas({
      klas: this.klas,
      posisi: this.posisi
    })
  }

  bungkusUntukAi(): any {
    /**
     * Daftar kunci :
     * p = posisi
     */
    return {
      ...this.klas.bungkusUntukAi(),
      p: this.posisi.bungkus()
    }
  }
}

export interface ParameterBuatElemenKlas {
  klas: Kelas
  posisi?: Koordinat
}
