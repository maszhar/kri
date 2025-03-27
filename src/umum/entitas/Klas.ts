import { GalatNamaSama } from '../galat/GalatNamaSama'
import { KlasPb } from '../proto/kri'
import { TipeElemen } from '../tipe/TipeElemen'
import { Atribut, ParameterBuatAtribut } from './Atribut'
import { Komponen } from './Komponen'

export class Klas extends Komponen {
  public koleksiAtribut: Atribut[]

  constructor(parameter: ParameterBuatKlas = {}) {
    super({
      id: parameter.id,
      nama: parameter.nama || 'KlasBaru'
    })
    this.koleksiAtribut = parameter.koleksiAtribut ?? []
  }

  tambahAtributBaru(parameter: ParameterBuatAtribut): Atribut {
    const atributBernamaSama = this.koleksiAtribut.find((atribut) => atribut.nama == parameter.nama)
    if (atributBernamaSama) {
      throw new GalatNamaSama(parameter.nama, TipeElemen.ATRIBUT)
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

    this.koleksiAtribut[indeks] = new Atribut(parameter)
  }

  bungkusData(): unknown {
    return {
      id: this.id,
      nama: this.nama,
      koleksiAtribut: this.koleksiAtribut.map((atribut) => atribut.bungkusData())
    }
  }

  static bongkarBungkusanData(data: any): Klas {
    return new Klas({
      id: data.id,
      nama: data.nama,
      koleksiAtribut: data.koleksiAtribut.map((dataAtribut: any) =>
        Atribut.bongkarBungkusanData(dataAtribut)
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
}
