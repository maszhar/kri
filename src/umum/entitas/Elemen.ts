import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { Koordinat } from './Koordinat'

export class Elemen extends IsiProyek {
  public posisi: Koordinat

  constructor(parameter: ParameterBuatElemen = {}) {
    super(parameter)
    this.posisi = parameter.posisi ?? new Koordinat()
  }
}

interface ParameterBuatElemen extends ParameterBuatIsiProyek {
  posisi?: Koordinat
}
