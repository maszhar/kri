import { Visibilitas, visibilitasKeSimbol } from '../tipe/Visibilitas'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { ParameterMetode } from './ParameterMetode'
import { RentangMultiplisitas } from './RentangMultiplisitas'

export class Metode extends IsiProyek {
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
  protected koleksiParameterMetode: ParameterMetode[]

  constructor(
    parameter: ParameterBuatMetode,
    private validasiNamaBaru: (nama: string, metode: Metode) => void
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
    this.koleksiParameterMetode = parameter.koleksiParameterMetode ?? []
  }

  toString(): string {
    let hasil = ''
    if (this.visibilitas !== Visibilitas.TIDAK_DIATUR) {
      hasil += `${visibilitasKeSimbol(this.visibilitas)} `
    }

    hasil += this.nama

    // properti metode
    const koleksiTeksPropertiMetode: string[] = []

    if (this.sebagaiQuery) {
      koleksiTeksPropertiMetode.push('query')
    }

    if (this.tuliskanKeterurutanKembalian) {
      if (this.kembalianTerurut) {
        koleksiTeksPropertiMetode.push('ordered')
      } else {
        koleksiTeksPropertiMetode.push('unordered')
      }
    }

    if (this.kembalianUnik) {
      koleksiTeksPropertiMetode.push('unique')
    } else if (this.selaluTulisKeunikanKembalian) {
      koleksiTeksPropertiMetode.push('nonunique')
    }

    if (this.kembalianAdalahUrutan) {
      koleksiTeksPropertiMetode.push('sequence')
    }

    if (
      koleksiTeksPropertiMetode.length > 0 ||
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

      if (koleksiTeksPropertiMetode.length > 0) {
        hasil += ' {'
        hasil += koleksiTeksPropertiMetode.join(', ')
        hasil += '}'
      }
    }

    return hasil
  }

  serialisasi(): any {
    return {}
  }

  static deserialisasi(data: any): Metode {
    return new Metode({ visibilitas: data.visibilitas }, () => {})
  }
}

export interface ParameterBuatMetode extends ParameterBuatIsiProyek {
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
  koleksiParameterMetode?: ParameterMetode[]
}
