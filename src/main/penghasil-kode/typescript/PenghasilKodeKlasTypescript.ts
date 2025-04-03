import { Klas } from '../../../umum/entitas/Klas'
import { PenghasilKodeAtributKlasTypescript } from './PenghasilKodeAtributKlasTypescript'
import { PenghasilKodeOperasiKlasTypescript } from './PenghasilKodeOperasiKlasTypescript'

export class PenghasilKodeKlasTypescript {
  private penghasilKodeOperasi = new PenghasilKodeOperasiKlasTypescript()

  constructor(private klas: Klas) {}

  private hasilkanKodePembukaKlas(): string {
    return `export class ${this.klas.nama} {\n`
  }

  private hasilkanKodePenutupKlas(): string {
    return `}\n`
  }

  public hasilkanKode(): string {
    let hasilKode = ''

    // pembuka
    hasilKode += this.hasilkanKodePembukaKlas()

    // atribut
    this.klas.koleksiAtribut.forEach((atribut) => {
      const penghasilKodeAtribut = new PenghasilKodeAtributKlasTypescript({ atribut })
      hasilKode += penghasilKodeAtribut.hasilkanKode()
    })

    // operasi
    this.klas.koleksiOperasi.forEach((operasi) => {
      hasilKode += this.penghasilKodeOperasi.hasilkanKode(operasi)
    })

    // penutup
    hasilKode += this.hasilkanKodePenutupKlas()

    return hasilKode
  }
}
