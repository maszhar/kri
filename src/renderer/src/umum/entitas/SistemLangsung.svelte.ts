import { Sistem, type ParameterBuatSistem } from '../../../../umum/entitas/Sistem'

export class SistemLangsung extends Sistem {
  private namaLangsung = $state('')
  private koleksiSubsistemLangsung: SistemLangsung[] = $state([])

  constructor(parameter: ParameterBuatSistem = {}) {
    super(parameter)

    this.namaLangsung = this.nama
    this.koleksiSubsistemLangsung = this.koleksiSubsistem as SistemLangsung[]
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung = nama
  }

  dapatkanKoleksiSubsistemLangsung(): SistemLangsung[] {
    return this.koleksiSubsistemLangsung
  }

  override buatSubsistem(parameter?: ParameterBuatSistem): SistemLangsung {
    const subsistemBaru = new SistemLangsung(parameter)
    super.buatSubsistem({}, subsistemBaru)
    this.koleksiSubsistemLangsung.push(subsistemBaru)
    return subsistemBaru
  }
}
