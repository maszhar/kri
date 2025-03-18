export class Model {
  public nama: string

  constructor(parameter: ParameterBuatModel = {}) {
    this.nama = parameter.nama ?? ''
  }
}

interface ParameterBuatModel {
  nama?: string
}
