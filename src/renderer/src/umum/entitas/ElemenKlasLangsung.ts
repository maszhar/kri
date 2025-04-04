import { ElemenKlas, type ParameterBuatElemenKlas } from '../../../../umum/entitas/ElemenKlas'
import { KlasLangsung } from './KlasLangsung'
import { KoordinatLangsung } from './KoordinatLangsung'

export class ElemenKlasLangsung extends ElemenKlas {
  constructor(parameter: ParameterBuatElemenKlas) {
    super(parameter)
  }

  dapatkanKlasLangsung(): KlasLangsung {
    return this.klas as KlasLangsung
  }

  dapatkanPosisiLangsung(): KoordinatLangsung {
    return this.posisi as KoordinatLangsung
  }
}

export interface ParameterBuatElemenKlasLangsung {
  klas: KlasLangsung
  posisi?: KoordinatLangsung
}
