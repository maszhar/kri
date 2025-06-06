import { GalatNamaSama } from '../galat/GalatNamaSama'
import { KelasPb } from '../proto/kri'
import { TipeElemen } from '../tipe/TipeElemen'
import { Asosiasi } from './Asosiasi'
import { Atribut, ParameterBuatAtribut } from './Atribut'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import { Operasi, ParameterBuatOperasi } from './Operasi'

export class Kelas extends IsiProyek {
  protected koleksiAtribut: Atribut[]
  protected koleksiOperasi: Operasi[]
  protected koleksiAsosiasi: Asosiasi[]

  constructor(parameter: ParameterBuatKelas = {}) {
    super({
      ...parameter,
      nama: parameter.nama || 'KelasBaru'
    })
    this.koleksiAtribut = parameter.koleksiAtribut ?? []
    this.koleksiOperasi = parameter.koleksiOperasi ?? []
    this.koleksiAsosiasi = parameter.koleksiAsosiasi ?? []
  }

  protected validasiNamaAnggota(nama: string, elemenLama?: Atribut | Operasi): void {
    const koleksiAtributTersaring =
      elemenLama && elemenLama instanceof Atribut
        ? this.koleksiAtribut.filter((atribut) => atribut !== elemenLama)
        : this.koleksiAtribut
    const atributBernamaSama = koleksiAtributTersaring.find(
      (atribut) => atribut.dapatkanNama() == nama
    )
    if (atributBernamaSama) {
      throw new GalatNamaSama(nama, TipeElemen.ATRIBUT)
    }

    const koleksiOperasiTersaring =
      elemenLama && elemenLama instanceof Operasi
        ? this.koleksiOperasi.filter((operasi) => operasi !== elemenLama)
        : this.koleksiOperasi
    const operasiBernamaSama = koleksiOperasiTersaring.find(
      (operasi) => operasi.dapatkanNama() === nama
    )
    if (operasiBernamaSama) {
      throw new GalatNamaSama(nama, TipeElemen.OPERASI)
    }
  }

  private dapatkanIdAtributTerbesar(): number {
    let idTerbesar = 0
    if (this.koleksiAtribut.length > 0) {
      idTerbesar = Math.max(...this.koleksiAtribut.map((atribut) => atribut.dapatkanId()))
    }
    return idTerbesar
  }

  private hasilkanNamaAtribut(): string {
    const frasa = 'atribut'

    let indeksNamaBaruTerakhir = 0
    for (const atribut of this.koleksiAtribut) {
      if (new RegExp('^' + frasa).test(atribut.dapatkanNama())) {
        const indeksNama = parseInt(atribut.dapatkanNama().slice(frasa.length))
        if (!isNaN(indeksNama)) {
          indeksNamaBaruTerakhir = indeksNama
        }
      }
    }

    return `${frasa}${indeksNamaBaruTerakhir + 1}`
  }

  buatAtribut(parameter: ParameterBuatAtribut = {}, objekLama?: Atribut): Atribut {
    if (parameter.nama === undefined) {
      parameter.nama = this.hasilkanNamaAtribut()
    }
    this.validasiNamaAnggota(parameter.nama)

    const atribut =
      objekLama ??
      new Atribut(parameter, (namaBaru, elemenLama) =>
        this.validasiNamaAnggota(namaBaru, elemenLama)
      )

    const idTerbesar = this.dapatkanIdAtributTerbesar()
    atribut.aturId(idTerbesar + 1)

    atribut.aturNama(parameter.nama)

    this.koleksiAtribut.push(atribut)
    return atribut
  }

  private dapatkanIdOperasiTerbesar(): number {
    let idTerbesar = 0
    if (this.koleksiOperasi.length > 0) {
      idTerbesar = Math.max(...this.koleksiOperasi.map((atribut) => atribut.dapatkanId()))
    }
    return idTerbesar
  }

  private hasilkanNamaOperasi(): string {
    const frasa = 'operasi'

    let indeksNamaBaruTerakhir = 0
    for (const operasi of this.koleksiOperasi) {
      if (new RegExp('^' + frasa).test(operasi.dapatkanNama())) {
        const indeksNama = parseInt(operasi.dapatkanNama().slice(frasa.length))
        if (!isNaN(indeksNama)) {
          indeksNamaBaruTerakhir = indeksNama
        }
      }
    }

    return `${frasa}${indeksNamaBaruTerakhir + 1}`
  }

