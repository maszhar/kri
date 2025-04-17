import { Sistem, type ParameterBuatSistem } from '../../../../umum/entitas/Sistem'
import { BahasaPemrograman } from '../../../../umum/tipe/BahasaPemrograman'
import { Framework } from '../../../../umum/tipe/Framework'
import { Platform } from '../../../../umum/tipe/Platform'
import { TargetSistem } from '../../../../umum/tipe/TargetSistem'

export class SistemLangsung extends Sistem {
  private namaLangsung = $state('')
  private koleksiSubsistemLangsung: SistemLangsung[] = $state([])
  private targetSistemLangsung = $state(TargetSistem.TIDAK_DIATUR)
  private platformLangsung = $state(Platform.TIDAK_DIATUR)
  private frameworkLangsung = $state(Framework.TIDAK_DIATUR)
  private bahasaPemrogramanLangsung = $state(BahasaPemrograman.TIDAK_DIATUR)

  constructor(parameter: ParameterBuatSistem = {}) {
    super(parameter)

    this.namaLangsung = this.nama
    this.targetSistemLangsung = this.targetSistem
    this.platformLangsung = this.platform
    this.koleksiSubsistemLangsung = this.koleksiSubsistem as SistemLangsung[]
  }

  dapatkanNamaLangsung(): string {
    return this.namaLangsung
  }

  override aturNama(nama: string): void {
    super.aturNama(nama)
    this.namaLangsung = nama
  }

  dapatkanTargetSistemLangsung(): TargetSistem {
    return this.targetSistemLangsung
  }

  override aturTargetSistem(target: TargetSistem): void {
    super.aturTargetSistem(target)

    this.targetSistemLangsung = this.targetSistem
    this.platformLangsung = this.platform
    this.frameworkLangsung = this.framework
    this.bahasaPemrogramanLangsung = this.bahasaPemrograman
  }

  dapatkanPlatformLangsung(): Platform {
    return this.platformLangsung
  }

  override aturPlatform(platform: Platform): void {
    super.aturPlatform(platform)
    this.platformLangsung = this.platform
    this.frameworkLangsung = this.framework
    this.bahasaPemrogramanLangsung = this.bahasaPemrograman
  }

  dapatkanFrameworkLangsung(): Framework {
    return this.frameworkLangsung
  }

  override aturFramework(framework: Framework): void {
    super.aturFramework(framework)
    this.frameworkLangsung = this.framework
    this.bahasaPemrogramanLangsung = this.bahasaPemrograman
  }

  dapatkanBahasaPemrogramanLangsung(): BahasaPemrograman {
    return this.bahasaPemrogramanLangsung
  }

  override aturBahasaPemrograman(bahasa: BahasaPemrograman): void {
    super.aturBahasaPemrograman(bahasa)
    this.bahasaPemrogramanLangsung = this.bahasaPemrograman
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

  static deserialisasi(data: any): SistemLangsung {
    return new SistemLangsung({
      target: data.targetSistem as TargetSistem,
      platform: data.platform as Platform,
      framework: data.framework as Framework,
      bahasaPemrograman: data.bahasaPemrograman as BahasaPemrograman,
      koleksiSubsistem: data.koleksiSubsistem.map((dataSubsistem) =>
        Sistem.deserialisasi(dataSubsistem)
      )
    })
  }
}
