import { ElemenKlas, type ParameterBuatElemenKlas } from '../../../../umum/entitas/ElemenKlas'
import { KlasLangsung } from './KlasLangsung'
import { KoordinatLangsung } from './KoordinatLangsung'

export class ElemenKlasLangsung extends ElemenKlas {
  private klasLangsung: KlasLangsung
  private posisiLangsung: KoordinatLangsung

  constructor(parameter: ParameterBuatElemenKlas) {
    super(parameter)

    this.klasLangsung = new KlasLangsung(parameter.klas)
    this.posisiLangsung = new KoordinatLangsung(this.posisi.x, this.posisi.y)
  }

  dapatkanKlasLangsung(): KlasLangsung {
    return this.klasLangsung
  }

  dapatkanPosisiLangsung(): KoordinatLangsung {
    return this.posisiLangsung
  }
}
