import { ArahParameter } from '../tipe/ArahParameter'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { RentangMultiplisitas } from './RentangMultiplisitas'

export class ParameterOperasi extends IsiProyek {
  protected arahDiatur: boolean
  protected arah: ArahParameter
  protected tipe?: string
  protected rentangMultiplisitasDiatur: boolean
  protected rentangMultiplisitas: RentangMultiplisitas
  protected bawaan?: string

  protected selaluTulisKeunikan: boolean
  protected unik: boolean
  protected tuliskanKeterurutan: boolean
  protected terurut: boolean
  protected urutan: boolean

  constructor(parameter: ParameterBuatParameterOperasi) {
    super({
      ...parameter,
      nama: parameter.nama ?? 'parameterBaru'
    })
    this.arahDiatur = parameter.arahDiatur ?? false
    this.arah = parameter.arah ?? ArahParameter.MASUK
    this.tipe = parameter.tipe
    this.rentangMultiplisitasDiatur = parameter.rentangMultiplisitasDiatur ?? false
    this.rentangMultiplisitas = parameter.rentangMultiplisitas ?? new RentangMultiplisitas()
    this.bawaan = parameter.bawaan
    this.selaluTulisKeunikan = parameter.selaluTulisKeunikan ?? false
    this.unik = parameter.unik ?? false
    this.tuliskanKeterurutan = parameter.tuliskanKeterurutan ?? false
    this.terurut = parameter.terurut ?? false
    this.urutan = parameter.urutan ?? false
  }

