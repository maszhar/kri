import { writable, type Readable, type Writable } from 'svelte/store'
import { Proyek, type ParameterBuatProyek } from '../../../../umum/entitas/Proyek'
import { DiagramKlasLangsung } from './DiagramKlasLangsung'

export class ProyekLangsung extends Proyek {
  private koleksiDiagramKlasLangsung: Writable<DiagramKlasLangsung[]>

  constructor(parameter: ParameterBuatProyek = {}) {
    super(parameter)

    this.koleksiDiagramKlasLangsung = writable(
      this.koleksiDiagramKlas.map((diagramKlas) => DiagramKlasLangsung.dariDiagramKlas(diagramKlas))
    )
  }

  dapatkanKoleksiDiagramKlasLangsung(): Readable<DiagramKlasLangsung[]> {
    return this.koleksiDiagramKlasLangsung
  }

  tambahDiagramKlasBaru(): DiagramKlasLangsung {
    const diagramKlasLangsung = new DiagramKlasLangsung()
    this.koleksiDiagramKlasLangsung.update((koleksiSekarang) => {
      koleksiSekarang.push(diagramKlasLangsung)
      return koleksiSekarang
    })
    return diagramKlasLangsung
  }
}
