import { DiagramKlas, type ParameterBuatDiagramKlas } from '../../../../umum/entitas/DiagramKlas'

export class DiagramKlasLangsung extends DiagramKlas {
  constructor(parameter: ParameterBuatDiagramKlas = {}) {
    super(parameter)
  }

  static dariDiagramKlas(diagramKlas: DiagramKlas): DiagramKlasLangsung {
    return new DiagramKlasLangsung({
      nama: diagramKlas.nama,
      koleksiElemenKlas: diagramKlas.koleksiElemenKlas
    })
  }
}
