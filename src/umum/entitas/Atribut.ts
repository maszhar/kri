export class Atribut {
  nama: string

  constructor(parameter: ParameterBuatAtribut) {
    this.nama = parameter.nama
  }

  buatKlona(): Atribut {
    return new Atribut({
      nama: this.nama
    })
  }
}

export interface ParameterBuatAtribut {
  nama: string
}
