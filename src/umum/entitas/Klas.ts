import { KlasPb } from '../proto/kri'
import { Komponen } from './Komponen'

export class Klas extends Komponen {
  constructor(parameter: ParameterBuatKlas = {}) {
    super({
      id: parameter.id,
      nama: parameter.nama || 'KlasBaru'
    })
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
