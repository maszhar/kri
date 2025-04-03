import { GalatNamaSama } from '../galat/GalatNamaSama'
import { KlasPb } from '../proto/kri'
import { TipeElemen } from '../tipe/TipeElemen'
import { Asosiasi } from './Asosiasi'
import { Atribut, ParameterBuatAtribut } from './Atribut'
import { Komponen } from './Komponen'
import { Operasi, ParameterBuatOperasi } from './Operasi'

export class Klas extends Komponen {
  public koleksiAtribut: Atribut[]
  public koleksiOperasi: Operasi[]
  public koleksiAsosiasi: Asosiasi[]

  constructor(parameter: ParameterBuatKlas = {}) {
    super({
      id: parameter.id,
      nama: parameter.nama || 'KlasBaru'
    })
    this.koleksiAtribut = parameter.koleksiAtribut ?? []
    this.koleksiOperasi = parameter.koleksiOperasi ?? []
    this.koleksiAsosiasi = parameter.koleksiAsosiasi ?? []
  }

  tambahAtributBaru(parameter: ParameterBuatAtribut): Atribut {
    const atributBernamaSama = this.koleksiAtribut.find((atribut) => atribut.nama == parameter.nama)
    if (atributBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.ATRIBUT)
    }
    const operasiBernamaSama = this.koleksiOperasi.find(
      (operasi) => operasi.nama === parameter.nama
    )
    if (operasiBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.OPERASI)
    }

    const atribut = new Atribut(parameter)
    this.koleksiAtribut.push(atribut)
    return atribut
  }

  ubahAtribut(indeks: number, parameter: ParameterBuatAtribut): void {
    const koleksiAtributSelainIndeks = this.koleksiAtribut.filter((_, i) => i !== indeks)
    const atributBernamaSama = koleksiAtributSelainIndeks.find(
      (atribut) => atribut.nama == parameter.nama
    )
    if (atributBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.ATRIBUT)
    }

    const operasiBernamaSama = this.koleksiOperasi.find(
      (operasi) => operasi.nama === parameter.nama
    )
    if (operasiBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.OPERASI)
    }

    this.koleksiAtribut[indeks] = new Atribut(parameter)
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

  tambahAsosiasi(tujuan: Klas): Asosiasi {
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

  static bongkarBungkusanData(data: any): Klas {
    return new Klas({
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

  static dariProto(proto: KlasPb): Klas {
    return new Klas({
      id: proto.id,
      nama: proto.nama
    })
  }
}

interface ParameterBuatKlas {
  id?: number
  nama?: string
  koleksiAtribut?: Atribut[]
  koleksiAsosiasi?: Asosiasi[]
  koleksiOperasi?: Operasi[]
}
