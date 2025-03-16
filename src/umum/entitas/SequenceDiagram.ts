import { SequenceDiagramPb } from '../proto/kri'
import { Klas } from './Klas'
import type { KomponenSequenceDiagram } from './KomponenSequenceDiagram'
import { Model } from './Model'
import { Objek } from './Objek'

export class SequenceDiagram extends Model {
  public nama: string
  private koleksiKomponen: KomponenSequenceDiagram[] = []

  constructor(parameter: ParameterSequenceDiagram = {}) {
    super()
    this.nama = parameter.nama || 'InteraksiBaru'
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

  bungkusData(): unknown {
    return {
      nama: this.nama
    }
  }

  static bongkarDataTerbungkus(data: any): SequenceDiagram {
    return new SequenceDiagram({
      nama: data.nama
    })
  }

  keProto(): SequenceDiagramPb {
    return {
      nama: this.nama
    }
  }

  static dariProto(proto: SequenceDiagramPb): SequenceDiagram {
    return new SequenceDiagram({
      nama: proto.nama
    })
  }
}

export interface ParameterSequenceDiagram {
  nama?: string
}
