export class Atribut {
  nama: string

  constructor(parameter: ParameterBuatAtribut) {
    this.nama = parameter.nama
  }
}

export interface ParameterBuatAtribut {
  nama: string
}
