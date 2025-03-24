export class Atribut {
  nama: string
  tipe?: string

  constructor(parameter: ParameterBuatAtribut) {
    this.nama = parameter.nama
    this.tipe = parameter.tipe
  }

  bungkusData(): any {
    return {
      nama: this.nama,
      tipe: this.tipe
    }
  }

  static bongkarBungkusanData(data: any): Atribut {
    return new Atribut({
      nama: data.nama,
      tipe: data.tipe
    })
  }

  buatKlona(): Atribut {
    return new Atribut({
      nama: this.nama,
      tipe: this.tipe
    })
  }
}

export interface ParameterBuatAtribut {
  nama: string
  tipe?: string
}
