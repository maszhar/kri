import { GalatNamaSama } from '../galat/GalatNamaSama'
import { KelasPb } from '../proto/kri'
import { TipeElemen } from '../tipe/TipeElemen'
import { Asosiasi } from './Asosiasi'
import { Atribut, ParameterBuatAtribut } from './Atribut'
import { ElemenBernama, ParameterBuatElemenBernama } from './ElemenBernama'
import { Operasi, ParameterBuatOperasi } from './Operasi'

export class Kelas extends ElemenBernama {
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
    const operasiBernamaSama = koleksiOperasiTersaring.find((operasi) => operasi.nama === nama)
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

  ubahAtribut(indeks: number, parameter: ParameterBuatAtribut): void {
    // const koleksiAtributSelainIndeks = this.koleksiAtribut.filter((_, i) => i !== indeks)
    // const atributBernamaSama = koleksiAtributSelainIndeks.find(
    //   (atribut) => atribut.nama == parameter.nama
    // )
    // if (atributBernamaSama) {
    //   throw new GalatNamaSama(parameter.nama, TipeElemen.ATRIBUT)
    // }
    // const operasiBernamaSama = this.koleksiOperasi.find(
    //   (operasi) => operasi.nama === parameter.nama
    // )
    // if (operasiBernamaSama) {
    //   throw new GalatNamaSama(parameter.nama, TipeElemen.OPERASI)
    // }
    // this.koleksiAtribut[indeks] = new Atribut(parameter)
  }

  tambahOperasiBaru(parameter: ParameterBuatOperasi): Operasi {
    const operasiBernamaSama = this.koleksiOperasi.find(
      (operasi) => operasi.nama === parameter.nama
    )
    if (operasiBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.OPERASI)
    }

    const atributBernamaSama = this.koleksiAtribut.find((atribut) => atribut.nama == parameter.nama)
    if (atributBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.ATRIBUT)
    }

    const operasi = new Operasi(parameter)
    this.koleksiOperasi.push(operasi)
    return operasi
  }

  ubahOperasi(indeks: number, parameter: ParameterBuatOperasi): void {
    const koleksiOperasiSelainIndeks = this.koleksiOperasi.filter((_, i) => i !== indeks)
    const operasiBernamaSama = koleksiOperasiSelainIndeks.find(
      (operasi) => operasi.nama === parameter.nama
    )
    if (operasiBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.OPERASI)
    }

    const atributBernamaSama = this.koleksiAtribut.find((atribut) => atribut.nama == parameter.nama)
    if (atributBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.ATRIBUT)
    }

    this.koleksiOperasi[indeks] = new Operasi(parameter)
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

  serialisasi(): unknown {
    return {
      id: this.id,
      nama: this.nama
    }
  }

  static deserialisasi(data: any): Kelas {
    return new Kelas({
      id: data.id,
      nama: data.nama
    })
  }

  keProto(): KelasPb {
    return {
      id: this.id,
      nama: this.nama
    }
  }

  static dariProto(proto: KelasPb): Kelas {
    return new Kelas({
      id: proto.id,
      nama: proto.nama
    })
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

export interface ParameterBuatKelas extends ParameterBuatElemenBernama {
  koleksiAtribut?: Atribut[]
  koleksiAsosiasi?: Asosiasi[]
  koleksiOperasi?: Operasi[]
}
