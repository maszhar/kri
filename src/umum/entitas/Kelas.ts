import { GalatNamaSama } from '../galat/GalatNamaSama'
import { KlasPb } from '../proto/kri'
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
      id: parameter.id,
      nama: parameter.nama || 'KelasBaru'
    })
    this.koleksiAtribut = parameter.koleksiAtribut ?? []
    this.koleksiOperasi = parameter.koleksiOperasi ?? []
    this.koleksiAsosiasi = parameter.koleksiAsosiasi ?? []
  }

  private validasiNamaAnggota(nama: string, elemenLama?: Atribut): void {
    const atributBernamaSama = this.koleksiAtribut.find((atribut) => atribut.dapatkanNama() == nama)
    if (atributBernamaSama) {
      throw new GalatNamaSama(nama, TipeElemen.ATRIBUT)
    }

    const operasiBernamaSama = this.koleksiOperasi.find((operasi) => operasi.nama === nama)
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

  buatAtribut(parameter: ParameterBuatAtribut, objekLama?: Atribut): Atribut {
    this.validasiNamaAnggota(parameter.nama)

    const atribut = objekLama ?? new Atribut(parameter)
    const idTerbesar = this.dapatkanIdAtributTerbesar()
    atribut.aturId(idTerbesar + 1)
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

  bungkusData(): unknown {
    return {
      id: this.id,
      nama: this.nama,
      koleksiAtribut: this.koleksiAtribut.map((atribut) => atribut.bungkusData()),
      koleksiOperasi: this.koleksiOperasi.map((operasi) => operasi.bungkusData())
    }
  }

  static bongkarBungkusanData(data: any): Kelas {
    return new Kelas({
      id: data.id,
      nama: data.nama,
      koleksiAtribut: data.koleksiAtribut.map((dataAtribut: any) =>
        Atribut.bongkarBungkusanData(dataAtribut)
      ),
      koleksiOperasi: data.koleksiOperasi.map((dataOperasi) =>
        Operasi.bongkarBungkusanData(dataOperasi)
      )
    })
  }

  keProto(): KlasPb {
    return {
      id: this.id,
      nama: this.nama
    }
  }

  static dariProto(proto: KlasPb): Kelas {
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
