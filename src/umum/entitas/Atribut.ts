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

  aturDiwariskan(diwariskan: boolean): void {
    this.diwarisankan = diwariskan
  }

  aturBawaan(bawaan?: string): void {
    this.bawaan = bawaan
  }

  aturRentangMultiplisitasDiatur(diatur: boolean): void {
    this.rentangMultiplisitasDiatur = diatur
  }

  aturRentangMultiplisitas(rentangMultiplisitas: RentangMultiplisitas): void {
    this.rentangMultiplisitas = rentangMultiplisitas
  }

  aturTipe(tipe?: string): void {
    this.tipe = tipe
  }

  aturDariTeks(teks: string): void {
    let teksTersisa = teks.trim()

    // deteksi visibilitas
    let karakterPertama = teksTersisa[0]
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

    // deteksi diwariskan
    karakterPertama = teksTersisa[0]
    if (karakterPertama === '/') {
      this.aturDiwariskan(true)
      teksTersisa = teksTersisa.slice(1).trim()
    } else {
      this.aturDiwariskan(false)
    }

    // deteksi bawaan
    const indeksSimbolBawaan = teksTersisa.indexOf('=')
    if (indeksSimbolBawaan !== -1 && teksTersisa.length > indeksSimbolBawaan + 1) {
      const bawaan = teksTersisa.slice(indeksSimbolBawaan + 1).trim()
      this.aturBawaan(bawaan)
      teksTersisa = teksTersisa.slice(0, indeksSimbolBawaan).trim()
    } else {
      this.aturBawaan()
    }

    // deteksi rentang multiplisitas
    const indeksSimbolTutupMultiplisitas = teksTersisa.lastIndexOf(']')
    let indeksSimbolBukaMultiplisitas = -1
    if (indeksSimbolTutupMultiplisitas !== -1) {
      indeksSimbolBukaMultiplisitas = teksTersisa.lastIndexOf('[')
    }

    if (
      indeksSimbolBukaMultiplisitas !== -1 &&
      indeksSimbolTutupMultiplisitas !== -1 &&
      indeksSimbolTutupMultiplisitas - indeksSimbolBukaMultiplisitas > 1
    ) {
      const teksMultiplisitas = teksTersisa.slice(
        indeksSimbolBukaMultiplisitas + 1,
        indeksSimbolTutupMultiplisitas
      )
      const pecahanTeksMultiplisitas = teksMultiplisitas.split('..')

      const pindaiNilaiMultiplisitas = (teksNilai: string): number | null => {
        if (teksNilai === '*') {
          return null
        }
        const hasil = parseInt(teksNilai)
        if (isNaN(hasil)) {
          return 1
        } else {
          return hasil
        }
      }

      let minimal: number | null = null
      let maksimal: number | null = null

      minimal = pindaiNilaiMultiplisitas(pecahanTeksMultiplisitas[0].trim())
      if (pecahanTeksMultiplisitas.length === 1) {
        maksimal = minimal
      } else {
        maksimal = pindaiNilaiMultiplisitas(pecahanTeksMultiplisitas[1].trim())
      }

      this.aturRentangMultiplisitasDiatur(true)
      if (
        this.rentangMultiplisitas.dapatkanMinimal() !== minimal ||
        this.rentangMultiplisitas.dapatkanMaksimal() !== maksimal
      ) {
        this.aturRentangMultiplisitas(
          new RentangMultiplisitas({
            minimal: minimal,
            maksimal: maksimal
          })
        )
      }

      teksTersisa = teksTersisa.slice(0, indeksSimbolBukaMultiplisitas).trim()
    } else {
      this.aturRentangMultiplisitasDiatur(false)
      if (
        this.rentangMultiplisitas.dapatkanMaksimal() !== 1 &&
        this.rentangMultiplisitas.dapatkanMinimal() !== 1
      ) {
        this.rentangMultiplisitas = new RentangMultiplisitas()
      }
    }

    // deteksi tipe
    const indeksSimbolTipe = teksTersisa.lastIndexOf(':')
    if (indeksSimbolTipe !== -1) {
      const tipe = teksTersisa.slice(indeksSimbolTipe + 1).trim()
      this.aturTipe(tipe)
      teksTersisa = teksTersisa.slice(0, indeksSimbolTipe).trim()
    } else {
      this.aturTipe()
    }

    const nama = teksTersisa.replaceAll(/[^A-Za-z0-9_]/g, '')
    if (nama === '') {
      throw new Error('Nama tidak boleh kosong')
    }
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
