import { writable, type Readable, type Writable } from 'svelte/store'
import { Proyek } from '../../../../umum/entitas/Proyek'
import { DiagramKlasLangsung } from './DiagramKlasLangsung'
import { KlasLangsung } from './KlasLangsung'
import type { SequenceDiagram } from '../../../../umum/entitas/SequenceDiagram'
import { GalatNamaSama } from '../../../../umum/galat/GalatNamaSama'
import { TipeElemen } from '../../../../umum/tipe/TipeElemen'

export class ProyekLangsung extends Proyek {
  private koleksiDiagramKlasLangsung: Writable<DiagramKlasLangsung[]> = writable([])

  constructor(parameter: ParameterBuatProyekLangsung = {}) {
    super(parameter)

    this.koleksiDiagramKlasLangsung.set(parameter.koleksiDiagramKlasLangsung ?? [])
  }

  // === OPERASI ===

  // klas
  tambahKlasBaru(): KlasLangsung {
    // hasilkan nama klas baru otomatis
    let nomorKlasBaru = 1
    const frasaKlasBaru = 'KlasBaru'
    this.koleksiKlas.forEach((klas) => {
      if (new RegExp('^' + frasaKlasBaru).test(klas.dapatkanNama())) {
        const nomorKlasBaruSekarang = parseInt(klas.dapatkanNama().slice(frasaKlasBaru.length))
        if (!isNaN(nomorKlasBaruSekarang)) {
          nomorKlasBaru = nomorKlasBaruSekarang + 1
        }
      }
    })

    // hasilkan id klas
    let id = 1
    if (this.koleksiKlas.length > 0) {
      id = this.koleksiKlas[this.koleksiKlas.length - 1].id + 1
    }

    // buat klas
    const klas = new KlasLangsung({ id: id, nama: frasaKlasBaru + nomorKlasBaru.toString() })

    // tambahkan klas baru ke koleksi
    this.koleksiKlas.push(klas)

    return klas
  }

  ubahNamaKlas(idKlas: number, namaBaru: string): void {
    const klasSelainTerkait = this.koleksiKlas.filter((itemKlas) => itemKlas.id !== idKlas)
    if (this.koleksiKlas.length - 1 == klasSelainTerkait.length) {
      const namaSama = klasSelainTerkait.find((itemKlas) => itemKlas.dapatkanNama() == namaBaru)
      if (!namaSama) {
        const klasTerkait = this.koleksiKlas.find((klas) => klas.id == idKlas) as KlasLangsung
        klasTerkait.aturNama(namaBaru)
      } else {
        throw new GalatNamaSama(namaBaru, TipeElemen.KLAS)
      }
    }
  }

  // diagram klas
  dapatkanKoleksiDiagramKlasLangsung(): Readable<DiagramKlasLangsung[]> {
    return this.koleksiDiagramKlasLangsung
  }

  tambahDiagramKlasBaru(): DiagramKlasLangsung {
    const diagramKlasLangsung = new DiagramKlasLangsung()
    this.koleksiDiagramKlasLangsung.update((koleksiSekarang) => {
      koleksiSekarang.push(diagramKlasLangsung)
      return koleksiSekarang
    })
    this.koleksiDiagramKlas.push(diagramKlasLangsung)
    return diagramKlasLangsung
  }
}

export interface ParameterBuatProyekLangsung {
  koleksiKlasLangsung?: KlasLangsung[]
  koleksiSequenceDiagram?: SequenceDiagram[]
  koleksiDiagramKlasLangsung?: DiagramKlasLangsung[]
}
