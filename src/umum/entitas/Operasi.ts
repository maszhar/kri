import { Visibilitas, visibilitasKeSimbol } from '../tipe/Visibilitas'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { ParameterOperasi } from './ParameterOperasi'
import { RentangMultiplisitas } from './RentangMultiplisitas'

export class Operasi extends IsiProyek {
  protected visibilitas: Visibilitas
  protected tipeKembalian?: string
  protected rentangMultiplisitasKembalianDiatur: boolean
  protected rentangMultiplisitasKembalian: RentangMultiplisitas
  protected sebagaiQuery: boolean
  protected selaluTulisKeunikanKembalian: boolean
  protected kembalianUnik: boolean
  protected tuliskanKeterurutanKembalian: boolean
  protected kembalianTerurut: boolean
  protected kembalianAdalahUrutan: boolean
  protected koleksiParameterOperasi: ParameterOperasi[]

  constructor(
    parameter: ParameterBuatOperasi,
    private validasiNamaBaru: (nama: string, operasi: Operasi) => void
  ) {
    super(parameter)

    this.visibilitas = parameter.visibilitas ?? Visibilitas.TIDAK_DIATUR
    this.tipeKembalian = parameter.tipeKembalian
    this.rentangMultiplisitasKembalianDiatur =
      parameter.rentangMultiplisitasKembalianDiatur ?? false
    this.rentangMultiplisitasKembalian =
      parameter.rentangMultiplisitasKembalian ?? new RentangMultiplisitas()
    this.sebagaiQuery = parameter.sebagaiQuery ?? false
    this.selaluTulisKeunikanKembalian = parameter.selaluTulisKeunikanKembalian ?? false
    this.kembalianUnik = parameter.kembalianUnik ?? false
    this.tuliskanKeterurutanKembalian = parameter.tuliskanKeterurutanKembalian ?? false
    this.kembalianTerurut = parameter.kembalianTerurut ?? false
    this.kembalianAdalahUrutan = parameter.kembalianAdalahUrutan ?? false
    this.koleksiParameterOperasi = parameter.koleksiParameterOperasi ?? []
  }

  toString(): string {
    let hasil = ''
    if (this.visibilitas !== Visibilitas.TIDAK_DIATUR) {
      hasil += `${visibilitasKeSimbol(this.visibilitas)} `
    }

    hasil += this.nama

    // properti operasi
    const koleksiTeksPropertiOperasi: string[] = []

    if (this.sebagaiQuery) {
      koleksiTeksPropertiOperasi.push('query')
    }

    if (this.tuliskanKeterurutanKembalian) {
      if (this.kembalianTerurut) {
        koleksiTeksPropertiOperasi.push('ordered')
      } else {
        koleksiTeksPropertiOperasi.push('unordered')
      }
    }

    if (this.kembalianUnik) {
      koleksiTeksPropertiOperasi.push('unique')
    } else if (this.selaluTulisKeunikanKembalian) {
      koleksiTeksPropertiOperasi.push('nonunique')
    }

    if (this.kembalianAdalahUrutan) {
      koleksiTeksPropertiOperasi.push('sequence')
    }

    if (
      koleksiTeksPropertiOperasi.length > 0 ||
      this.rentangMultiplisitasKembalianDiatur ||
      this.rentangMultiplisitasKembalian.dapatkanMinimal() !== 1 ||
      this.rentangMultiplisitasKembalian.dapatkanMaksimal() !== 1 ||
      this.tipeKembalian
    ) {
      hasil += ' :'

      if (this.tipeKembalian) {
        hasil += ` ${this.tipeKembalian}`
      }

      if (
        this.rentangMultiplisitasKembalianDiatur ||
        this.rentangMultiplisitasKembalian.dapatkanMinimal() !== 1 ||
        this.rentangMultiplisitasKembalian.dapatkanMaksimal() !== 1
      ) {
        hasil += ` ${this.rentangMultiplisitasKembalian.toString()}`
      }

      if (koleksiTeksPropertiOperasi.length > 0) {
        hasil += ' {'
        hasil += koleksiTeksPropertiOperasi.join(', ')
        hasil += '}'
      }
    }

    return hasil
  }

  serialisasi(): any {
    return {}
  }

  static deserialisasi(data: any): Operasi {
    return new Operasi({ visibilitas: data.visibilitas }, () => {})
  }
}

export interface ParameterBuatOperasi extends ParameterBuatIsiProyek {
  visibilitas?: Visibilitas
  tipeKembalian?: string
  rentangMultiplisitasKembalianDiatur?: boolean
  rentangMultiplisitasKembalian?: RentangMultiplisitas
  sebagaiQuery?: boolean
  selaluTulisKeunikanKembalian?: boolean
  kembalianUnik?: boolean
  tuliskanKeterurutanKembalian?: boolean
  kembalianTerurut?: boolean
  kembalianAdalahUrutan?: boolean
  koleksiParameterOperasi?: ParameterOperasi[]
}
