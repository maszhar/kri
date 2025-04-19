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

    this.validasiNilai()
  }

  dapatkanMinimal(): number | null {
    return this.minimal
  }

  dapatkanMaksimal(): number | null {
    return this.maksimal
  }

  private validasiNilai(): void {
    if (
      (this.minimal === null && this.maksimal !== null) ||
      (this.maksimal !== null && this.minimal !== null && this.minimal > this.maksimal)
    ) {
      const nilaiSementara = this.minimal
      this.minimal = this.maksimal
      this.maksimal = nilaiSementara
    }
  }

  aturMaksimal(maksimal: number | null): void {
    if (maksimal !== null && maksimal < 0) {
      this.maksimal = 0
    } else {
      this.maksimal = maksimal
    }
    this.validasiNilai()
  }

  aturMinimal(minimal: number | null): void {
    if (minimal !== null && minimal < 0) {
      this.minimal = 0
    } else {
      this.minimal = minimal
    }
    this.validasiNilai()
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
  minimal?: number | null
  maksimal?: number | null
}
