import { AtributPb } from '../proto/kri'
import {
  Visibilitas,
  visibilitasDariProto,
  visibilitasDariSimbol,
  visibilitasKeProto,
  visibilitasKeSimbol
} from '../tipe/Visibilitas'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { RentangMultiplisitas } from './RentangMultiplisitas'

export class Atribut extends IsiProyek {
  protected visibilitas: Visibilitas
  protected diwariskan: boolean
  protected rentangMultiplisitasDiatur: boolean
  protected rentangMultiplisitas: RentangMultiplisitas
  protected tipe?: string
  protected bawaan?: string

  protected sebagaiId: boolean
  protected bacaSaja: boolean
  protected selaluTulisKeunikan: boolean
  protected unik: boolean
  protected tuliskanKeterurutan: boolean
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
    this.diwariskan = parameter.diwariskan ?? false
    this.rentangMultiplisitasDiatur = parameter.rentangMultiplisitas !== undefined
    this.rentangMultiplisitas = parameter.rentangMultiplisitas ?? new RentangMultiplisitas()
    this.tipe = parameter.tipe
    this.bawaan = parameter.bawaan

    this.sebagaiId = parameter.sebagaiId ?? false
    this.bacaSaja = parameter.bacaSaja ?? false
    this.selaluTulisKeunikan = parameter.selaluTulisKeunikan ?? false
    this.unik = parameter.unik ?? false
    this.tuliskanKeterurutan = parameter.tuliskanKeterurutan ?? false
    this.terurut = parameter.terurut ?? false
    this.urutan = parameter.urutan ?? false
  }

  toString(): string {
    let hasil = ''
    if (this.visibilitas !== Visibilitas.TIDAK_DIATUR) {
      hasil += `${visibilitasKeSimbol(this.visibilitas)} `
    }
    if (this.diwariskan) {
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

    if (this.tuliskanKeterurutan) {
      if (this.terurut) {
        koleksiTeksPemodifikasi.push('ordered')
      } else {
        koleksiTeksPemodifikasi.push('unordered')
      }
    }

    if (this.unik) {
      koleksiTeksPemodifikasi.push('unique')
    } else if (this.selaluTulisKeunikan) {
      koleksiTeksPemodifikasi.push('nonunique')
    }

    if (this.urutan) {
      koleksiTeksPemodifikasi.push('sequence')
    }

    if (this.sebagaiId) {
      koleksiTeksPemodifikasi.push('id')
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
    this.diwariskan = diwariskan
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

  aturTuliskanKeterurutan(tuliskanKeterurutan: boolean): void {
    this.tuliskanKeterurutan = tuliskanKeterurutan
  }

  aturTerurut(terurut: boolean): void {
    this.terurut = terurut
  }

  aturUrutan(urutan: boolean): void {
    this.urutan = urutan
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
      let urutan = false
      let terurut = false
      let tuliskanKeterurutan = false

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
          urutan = false
        } else if (
          isiTeksPemodifikasiKecil === 'nonunique' ||
          isiTeksPemodifikasiKecil === 'tidakunik'
        ) {
          selaluTulisKeunikan = true
          unik = false
        } else if (
          isiTeksPemodifikasiKecil === 'ordered' ||
          isiTeksPemodifikasiKecil === 'order' ||
          isiTeksPemodifikasiKecil === 'terurut'
        ) {
          tuliskanKeterurutan = true
          terurut = true
        } else if (
          isiTeksPemodifikasiKecil === 'unordered' ||
          isiTeksPemodifikasiKecil === 'unorder' ||
          isiTeksPemodifikasiKecil === 'nonordered' ||
          isiTeksPemodifikasiKecil === 'nonorder' ||
          isiTeksPemodifikasiKecil === 'tidakterurut'
        ) {
          tuliskanKeterurutan = true
          terurut = false
        } else if (
          isiTeksPemodifikasiKecil === 'sequence' ||
          isiTeksPemodifikasiKecil === 'seq' ||
          isiTeksPemodifikasiKecil === 'urutan'
        ) {
          urutan = true
          unik = false
          terurut = true
        }
      }

      this.aturBacaSaja(bacaSaja)
      this.aturSebagaiId(sebagaiId)
      this.aturUnik(unik)
      this.aturSelaluTulisKeunikan(selaluTulisKeunikan)
      this.aturTerurut(terurut)
      this.aturTuliskanKeterurutan(tuliskanKeterurutan)
      this.aturUrutan(urutan)

      teksTersisa = teksTersisa.slice(0, indeksSimbolBukaPemodifikasi).trim()
    } else {
      if (this.aturBacaSaja) this.aturBacaSaja(false)
      if (this.aturSebagaiId) this.aturSebagaiId(false)
      if (this.aturUnik) this.aturUnik(false)
      if (this.aturSelaluTulisKeunikan) this.aturSelaluTulisKeunikan(false)
      if (this.terurut) this.aturTerurut(false)
      if (this.tuliskanKeterurutan) this.aturTuliskanKeterurutan(false)
      if (this.urutan) this.aturUrutan(false)
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
      ...super.serialisasi(),
      visibilitas: this.visibilitas,
      diwariskan: this.diwariskan,
      rentangMultiplisitasDiatur: this.rentangMultiplisitasDiatur,
      rentangMultiplisitas: this.rentangMultiplisitas,
      tipe: this.tipe,
      bawaan: this.bawaan,
      sebagaiId: this.sebagaiId,
      bacaSaja: this.bacaSaja,
      selaluTulisKeunikan: this.selaluTulisKeunikan,
      unik: this.unik,
      tuliskanKeterurutan: this.tuliskanKeterurutan,
      terurut: this.terurut,
      urutan: this.urutan
    }
  }

  static override deserialisasi(
    data: any,
    objekLama?: Atribut,
    validasiNamaBaru?: (nama: string, atribut: Atribut) => void
  ): IsiProyek {
    const atribut = objekLama ?? new Atribut({}, validasiNamaBaru!)
    super.deserialisasi(data, atribut)
    atribut.aturVisibilitas(data.visibilitas)
    atribut.aturDiwariskan(data.diwariskan)
    atribut.aturRentangMultiplisitasDiatur(data.rentangMultiplisitasDiatur)
    atribut.aturRentangMultiplisitas(RentangMultiplisitas.deserialisasi(data.rentangMultiplisitas))
    atribut.aturTipe(data.tipe)
    atribut.aturBawaan(data.bawaan)
    atribut.aturSebagaiId(data.sebagaiId)
    atribut.aturBacaSaja(data.bacaSaja)
    atribut.aturSelaluTulisKeunikan(data.selaluTulisKeunikan)
    atribut.aturUnik(data.unik)
    atribut.aturTuliskanKeterurutan(data.tuliskanKeterurutan)
    atribut.aturTerurut(data.terurut)
    atribut.aturUrutan(data.urutan)
    return atribut
  }

  keProto(): AtributPb {
    return {
      id: this.id,
      nama: this.nama,
      bacaSaja: this.bacaSaja,
      diwariskan: this.diwariskan,
      sebagaiId: this.sebagaiId,
      selaluTulisKeunikan: this.selaluTulisKeunikan,
      terurut: this.terurut,
      tuliskanKeterurutan: this.tuliskanKeterurutan,
      unik: this.unik,
      urutan: this.urutan,
      visibilitas: visibilitasKeProto(this.visibilitas),
      bawaan: this.bawaan,
      rentangMultiplisitas: this.rentangMultiplisitas.keProto(),
      tipe: this.tipe
    }
  }

  static dariProto(
    proto: AtributPb,
    validasiNamaBaru: (nama: string, atribut: Atribut) => void
  ): Atribut {
    return new Atribut(
      {
        id: proto.id,
        nama: proto.nama,
        visibilitas: visibilitasDariProto(proto.visibilitas),
        diwariskan: proto.diwariskan,
        rentangMultiplisitas: proto.rentangMultiplisitas
          ? RentangMultiplisitas.dariProto(proto.rentangMultiplisitas)
          : new RentangMultiplisitas(),
        tipe: proto.tipe,
        bawaan: proto.bawaan,
        sebagaiId: proto.sebagaiId,
        bacaSaja: proto.bacaSaja,
        selaluTulisKeunikan: proto.selaluTulisKeunikan,
        unik: proto.unik,
        tuliskanKeterurutan: proto.tuliskanKeterurutan,
        terurut: proto.terurut,
        urutan: proto.urutan
      },
      validasiNamaBaru
    )
  }
}

export interface ParameterBuatAtribut extends ParameterBuatIsiProyek {
  visibilitas?: Visibilitas
  diwariskan?: boolean
  rentangMultiplisitas?: RentangMultiplisitas
  tipe?: string
  bawaan?: string
  sebagaiId?: boolean
  bacaSaja?: boolean
  selaluTulisKeunikan?: boolean
  unik?: boolean
  tuliskanKeterurutan?: boolean
  terurut?: boolean
  urutan?: boolean
}
