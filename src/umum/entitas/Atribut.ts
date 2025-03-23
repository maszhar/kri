export class Atribut {
  nama: string

  constructor(parameter: ParameterBuatAtribut) {
    this.nama = parameter.nama
  }

  bungkusData(): any {
    return {
      nama: this.nama
    }
  }

  static bongkarBungkusanData(data: any): Atribut {
    return new Atribut({ nama: data.nama })
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
