import { Metode } from '../../../umum/entitas/Metode'

export class PenghasilKodeMetodeKlasTypescript {
  hasilkanKode(metode: Metode): string {
    // indentasi
    const indentasi = '  '

    let hasilKode = ''

    hasilKode += indentasi
    hasilKode += 'public'
    hasilKode += ` ${metode.nama}(`
    hasilKode += metode.koleksiParameter
      .map((parameter) => `${parameter.nama}: ${parameter.tipe ?? 'any'}`)
      .join(', ')
    hasilKode += `)`
    if (metode.tipeKeluaran) {
      hasilKode += `: ${metode.tipeKeluaran}`
    }
    hasilKode += ' {\n'
    hasilKode += `${indentasi}}\n`
    return hasilKode
  }
}
