import { GalatBahasaPemrogramanTidakDidukung } from '../galat/GalatBahasaPemrogramanTidakDidukung'
import { GalatFrameworkTidakDidukung } from '../galat/GalatFrameworkTidakDidukung'
import { GalatPlatformTidakDidukung } from '../galat/GalatPlatformTidakDidukung'
import { BahasaPemrograman } from '../tipe/BahasaPemrograman'
import { Framework } from '../tipe/Framework'
import { Platform } from '../tipe/Platform'
import { TargetSistem } from '../tipe/TargetSistem'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'
import {
  dukunganBahasaPemrograman,
  dukunganFramework,
  dukunganPlatform
} from './PetaDukunganSistem'

export class Sistem extends IsiProyek {
  protected target: TargetSistem = TargetSistem.TIDAK_DIATUR
  protected platform: Platform = Platform.TIDAK_DIATUR
  protected framework: Framework = Framework.TIDAK_DIATUR
  protected bahasaPemrograman: BahasaPemrograman = BahasaPemrograman.TIDAK_DIATUR
  protected koleksiSubsistem: Sistem[]

  constructor(parameter: ParameterBuatSistem = {}) {
    super({
      nama: parameter.nama ?? 'Sistem baru'
    })

    this.aturTarget(parameter.target ?? TargetSistem.TIDAK_DIATUR)

    if (parameter.platform !== undefined) {
      this.aturPlatform(parameter.platform)
    }

    if (parameter.framework !== undefined) {
      this.aturFramework(parameter.framework)
    }

    if (parameter.bahasaPemrograman !== undefined) {
      this.aturBahasaPemrograman(parameter.bahasaPemrograman)
    }

    this.koleksiSubsistem = parameter.koleksiSubsistem ?? []
  }

  dapatkanTarget(): TargetSistem {
    return this.target
  }

  aturTarget(target: TargetSistem): void {
    this.target = target
    this.platform = dukunganPlatform[this.target][0]
    this.framework = dukunganFramework[this.platform][0]
    this.bahasaPemrograman = dukunganBahasaPemrograman[this.framework][0]
  }

  dapatkanPlatform(): Platform {
    return this.platform
  }

  aturPlatform(platform: Platform): void {
    if (!dukunganPlatform[this.target].includes(platform)) {
      throw new GalatPlatformTidakDidukung(this.target, platform)
    }

    this.platform = platform
    this.framework = dukunganFramework[this.platform][0]
    this.bahasaPemrograman = dukunganBahasaPemrograman[this.framework][0]
  }

  dapatkanFramework(): Framework {
    return this.framework
  }

  aturFramework(framework: Framework): void {
    if (!dukunganFramework[this.platform].includes(framework)) {
      throw new GalatFrameworkTidakDidukung(this.platform, framework)
    }

    this.framework = framework
    this.bahasaPemrograman = dukunganBahasaPemrograman[this.framework][0]
  }

  dapatkanBahasaPemrograman(): BahasaPemrograman {
    return this.bahasaPemrograman
  }

  aturBahasaPemrograman(bahasa: BahasaPemrograman): void {
    if (!dukunganBahasaPemrograman[this.framework].includes(bahasa)) {
      throw new GalatBahasaPemrogramanTidakDidukung(this.framework, bahasa)
    }

    this.bahasaPemrograman = bahasa
  }

  dapatkanKoleksiSubsistem(): Sistem[] {
    return this.koleksiSubsistem
  }

  buatSubsistem(parameter: ParameterBuatSistem = {}, objekLama?: Sistem): Sistem {
    let idSubsistemTerbesar = 0
    if (this.koleksiSubsistem.length > 0) {
      idSubsistemTerbesar = Math.max(...this.koleksiSubsistem.map((subsistem) => subsistem.id))
    }

    const subsistem = objekLama ?? new Sistem(parameter)
    subsistem.aturId(idSubsistemTerbesar + 1)
    this.koleksiSubsistem.push(subsistem)
    return subsistem
  }
}
export interface ParameterBuatSistem extends ParameterBuatIsiProyek {
  target?: TargetSistem
  platform?: Platform
  framework?: Framework
  bahasaPemrograman?: BahasaPemrograman
  koleksiSubsistem?: Sistem[]
}
