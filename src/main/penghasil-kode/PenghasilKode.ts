import {
  ParameterHasilkanKode,
  PenghasilKodeTypescript
} from './typescript/PenghasilKodeTypescript'

export class PenghasilKode {
  private penghasilKodeTypescript: PenghasilKodeTypescript | null = null

  hasilkanKodeTypescript(parameter: ParameterHasilkanKode): void {
    if (this.penghasilKodeTypescript === null) {
      this.penghasilKodeTypescript = new PenghasilKodeTypescript()
    }

    this.penghasilKodeTypescript.hasilkanKode(parameter)
  }
}
