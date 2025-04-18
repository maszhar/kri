import type { ParameterBuatAtribut } from '../../../../umum/entitas/Atribut'
import { Kelas } from '../../../../umum/entitas/Kelas'
import { AtributLangsung } from './AtributLangsung.svelte'

export class KelasLangsung extends Kelas {
  private koleksiAtributLangsung: AtributLangsung[] = $state([])

  dapatkanKoleksiAtributLangsung(): AtributLangsung[] {
    return this.koleksiAtributLangsung
  }

  override buatAtribut(parameter: ParameterBuatAtribut): AtributLangsung {
    const atributBaru = new AtributLangsung(parameter)
    super.buatAtribut(parameter, atributBaru)
    this.koleksiAtributLangsung.push(atributBaru)
    return atributBaru
  }
}
