import { Visibilitas, visibilitasDariSimbol, visibilitasKeSimbol } from '../tipe/Visibilitas'
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
      hasil += `${visibilitasKeSimbol(this.visibilitas)}`
    }

    hasil += this.nama

    // parameter
    hasil += '('
    hasil += ')'

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
      hasil += ':'

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

  aturDariTeks(teks: string): void {
    let teksTersisa = teks.trim()

    this.sebagaiQuery = false
    this.selaluTulisKeunikanKembalian = false
    this.kembalianUnik = false
    this.tuliskanKeterurutanKembalian = false
    this.kembalianTerurut = false
    this.kembalianAdalahUrutan = false
    this.tipeKembalian = undefined

    // deteksi visibilitas
    const karakterPertama = teksTersisa[0]
    if (
      karakterPertama === '+' ||
      karakterPertama === '-' ||
      karakterPertama === '#' ||
      karakterPertama === '~'
    ) {
      this.visibilitas = visibilitasDariSimbol(karakterPertama)
      teksTersisa = teksTersisa.slice(1).trim()
    } else {
      this.visibilitas = Visibilitas.TIDAK_DIATUR
    }

    // deteksi pengapit parameter
    const indeksSimbolBukaParameter = teksTersisa.indexOf('(')
    const indeksSimbolTutupParameter = teksTersisa.lastIndexOf(')')

    if (
      indeksSimbolBukaParameter !== -1 &&
      indeksSimbolTutupParameter !== -1 &&
      indeksSimbolTutupParameter > indeksSimbolBukaParameter
    ) {
      const indeksSimbolTitikDua = teksTersisa.indexOf(':')

      if (indeksSimbolTitikDua !== -1 && indeksSimbolTitikDua > indeksSimbolTutupParameter) {
        // deteksi properti operasi
        const indeksSimbolTutupPropertiOperasi = teksTersisa.lastIndexOf('}')
        let indeksSimbolBukaPropertiOperasi = -1
        if (indeksSimbolTutupPropertiOperasi !== -1) {
          indeksSimbolBukaPropertiOperasi = teksTersisa.lastIndexOf('{')
        }
        if (
          indeksSimbolBukaPropertiOperasi !== -1 &&
          indeksSimbolTutupPropertiOperasi !== -1 &&
          indeksSimbolTutupPropertiOperasi - indeksSimbolBukaPropertiOperasi > 1 &&
          indeksSimbolBukaPropertiOperasi > indeksSimbolTitikDua
        ) {
          const teksPropertiOperasi = teksTersisa
            .slice(indeksSimbolBukaPropertiOperasi + 1, indeksSimbolTutupPropertiOperasi)
            .trim()
          const pecahanTeksPropertiOperasi = teksPropertiOperasi.split(',')
          for (const isiTeksPemodifikasiMentah of pecahanTeksPropertiOperasi) {
            const isiTeksPropertiOperasi = isiTeksPemodifikasiMentah.trim()
            const isiTeksPropertiOperasiKecil = isiTeksPropertiOperasi.toLowerCase()

            if (isiTeksPropertiOperasiKecil === 'query') {
              this.sebagaiQuery = true
            } else if (
              isiTeksPropertiOperasiKecil === 'unique' ||
              isiTeksPropertiOperasiKecil === 'unik'
            ) {
              this.selaluTulisKeunikanKembalian = false
              this.kembalianUnik = true
              this.kembalianAdalahUrutan = false
            } else if (
              isiTeksPropertiOperasiKecil === 'nonunique' ||
              isiTeksPropertiOperasiKecil === 'tidakunik'
            ) {
              this.selaluTulisKeunikanKembalian = true
              this.kembalianUnik = false
            } else if (
              isiTeksPropertiOperasiKecil === 'ordered' ||
              isiTeksPropertiOperasiKecil === 'order' ||
              isiTeksPropertiOperasiKecil === 'terurut'
            ) {
              this.tuliskanKeterurutanKembalian = true
              this.kembalianTerurut = true
            } else if (
              isiTeksPropertiOperasiKecil === 'unordered' ||
              isiTeksPropertiOperasiKecil === 'unorder' ||
              isiTeksPropertiOperasiKecil === 'nonordered' ||
              isiTeksPropertiOperasiKecil === 'nonorder' ||
              isiTeksPropertiOperasiKecil === 'tidakterurut'
            ) {
              this.tuliskanKeterurutanKembalian = true
              this.kembalianTerurut = false
            } else if (
              isiTeksPropertiOperasiKecil === 'sequence' ||
              isiTeksPropertiOperasiKecil === 'seq' ||
              isiTeksPropertiOperasiKecil === 'urutan'
            ) {
              this.kembalianAdalahUrutan = true
              this.kembalianUnik = false
              this.kembalianTerurut = true
            }
          }

          teksTersisa = teksTersisa.slice(0, indeksSimbolBukaPropertiOperasi).trim()
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
          indeksSimbolTutupMultiplisitas - indeksSimbolBukaMultiplisitas > 1 &&
          indeksSimbolBukaMultiplisitas > indeksSimbolTitikDua
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

          this.rentangMultiplisitasKembalianDiatur = true
          if (
            this.rentangMultiplisitasKembalian.dapatkanMinimal() !== minimal ||
            this.rentangMultiplisitasKembalian.dapatkanMaksimal() !== maksimal
          ) {
            this.rentangMultiplisitasKembalian = new RentangMultiplisitas({
              minimal: minimal,
              maksimal: maksimal
            })
          }

          teksTersisa = teksTersisa.slice(0, indeksSimbolBukaMultiplisitas).trim()
        } else {
          this.rentangMultiplisitasKembalianDiatur = false
          if (
            this.rentangMultiplisitasKembalian.dapatkanMaksimal() !== 1 &&
            this.rentangMultiplisitasKembalian.dapatkanMinimal() !== 1
          ) {
            this.rentangMultiplisitasKembalian = new RentangMultiplisitas()
          }
        }

        // deteksi tipe
        const tipe = teksTersisa
          .slice(indeksSimbolTitikDua + 1)
          .trim()
          .replaceAll(/[^A-Za-z0-9_]/g, '')
        this.tipeKembalian = tipe
        teksTersisa = teksTersisa.slice(0, indeksSimbolTitikDua).trim()
      }

      teksTersisa = teksTersisa.slice(0, indeksSimbolBukaParameter).trim()
    }

    const nama = teksTersisa.replaceAll(/[^A-Za-z0-9_]/g, '')
    this.validasiNamaBaru(nama, this)
    this.nama = nama
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
