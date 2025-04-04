import { readonly, writable, type Readable, type Writable } from 'svelte/store'
import { DiagramKlas } from '../../../../umum/entitas/DiagramKlas'
import type { Klas } from '../../../../umum/entitas/Klas'
import type { Koordinat } from '../../../../umum/entitas/Koordinat'
import { ElemenKlasLangsung } from './ElemenKlasLangsung'

export class DiagramKlasLangsung extends DiagramKlas {
  private koleksiElemenKlasLangsung: Writable<ElemenKlasLangsung[]> = writable([])

  constructor(parameter: ParameterBuatDiagramKlasLangsung = {}) {
    super({
      nama: parameter.nama,
      koleksiElemenKlas: parameter.koleksiElemenKlasLangsung
    })

    this.koleksiElemenKlasLangsung.set(parameter.koleksiElemenKlasLangsung ?? [])
  }

  dapatkanKoleksiElemenKlasLangsung(): Readable<ElemenKlasLangsung[]> {
    return readonly(this.koleksiElemenKlasLangsung)
  }

  tambahElemenKlasBaru(klas: Klas, posisi: Koordinat): ElemenKlasLangsung {
    const elemenKlas = new ElemenKlasLangsung({ klas: klas, posisi })
    this.koleksiElemenKlasLangsung.update((koleksiLama) => {
      koleksiLama.push(elemenKlas)
      return koleksiLama
    })
    this.koleksiElemenKlas.push(elemenKlas)
    return elemenKlas
  }
}

export interface ParameterBuatDiagramKlasLangsung {
  nama?: string
  koleksiElemenKlasLangsung?: ElemenKlasLangsung[]
}
