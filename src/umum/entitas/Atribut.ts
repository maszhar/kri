import { Visibilitas, visibilitasKeSimbol } from '../tipe/Visibilitas'
import { ElemenBernama, ParameterBuatElemenBernama } from './ElemenBernama'
import { RentangMultiplisitas } from './RentangMultiplisitas'

export class Atribut extends ElemenBernama {
  protected visibilitas: Visibilitas
  protected diwarisankan: boolean
  protected rentangMultiplisitas: RentangMultiplisitas
  protected tipe?: string
  protected bawaan?: string

  constructor(parameter: ParameterBuatAtribut) {
    super({
      ...parameter,
      nama: parameter.nama ?? 'atributBaru'
    })

    this.visibilitas = parameter.visibilitas ?? Visibilitas.PRIVATE
    this.diwarisankan = parameter.diwariskan ?? false
    this.rentangMultiplisitas = parameter.rentangMultiplisitas ?? new RentangMultiplisitas()
    this.tipe = parameter.tipe
    this.bawaan = parameter.bawaan
  }

  toString(): string {
    let hasil = ''
    if (this.visibilitas !== Visibilitas.TIDAK_DIATUR) {
      hasil += `${visibilitasKeSimbol(this.visibilitas)} `
    }
    if (this.diwarisankan) {
      hasil += '/ '
    }
    hasil += this.nama
    if (this.tipe) {
      hasil += ` : ${this.tipe}`
    }
    hasil += ` ${this.rentangMultiplisitas.toString()}`

    if (this.bawaan) {
      hasil += ` = ${this.bawaan}`
    }

    return hasil
  }

  serialisasi(): any {
    return {
      id: this.id,
      visibilitas: this.visibilitas,
      diwariskan: this.diwarisankan,
      nama: this.nama,
      rentangMultiplisitas: this.rentangMultiplisitas.serialisasi(),
      tipe: this.tipe,
      bawaan: this.bawaan
    }
  }

  static deserialisasi(data: any): Atribut {
    return new Atribut({
      id: data.id,
      visibilitas: data.visibilitas as Visibilitas,
      diwariskan: data.diwariskan,
      nama: data.nama,
      rentangMultiplisitas: RentangMultiplisitas.deserialisasi(data.rentangMultiplisitas),
      tipe: data.tipe,
      bawaan: data.bawaan
    })
  }
}

export interface ParameterBuatAtribut extends ParameterBuatElemenBernama {
  nama: string
  visibilitas?: Visibilitas
  diwariskan?: boolean
  rentangMultiplisitas?: RentangMultiplisitas
  tipe?: string
  bawaan?: string
}
