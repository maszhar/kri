export class Komponen {
  public id: number
  public nama: string

  constructor(parameter: ParameterBuatKomponen = {}) {
    this.id = parameter.id || 0
    this.nama = parameter.nama || 'KomponenBaru'
  }
}

interface ParameterBuatKomponen {
  id?: number
  nama?: string
}
