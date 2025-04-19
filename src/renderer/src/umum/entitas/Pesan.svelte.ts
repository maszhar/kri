export class Pesan {
  private pesan: string | null = $state(null)

  private constructor() {}

  static tampilkan(pesan: string): void {
    Pesan.instance.pesan = pesan
  }

  static tutup(): void {
    Pesan.instance.pesan = null
  }

  static dapatkanPesanLangsung(): string | null {
    return Pesan.instance.pesan
  }

  static instance = new Pesan()
}
