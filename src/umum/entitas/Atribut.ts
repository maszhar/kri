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

  protected sebagaiId: boolean
  protected bacaSaja: boolean
  protected selaluTulisKeunikan: boolean
  protected unik: boolean
  protected terurut: boolean
  protected urutan: boolean

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

    this.sebagaiId = parameter.sebagaiId ?? false
    this.bacaSaja = parameter.bacaSaja ?? false
    this.selaluTulisKeunikan = parameter.selaluTulisKeunikan ?? false
    this.unik = parameter.unik ?? false
    this.terurut = parameter.terurut ?? false
    this.urutan = parameter.urutan ?? false
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

    // pemodifikasi
    const koleksiTeksPemodifikasi: string[] = []

    if (this.bacaSaja) {
      koleksiTeksPemodifikasi.push('readOnly')
    }

    if (this.sebagaiId) {
      koleksiTeksPemodifikasi.push('id')
    }

    if (this.unik) {
      koleksiTeksPemodifikasi.push('unique')
    } else if (this.selaluTulisKeunikan) {
      koleksiTeksPemodifikasi.push('nonunique')
    }

    if (koleksiTeksPemodifikasi.length > 0) {
      hasil += ' {'
      hasil += koleksiTeksPemodifikasi.join(', ')
      hasil += '}'
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

  aturBacaSaja(bacaSaja: boolean): void {
    this.bacaSaja = bacaSaja
  }

  aturSebagaiId(sebagaiId: boolean): void {
    this.sebagaiId = sebagaiId
  }

  aturUnik(unik: boolean): void {
    this.unik = unik
  }

  aturSelaluTulisKeunikan(selaluTulisKeunikan: boolean): void {
    this.selaluTulisKeunikan = selaluTulisKeunikan
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

    // deteksi pemodifikasi
    const indeksSimbolTutupPemodifikasi = teksTersisa.lastIndexOf('}')
    let indeksSimbolBukaPemodifikasi = -1
    if (indeksSimbolTutupPemodifikasi !== -1) {
      indeksSimbolBukaPemodifikasi = teksTersisa.lastIndexOf('{')
    }
    if (
      indeksSimbolBukaPemodifikasi !== -1 &&
      indeksSimbolTutupPemodifikasi !== -1 &&
      indeksSimbolTutupPemodifikasi - indeksSimbolBukaPemodifikasi > 1
    ) {
      let bacaSaja = false
      let sebagaiId = false
      let selaluTulisKeunikan = false
      let unik = false

      const teksPemodifikasi = teksTersisa
        .slice(indeksSimbolBukaPemodifikasi + 1, indeksSimbolTutupPemodifikasi)
        .trim()
      const pecahanTeksPemodifikasi = teksPemodifikasi.split(',')
      for (const isiTeksPemodifikasiMentah of pecahanTeksPemodifikasi) {
        const isiTeksPemodifikasi = isiTeksPemodifikasiMentah.trim()
        const isiTeksPemodifikasiKecil = isiTeksPemodifikasi.toLowerCase()

        if (
          isiTeksPemodifikasiKecil === 'readonly' ||
          isiTeksPemodifikasiKecil === 'ro' ||
          isiTeksPemodifikasiKecil === 'bacasaja'
        ) {
          bacaSaja = true
        } else if (isiTeksPemodifikasiKecil === 'id') {
          sebagaiId = true
        } else if (isiTeksPemodifikasiKecil === 'unique' || isiTeksPemodifikasiKecil === 'unik') {
          selaluTulisKeunikan = false
          unik = true
        } else if (
          isiTeksPemodifikasiKecil === 'nonunique' ||
          isiTeksPemodifikasiKecil === 'tidakunik'
        ) {
          selaluTulisKeunikan = true
          unik = false
        }
      }

      this.aturBacaSaja(bacaSaja)
      this.aturSebagaiId(sebagaiId)
      this.aturUnik(unik)
      this.aturSelaluTulisKeunikan(selaluTulisKeunikan)

      teksTersisa = teksTersisa.slice(0, indeksSimbolBukaPemodifikasi).trim()
    } else {
      if (this.aturBacaSaja) this.aturBacaSaja(false)
      if (this.aturSebagaiId) this.aturSebagaiId(false)
      if (this.aturUnik) this.aturUnik(false)
      if (this.aturSelaluTulisKeunikan) this.aturSelaluTulisKeunikan(false)
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
  sebagaiId?: boolean
  bacaSaja?: boolean
  selaluTulisKeunikan?: boolean
  unik?: boolean
  terurut?: boolean
  urutan?: boolean
}
