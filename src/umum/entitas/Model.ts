export class Model {
  public nama: string

  constructor(parameter: ParameterBuatModel = {}) {
    this.nama = parameter.nama ?? ''
  }

  aturNama(nama: string): void {
    this.nama = nama
  }
}

interface ParameterBuatModel {
  nama?: string
}
