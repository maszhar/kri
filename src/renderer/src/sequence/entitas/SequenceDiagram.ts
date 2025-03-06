import { Class } from '../../common/entitas/Class'
import type { Komponen } from '../../common/entitas/Komponen'

export class SequenceDiagram {
  public nama: string
  private kumpulanKomponen: Komponen[] = []

  constructor(parameter: ParameterSequenceDiagram = {}) {
    this.nama = parameter.nama || ''
  }

  getKumpulanKomponen(): Komponen[] {
    return this.kumpulanKomponen
  }

  tambahClass(): Komponen[] {
    this.kumpulanKomponen.push(new Class())
    return this.kumpulanKomponen
  }

  ubahNamaKomponen(indeks: number, namaBaru: string): Komponen[] {
    if (this.kumpulanKomponen.length < indeks + 1) {
      return this.kumpulanKomponen
    }

    this.kumpulanKomponen[indeks].nama = namaBaru
    return this.kumpulanKomponen
  }
}

export interface ParameterSequenceDiagram {
  nama?: string
}