  toString(): string {
    let hasil = ''
    if (this.arahDiatur) {
      switch (this.arah) {
        case ArahParameter.MASUK:
          hasil += 'in '
          break
        case ArahParameter.KELUAR:
          hasil += 'out '
          break
        case ArahParameter.MASUK_KELUAR:
          hasil += 'inout '
          break
      }
    }

    hasil += this.nama

    if (this.tipe) {
      hasil += `: ${this.tipe}`
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

    // properti parameter
    const koleksiTeksPropertiParameter: string[] = []

    if (this.tuliskanKeterurutan) {
      if (this.terurut) {
        koleksiTeksPropertiParameter.push('ordered')
      } else {
        koleksiTeksPropertiParameter.push('unordered')
      }
    }

    if (this.unik) {
      koleksiTeksPropertiParameter.push('unique')
    } else if (this.selaluTulisKeunikan) {
      koleksiTeksPropertiParameter.push('nonunique')
    }

    if (this.urutan) {
      koleksiTeksPropertiParameter.push('sequence')
    }

    if (koleksiTeksPropertiParameter.length > 0) {
      hasil += ' {'
      hasil += koleksiTeksPropertiParameter.join(', ')
      hasil += '}'
    }

    return hasil
  }

  aturDariTeks(teks: string): boolean {
    let teksTersisa = teks.trim()

    // deteksi arah parameter
    const frasaIn = 'in '
    const frasaOut = 'out '
    const frasaInOut = 'inout '

    if (new RegExp(`^${frasaIn}`).test(teksTersisa)) {
      this.arah = ArahParameter.MASUK
      this.arahDiatur = true
      teksTersisa = teksTersisa.slice(frasaIn.length).trim()
    } else if (new RegExp(`^${frasaOut}`).test(teksTersisa)) {
      this.arah = ArahParameter.KELUAR
      this.arahDiatur = true
      teksTersisa = teksTersisa.slice(frasaOut.length).trim()
    } else if (new RegExp(`^${frasaInOut}`).test(teksTersisa)) {
      this.arah = ArahParameter.MASUK_KELUAR
      this.arahDiatur = true
      teksTersisa = teksTersisa.slice(frasaInOut.length).trim()
    } else {
      this.arah = ArahParameter.MASUK
      this.arahDiatur = false
    }

    // deteksi properti parameter
    const indeksSimbolTutupPropertiParameter = teksTersisa.lastIndexOf('}')
    let indeksSimbolBukaPropertiParameter = -1
    if (indeksSimbolTutupPropertiParameter !== -1) {
      indeksSimbolBukaPropertiParameter = teksTersisa.lastIndexOf('{')
    }
    if (
      indeksSimbolBukaPropertiParameter !== -1 &&
      indeksSimbolTutupPropertiParameter !== -1 &&
      indeksSimbolTutupPropertiParameter - indeksSimbolBukaPropertiParameter > 1
    ) {
      const teksPropertiParameter = teksTersisa
        .slice(indeksSimbolBukaPropertiParameter + 1, indeksSimbolTutupPropertiParameter)
        .trim()
      const pecahanTeksPropertiParameter = teksPropertiParameter.split(',')
      for (const isiTeksPropertiParameterMentah of pecahanTeksPropertiParameter) {
        const isiTeksPropertiParameter = isiTeksPropertiParameterMentah.trim()
        const isiTeksPropertiOperasiKecil = isiTeksPropertiParameter.toLowerCase()

        if (isiTeksPropertiOperasiKecil === 'unique' || isiTeksPropertiOperasiKecil === 'unik') {
          this.selaluTulisKeunikan = false
          this.unik = true
          this.urutan = false
        } else if (
          isiTeksPropertiOperasiKecil === 'nonunique' ||
          isiTeksPropertiOperasiKecil === 'tidakunik'
        ) {
          this.selaluTulisKeunikan = true
          this.unik = false
        } else if (
          isiTeksPropertiOperasiKecil === 'ordered' ||
          isiTeksPropertiOperasiKecil === 'order' ||
          isiTeksPropertiOperasiKecil === 'terurut'
        ) {
          this.tuliskanKeterurutan = true
          this.terurut = true
        } else if (
          isiTeksPropertiOperasiKecil === 'unordered' ||
          isiTeksPropertiOperasiKecil === 'unorder' ||
          isiTeksPropertiOperasiKecil === 'nonordered' ||
          isiTeksPropertiOperasiKecil === 'nonorder' ||
          isiTeksPropertiOperasiKecil === 'tidakterurut'
        ) {
          this.tuliskanKeterurutan = true
          this.terurut = false
        } else if (
          isiTeksPropertiOperasiKecil === 'sequence' ||
          isiTeksPropertiOperasiKecil === 'seq' ||
          isiTeksPropertiOperasiKecil === 'urutan'
        ) {
          this.urutan = true
          this.unik = false
          this.terurut = true
        }
      }

      teksTersisa = teksTersisa.slice(0, indeksSimbolBukaPropertiParameter).trim()
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

      this.rentangMultiplisitasDiatur = true
      if (
        this.rentangMultiplisitas.dapatkanMinimal() !== minimal ||
        this.rentangMultiplisitas.dapatkanMaksimal() !== maksimal
      ) {
        this.rentangMultiplisitas = new RentangMultiplisitas({
          minimal: minimal,
          maksimal: maksimal
        })
      }

      teksTersisa = teksTersisa.slice(0, indeksSimbolBukaMultiplisitas).trim()
    } else {
      this.rentangMultiplisitasDiatur = false
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
      const tipe = teksTersisa
        .slice(indeksSimbolTipe + 1)
        .trim()
        .replaceAll(/[^A-Za-z0-9_]/g, '')
      this.tipe = tipe
      teksTersisa = teksTersisa.slice(0, indeksSimbolTipe).trim()
    } else {
      this.tipe = undefined
    }

    const nama = teksTersisa.replaceAll(/[^A-Za-z0-9_]/g, '')
    if (nama === '') {
      return false
    }

    this.nama = nama
    return true
  }

  serialisasi(): any {
    return {
      arahDiatur: this.arahDiatur,
      arah: this.arah,
      tipe: this.tipe,
      rentangMultiplisitasDiatur: this.rentangMultiplisitasDiatur,
      rentangMultiplisitas: this.rentangMultiplisitas.serialisasi(),
      bawaan: this.bawaan,
      selaluTulisKeunikan: this.selaluTulisKeunikan,
      unik: this.unik,
      tuliskanKeterurutan: this.tuliskanKeterurutan,
      terurut: this.terurut,
      urutan: this.urutan
    }
  }

  static deserialisasi(data: any): ParameterOperasi {
    return new ParameterOperasi({
      arahDiatur: data.arahDiatur,
      arah: data.arah,
      tipe: data.tipe,
      rentangMultiplisitasDiatur: data.rentangMultiplisitasDiatur,
      rentangMultiplisitas: RentangMultiplisitas.deserialisasi(data.rentangMultiplisitas),
      bawaan: data.bawaan,
      selaluTulisKeunikan: data.selaluTulisKeunikan,
      unik: data.unik,
      tuliskanKeterurutan: data.tuliskanKeterurutan,
      terurut: data.terurut,
      urutan: data.urutan
    })
  }
}

export interface ParameterBuatParameterOperasi extends ParameterBuatIsiProyek {
  arahDiatur?: boolean
  arah?: ArahParameter
  tipe?: string
  rentangMultiplisitasDiatur?: boolean
  rentangMultiplisitas?: RentangMultiplisitas
  bawaan?: string
  selaluTulisKeunikan?: boolean
  unik?: boolean
  tuliskanKeterurutan?: boolean
  terurut?: boolean
  urutan?: boolean
}
