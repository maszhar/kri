export class RentangMultiplisitas {
  private minimal: number | null = null
  private maksimal: number | null = null

  constructor(parameter: ParameterBuatRentangMultiplisitas = {}) {
    if (parameter.maksimal === undefined) {
      this.maksimal = 1
    } else {
      this.maksimal = parameter.maksimal
    }

    if (parameter.minimal === undefined) {
      this.minimal = 1
    } else {
      this.minimal = parameter.minimal
    }

    this.validasiNilaiMinimal()
  }

  private validasiNilaiMinimal(): void {
    if (this.maksimal !== null && this.minimal !== null && this.minimal > this.maksimal) {
      this.minimal = this.maksimal
    }
  }

  private validasiNilaiMaksimal(): void {
    if (this.maksimal !== null && this.minimal !== null && this.maksimal < this.minimal) {
      this.maksimal = this.minimal
    }
  }

  aturMaksimal(maksimal: number | null): void {
    this.maksimal = maksimal
    this.validasiNilaiMinimal()
  }

  aturMinimal(minimal: number | null): void {
    this.minimal = minimal
    this.validasiNilaiMaksimal()
  }

  private angkaMultiplisitasKeSimbol(angka: number | null): string {
    if (angka === null) {
      return '*'
    } else {
      return `${angka}`
    }
  }

  toString(): string {
    let hasil = ''
    if (this.minimal === this.maksimal) {
      hasil += this.angkaMultiplisitasKeSimbol(this.maksimal)
    } else {
      hasil += `${this.angkaMultiplisitasKeSimbol(this.minimal)}..${this.angkaMultiplisitasKeSimbol(this.maksimal)}`
    }
    return `[${hasil}]`
  }

  serialisasi(): any {
    return {
      minimal: this.minimal,
      maksimal: this.maksimal
    }
  }

  static deserialisasi(data: any): RentangMultiplisitas {
    return new RentangMultiplisitas({
      minimal: data.minimal,
      maksimal: data.maksimal
    })
  }
}
interface ParameterBuatRentangMultiplisitas {
  minimal?: number
  maksimal?: number
}
