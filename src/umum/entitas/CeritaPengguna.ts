import { Model } from './Model'

export class CeritaPengguna extends Model {
  protected cerita: string

  constructor(parameter: ParameterBuatCeritaPengguna) {
    super({
      nama: parameter.nama
    })
    this.cerita = parameter.cerita ?? ''
  }
}

export interface ParameterBuatCeritaPengguna {
  nama: string
  cerita?: string
}
