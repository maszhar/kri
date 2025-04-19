import { Kelas } from '../../../umum/entitas/Kelas'
import { PenghasilKodeAtributKlasTypescript } from './PenghasilKodeAtributKlasTypescript'
import { PenghasilKodeMetodeKlasTypescript } from './PenghasilKodeMetodeKlasTypescript'

export class PenghasilKodeKlasTypescript {
  private penghasilKodeMetode = new PenghasilKodeMetodeKlasTypescript()

  constructor(private klas: Kelas) {}

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

    // metode
    this.klas.koleksiMetode.forEach((metode) => {
      hasilKode += this.penghasilKodeMetode.hasilkanKode(metode)
    })

    // penutup
    hasilKode += this.hasilkanKodePenutupKlas()

    return hasilKode
  }
}
