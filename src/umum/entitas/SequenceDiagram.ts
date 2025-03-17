import {
  JenisKomponenSequenceDiagramPb,
  KomponenSequenceDiagramPb,
  ObjekPb,
  SequenceDiagramPb
} from '../proto/kri'
import { Klas } from './Klas'
import type { KomponenSequenceDiagram } from './KomponenSequenceDiagram'
import { Model } from './Model'
import { Objek } from './Objek'

enum JenisKomponen {
  TIDAK_DIKETAHUI = 0,
  OBJEK = 1
}

export class SequenceDiagram extends Model {
  public nama: string
  private koleksiKomponen: KomponenSequenceDiagram[]

  constructor(parameter: ParameterSequenceDiagram = {}) {
    super()
    this.nama = parameter.nama || 'InteraksiBaru'
    this.koleksiKomponen = parameter.koleksiKomponen || []
  }

  getKoleksiKomponen(): KomponenSequenceDiagram[] {
    return this.koleksiKomponen
  }

  tambahObjek(klas: Klas): KomponenSequenceDiagram[] {
    this.koleksiKomponen.push(
      new Objek({
        klas: klas
      })
    )
    return this.koleksiKomponen
  }

  ubahNamaKomponen(indeks: number, namaBaru: string): KomponenSequenceDiagram[] {
    if (this.koleksiKomponen.length < indeks + 1) {
      return this.koleksiKomponen
    }

    this.koleksiKomponen[indeks].nama = namaBaru
    return this.koleksiKomponen
  }

  private beriIdUntukSeluruhKomponen(): void {
    for (let i = 0; i < this.koleksiKomponen.length; i++) {
      this.koleksiKomponen[i].id = i + 1
    }
  }

  bungkusData(): unknown {
    this.beriIdUntukSeluruhKomponen()
    return {
      nama: this.nama,
      koleksiKomponen: this.koleksiKomponen.map((komponen) => {
        return {
          jenisKomponen: JenisKomponen.OBJEK,
          ...(komponen as Objek).bungkusData()
        }
      })
    }
  }

  static bongkarBungkusanData(data: any, koleksiKlas?: Klas[]): SequenceDiagram {
    return new SequenceDiagram({
      nama: data.nama,
      koleksiKomponen: data.koleksiKomponen.map((dataKomponen) => {
        return Objek.bongkarBungkusanData(dataKomponen, koleksiKlas)
      })
    })
  }

  keProto(): SequenceDiagramPb {
    this.beriIdUntukSeluruhKomponen()

    const protoKoleksiKomponen: KomponenSequenceDiagramPb[] = []
    const protoKoleksiObjek: ObjekPb[] = []

    this.koleksiKomponen.forEach((komponen) => {
      protoKoleksiKomponen.push({
        id: komponen.id,
        jenis: JenisKomponenSequenceDiagramPb.JENIS_KOMPONEN_SD_OBJEK
      })
      protoKoleksiObjek.push((komponen as Objek).keProto())
    })

    return {
      nama: this.nama,
      koleksiKomponen: protoKoleksiKomponen,
      koleksiObjek: protoKoleksiObjek
    }
  }

  static dariProto(proto: SequenceDiagramPb, koleksiKlas: Klas[] = []): SequenceDiagram {
    const koleksiKomponen: KomponenSequenceDiagram[] = []

    proto.koleksiKomponen.forEach((protoKoleksiKomponen) => {
      const objekTerkait = proto.koleksiObjek.find(
        (protoObjek) => protoObjek.id == protoKoleksiKomponen.id
      )
      if (objekTerkait) {
        koleksiKomponen.push(Objek.dariProto(objekTerkait, koleksiKlas))
      }
    })

    return new SequenceDiagram({
      nama: proto.nama,
      koleksiKomponen: koleksiKomponen
    })
  }
}

export interface ParameterSequenceDiagram {
  nama?: string
  koleksiKomponen?: KomponenSequenceDiagram[]
}
