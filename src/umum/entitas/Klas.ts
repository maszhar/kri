import { KlasPb } from '../proto/kri'
import { Atribut, ParameterBuatAtribut } from './Atribut'
import { Komponen } from './Komponen'

export class Klas extends Komponen {
  public koleksiAtribut: Atribut[] = []

  constructor(parameter: ParameterBuatKlas = {}) {
    super({
      id: parameter.id,
      nama: parameter.nama || 'KlasBaru'
    })
  }

  tambahAtributBaru(parameter: ParameterBuatAtribut): Atribut {
    const atribut = new Atribut(parameter)
    this.koleksiAtribut.push(atribut)
    return atribut
  }

  terapkanPerubahanAtribut(indeks: number): void {
    this.koleksiAtribut[indeks] = this.koleksiAtribut[indeks].buatKlona()
  }

  bungkusData(): unknown {
    return {
      id: this.id,
      nama: this.nama
    }
  }

  static bongkarBungkusanData(data: any): Klas {
    return new Klas({
      id: data.id,
      nama: data.nama
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
}