  buatOperasi(parameter: ParameterBuatOperasi = {}, objekLama?: Operasi): Operasi {
    if (parameter.nama === undefined) {
      parameter.nama = this.hasilkanNamaOperasi()
    }
    this.validasiNamaAnggota(parameter.nama)

    const operasi =
      objekLama ??
      new Operasi(parameter, (namaBaru, elemenLama) =>
        this.validasiNamaAnggota(namaBaru, elemenLama)
      )

    const idTerbesar = this.dapatkanIdOperasiTerbesar()
    operasi.aturId(idTerbesar + 1)

    operasi.aturNama(parameter.nama)

    this.koleksiOperasi.push(operasi)
    return operasi
  }

  tambahAsosiasi(tujuan: Kelas): Asosiasi {
    const asosiasiBaru = new Asosiasi({
      asal: this,
      tujuan: tujuan
    })
    this.koleksiAsosiasi.push(asosiasiBaru)

    if (tujuan !== this) {
      tujuan.tambahAsosiasiTerkait(asosiasiBaru)
    }

    return asosiasiBaru
  }

  tambahAsosiasiTerkait(asosiasi: Asosiasi): void {
    this.koleksiAsosiasi.push(asosiasi)
  }

  aturKoleksiAtribut(koleksiAtribut: Atribut[]): void {
    this.koleksiAtribut = koleksiAtribut
  }

  aturKoleksiOperasi(koleksiOperasi: Operasi[]): void {
    this.koleksiOperasi = koleksiOperasi
  }

  serialisasi(): any {
    return {
      id: this.id,
      nama: this.nama,
      koleksiAtribut: this.koleksiAtribut.map((atribut) => atribut.serialisasi()),
      koleksiOperasi: this.koleksiOperasi.map((operasi) => operasi.serialisasi())
    }
  }

  static override deserialisasi(
    data: any,
    objekLama?: Kelas,
    pengonversiAtribut?: (data: any) => Atribut,
    pengonversiOperasi?: (data: any) => Operasi
  ): Kelas {
    const kelas = objekLama ?? new Kelas()
    super.deserialisasi(data, kelas)

    const koleksiAtribut = data.koleksiAtribut.map((dataAtribut) =>
      pengonversiAtribut
        ? pengonversiAtribut(dataAtribut)
        : Atribut.deserialisasi(dataAtribut, undefined, (nama, atribut) =>
            kelas.validasiNamaAnggota(nama, atribut)
          )
    )
    kelas.aturKoleksiAtribut(koleksiAtribut)

    const koleksiOperasi = data.koleksiOperasi.map((dataOperasi) =>
      pengonversiOperasi
        ? pengonversiOperasi(dataOperasi)
        : Operasi.deserialisasi(dataOperasi, undefined, (nama, atribut) =>
            kelas.validasiNamaAnggota(nama, atribut)
          )
    )
    kelas.aturKoleksiOperasi(koleksiOperasi)

    return kelas
  }

  keProto(): KelasPb {
    return {
      id: this.id,
      nama: this.nama,
      koleksiAtribut: this.koleksiAtribut.map((atribut) => atribut.keProto()),
      koleksiOperasi: this.koleksiOperasi.map((operasi) => operasi.keProto())
    }
  }

  static dariProto(proto: KelasPb): Kelas {
    const kelas = new Kelas({
      id: proto.id,
      nama: proto.nama
    })

    const koleksiAtribut = proto.koleksiAtribut.map((protoAtribut) =>
      Atribut.dariProto(protoAtribut, (nama, atribut) => kelas.validasiNamaAnggota(nama, atribut))
    )
    kelas.aturKoleksiAtribut(koleksiAtribut)

    const koleksiOperasi = proto.koleksiOperasi.map((protoOperasi) =>
      Operasi.dariProto(protoOperasi, (nama, atribut) => kelas.validasiNamaAnggota(nama, atribut))
    )
    kelas.aturKoleksiOperasi(koleksiOperasi)

    return kelas
  }

  bungkusUntukAi(): any {
    /**
     * Daftar Kunci :
     * i = id
     * n = nama
     */
    return {
      i: this.id,
      n: this.nama
    }
  }
}

export interface ParameterBuatKelas extends ParameterBuatIsiProyek {
  koleksiAtribut?: Atribut[]
  koleksiAsosiasi?: Asosiasi[]
  koleksiOperasi?: Operasi[]
}
