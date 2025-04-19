import { Operasi } from '../../../umum/entitas/Operasi'

export class PenghasilKodeOperasiKlasTypescript {
  hasilkanKode(operasi: Operasi): string {
    // indentasi
    const indentasi = '  '

    let hasilKode = ''

    hasilKode += indentasi
    hasilKode += 'public'
    hasilKode += ` ${operasi.nama}(`
    hasilKode += operasi.koleksiParameter
      .map((parameter) => `${parameter.nama}: ${parameter.tipe ?? 'any'}`)
      .join(', ')
    hasilKode += `)`
    if (operasi.tipeKeluaran) {
      hasilKode += `: ${operasi.tipeKeluaran}`
    }
    hasilKode += ' {\n'
    hasilKode += `${indentasi}}\n`
    return hasilKode
  }
}
