import { Elemen } from './Elemen'
import { Klas } from './Klas'
import { Koordinat } from './Koordinat'

export class ElemenKlas extends Elemen {
  klas: Klas

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
}

export interface ParameterBuatElemenKlas {
  klas: Klas
  posisi?: Koordinat
}
