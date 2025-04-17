import { ObjekPb } from '../proto/kri'
import { Kelas } from './Kelas'
import { KomponenSequenceDiagram } from './KomponenSequenceDiagram'

export class Objek extends KomponenSequenceDiagram {
  public klas?: Kelas

  constructor(parameter: ParameterBuatObjek = {}) {
    super({
      id: parameter.id,
      nama: parameter.nama ?? ''
    })
    this.klas = parameter.klas
  }

  hasilkanTeksTampilan(): string {
    let teksTampilan = this.nama
    if (this.klas) {
      teksTampilan += ` : ${this.klas.nama}`
    }
    teksTampilan = teksTampilan.trim()
    return teksTampilan
  }

  bungkusData(): object {
    return {
      id: this.id,
      nama: this.nama,
      idKlas: this.klas?.id || null
    }
  }

  static bongkarBungkusanData(data: any, koleksiKlas?: Kelas[]): Objek {
    return new Objek({
      id: data.id,
      nama: data.nama,
      klas:
        data.idKlas && koleksiKlas ? koleksiKlas.find((klas) => klas.id == data.idKlas) : undefined
    })
  }

  keProto(): ObjekPb {
    return {
      id: this.id,
      nama: this.nama,
      idKlas: this.klas?.id || 0
    }
  }

  static dariProto(proto: ObjekPb, koleksiKlas: Kelas[] = []): Objek {
    const klas =
      proto.idKlas > 0 && koleksiKlas.length > 0
        ? koleksiKlas.find((klas) => klas.id == proto.idKlas)
        : undefined
    return new Objek({
      id: proto.id,
      nama: proto.nama,
      klas: klas
    })
  }
}

interface ParameterBuatObjek {
  id?: number
  nama?: string
  klas?: Kelas
}
