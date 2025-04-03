export class ParameterOperasi {
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

  static bongkarBungkusanData(data: any): ParameterOperasi {
    return new ParameterOperasi({
      nama: data.nama,
      tipe: data.tipe
    })
  }
}

export interface ParameterBuatAtribut {
  nama: string
  tipe?: string
}
