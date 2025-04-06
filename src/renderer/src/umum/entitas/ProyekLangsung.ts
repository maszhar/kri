import { readonly, writable, type Readable, type Writable } from 'svelte/store'
import { Proyek } from '../../../../umum/entitas/Proyek'
import { DiagramKlasLangsung } from './DiagramKlasLangsung'
import { KlasLangsung } from './KlasLangsung'
import type { SequenceDiagram } from '../../../../umum/entitas/SequenceDiagram'
import { GalatNamaSama } from '../../../../umum/galat/GalatNamaSama'
import { TipeElemen } from '../../../../umum/tipe/TipeElemen'
import { DiagramKasusGunaLangsung } from './DiagramKasusGunaLangsung'
import { CeritaPenggunaLangsung } from './CeritaPenggunaLangsung'

export class ProyekLangsung extends Proyek {
  // === ATRIBUT ===
  private koleksiCeritaPenggunaLangsung: Writable<CeritaPenggunaLangsung[]> = writable([])
  private koleksiDiagramKlasLangsung: Writable<DiagramKlasLangsung[]> = writable([])
  private koleksiDiagramKasusGunaLangsung: Writable<DiagramKasusGunaLangsung[]> = writable([])

  // === KONSTRUKTOR ===
  constructor(parameter: ParameterBuatProyekLangsung = {}) {
    super({
      koleksiCeritaPengguna: parameter.koleksiCeritaPenggunaLangsung,
      koleksiKlas: parameter.koleksiKlasLangsung,
      koleksiDiagramKasusGuna: parameter.koleksiDiagramKasusGuna,
      koleksiDiagramKlas: parameter.koleksiDiagramKlasLangsung,
      koleksiSequenceDiagram: parameter.koleksiSequenceDiagram
    })

    this.koleksiCeritaPenggunaLangsung.set(parameter.koleksiCeritaPenggunaLangsung ?? [])
    this.koleksiDiagramKasusGunaLangsung.set(parameter.koleksiDiagramKasusGuna ?? [])
    this.koleksiDiagramKlasLangsung.set(parameter.koleksiDiagramKlasLangsung ?? [])
  }

  // === OPERASI ===
  // cerita pengguna
  dapatkanKoleksiCeritaPenggunaLangsung(): Readable<CeritaPenggunaLangsung[]> {
    return readonly(this.koleksiCeritaPenggunaLangsung)
  }

  buatCeritaPengguna(): CeritaPenggunaLangsung {
    const ceritaBaru = new CeritaPenggunaLangsung({ nama: 'Cerita baru' })
    this.koleksiCeritaPengguna.push(ceritaBaru)
    this.koleksiCeritaPenggunaLangsung.update((koleksiLama) => {
      koleksiLama.push(ceritaBaru)
      return koleksiLama
    })
    return ceritaBaru
  }

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

  ubahNamaKlas(klasTerkait: KlasLangsung, namaBaru: string): void {
    const klasSelainTerkait = this.koleksiKlas.filter((itemKlas) => itemKlas !== klasTerkait)

    if (this.koleksiKlas.length - 1 == klasSelainTerkait.length) {
      const namaSama = klasSelainTerkait.find((itemKlas) => itemKlas.dapatkanNama() == namaBaru)
      if (!namaSama) {
        klasTerkait.aturNama(namaBaru)
      } else {
        throw new GalatNamaSama(namaBaru, TipeElemen.KLAS)
      }
    }
  }

  // diagram kasus guna
  buatDiagramKasusGuna(): DiagramKasusGunaLangsung {
    const diagramBaru = new DiagramKasusGunaLangsung({ nama: 'DiagramBaru' })
    this.koleksiDiagramKasusGuna.push(diagramBaru)
    this.koleksiDiagramKasusGunaLangsung.update((koleksiLama) => {
      koleksiLama.push(diagramBaru)
      return koleksiLama
    })
    return diagramBaru
  }

  dapatkanKoleksiDiagramKasusGuna(): Readable<DiagramKasusGunaLangsung[]> {
    return readonly(this.koleksiDiagramKasusGunaLangsung)
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
  koleksiCeritaPenggunaLangsung?: CeritaPenggunaLangsung[]
  koleksiKlasLangsung?: KlasLangsung[]
  koleksiSequenceDiagram?: SequenceDiagram[]
  koleksiDiagramKlasLangsung?: DiagramKlasLangsung[]
  koleksiDiagramKasusGuna?: DiagramKasusGunaLangsung[]
}
