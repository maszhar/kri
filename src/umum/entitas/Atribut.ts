import { Visibilitas, visibilitasDariSimbol, visibilitasKeSimbol } from '../tipe/Visibilitas'
import { ElemenBernama, ParameterBuatElemenBernama } from './ElemenBernama'
import { RentangMultiplisitas } from './RentangMultiplisitas'

export class Atribut extends ElemenBernama {
  protected visibilitas: Visibilitas
  protected diwarisankan: boolean
  protected rentangMultiplisitasDiatur: boolean
  protected rentangMultiplisitas: RentangMultiplisitas
  protected tipe?: string
  protected bawaan?: string

  constructor(
    parameter: ParameterBuatAtribut,
    private validasiNamaBaru: (nama: string, atribut: Atribut) => void
  ) {
    super({
      ...parameter,
      nama: parameter.nama ?? 'atributBaru'
    })

    this.visibilitas = parameter.visibilitas ?? Visibilitas.TIDAK_DIATUR
    this.diwarisankan = parameter.diwariskan ?? false
    this.rentangMultiplisitasDiatur = parameter.rentangMultiplisitas !== undefined
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

    if (
      this.rentangMultiplisitasDiatur ||
      this.rentangMultiplisitas.dapatkanMinimal() !== 1 ||
      this.rentangMultiplisitas.dapatkanMaksimal() !== 1
    )
      hasil += ` ${this.rentangMultiplisitas.toString()}`

    if (this.bawaan) {
      hasil += ` = ${this.bawaan}`
    }

    return hasil
  }

  aturVisibilitas(visibilitas: Visibilitas): void {
    this.visibilitas = visibilitas
  }

  aturDariTeks(teks: string): void {
    let teksTersisa = teks.trim()

    const karakterPertama = teksTersisa[0]
    if (
      karakterPertama === '+' ||
      karakterPertama === '-' ||
      karakterPertama === '#' ||
      karakterPertama === '~'
    ) {
      this.aturVisibilitas(visibilitasDariSimbol(karakterPertama))
      teksTersisa = teksTersisa.slice(1).trim()
    } else {
      this.aturVisibilitas(Visibilitas.TIDAK_DIATUR)
    }

    const nama = teksTersisa.replaceAll(/[^A-Za-z0-9_]/g, '')
    this.validasiNamaBaru(nama, this)
    this.aturNama(nama)
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

  static deserialisasi(
    data: any,
    validasiNamaBaru: (nama: string, atribut: Atribut) => void
  ): Atribut {
    return new Atribut(
      {
        id: data.id,
        visibilitas: data.visibilitas as Visibilitas,
        diwariskan: data.diwariskan,
        nama: data.nama,
        rentangMultiplisitas: RentangMultiplisitas.deserialisasi(data.rentangMultiplisitas),
        tipe: data.tipe,
        bawaan: data.bawaan
      },
      validasiNamaBaru
    )
  }
}

export interface ParameterBuatAtribut extends ParameterBuatElemenBernama {
  nama?: string
  visibilitas?: Visibilitas
  diwariskan?: boolean
  rentangMultiplisitas?: RentangMultiplisitas
  tipe?: string
  bawaan?: string
}
