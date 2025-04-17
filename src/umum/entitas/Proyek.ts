import { ProyekPb } from '../proto/kri'
import { Sistem } from './Sistem'

export class Proyek {
  protected nama: string
  protected koleksiSistem: Sistem[]

  constructor(parameter: ParameterBuatProyek = {}) {
    this.nama = parameter.nama ?? 'Proyek Baru'
    this.koleksiSistem = parameter.koleksiSistem ?? []
  }

  aturNama(nama: string): void {
    this.nama = nama
  }

  buatSistem(objekLama?: Sistem): Sistem {
    let idSistemTerbesar = 0
    if (this.koleksiSistem.length > 0) {
      idSistemTerbesar = Math.max(...this.koleksiSistem.map((sistem) => sistem.dapatkanId()))
    }

    const sistemBaru = objekLama ?? new Sistem()
    sistemBaru.aturId(idSistemTerbesar + 1)
    this.koleksiSistem.push(sistemBaru)
    return sistemBaru
  }

  serialisasi(): any {
    return {
      nama: this.nama,
      koleksiSistem: this.koleksiSistem.map((sistem) => sistem.serialisasi())
    }
  }

  static deserialisasi(data: any): Proyek {
    return new Proyek({
      nama: data.nama,
      koleksiSistem: data.koleksiSistem.map((dataSistem) => Sistem.deserialisasi(dataSistem))
    })
  }

  keProto(): ProyekPb {
    return {
      nama: this.nama,
      koleksiSistem: this.koleksiSistem.map((sistem) => sistem.keProto())
    }
  }

  static dariProto(proto: ProyekPb): Proyek {
    return new Proyek({
      nama: proto.nama,
      koleksiSistem: proto.koleksiSistem.map((protoSistem) => Sistem.dariProto(protoSistem))
    })
  }
}

export interface ParameterBuatProyek {
  nama?: string
  koleksiSistem?: Sistem[]
}
