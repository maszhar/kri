import { SequenceDiagramPb } from '../proto/kri'
import { Class } from './Class'
import type { Komponen } from './Komponen'
import { Model } from './Model'

export class SequenceDiagram extends Model {
  public nama: string
  private koleksiKomponen: Komponen[] = []

  constructor(parameter: ParameterSequenceDiagram = {}) {
    super()
    this.nama = parameter.nama || 'InteraksiBaru'
  }

  getKoleksiKomponen(): Komponen[] {
    return this.koleksiKomponen
  }

  tambahClass(): Komponen[] {
    this.koleksiKomponen.push(new Class())
    return this.koleksiKomponen
  }

  ubahNamaKomponen(indeks: number, namaBaru: string): Komponen[] {
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
