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
}

interface ParameterBuatElemenKlas {
  klas: Klas
  posisi?: Koordinat
}
