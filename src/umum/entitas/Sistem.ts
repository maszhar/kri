import { GalatBahasaPemrogramanTidakDidukung } from '../galat/GalatBahasaPemrogramanTidakDidukung'
import { GalatFrameworkTidakDidukung } from '../galat/GalatFrameworkTidakDidukung'
import { BahasaPemrograman } from '../tipe/BahasaPemrograman'
import { Framework } from '../tipe/Framework'
import { TargetSistem } from '../tipe/TargetSistem'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'

export class Sistem extends IsiProyek {
  protected target: TargetSistem = TargetSistem.TidakDiatur
  protected framework: Framework = Framework.TidakDiatur
  protected bahasaPemrograman: BahasaPemrograman = BahasaPemrograman.TidakDiatur
  protected koleksiSubsistem: Sistem[]

  constructor(parameter: ParameterBuatSistem = {}) {
    super({
      nama: parameter.nama ?? 'Sistem baru'
    })

    this.aturTarget(parameter.target ?? TargetSistem.TidakDiatur)
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
    switch (target) {
      case TargetSistem.CrossPlatformDesktop:
        this.framework = Framework.Electron
        break
      case TargetSistem.TidakDiatur:
        this.framework = Framework.TidakDiatur
        break
    }

    this.target = target
  }

  dapatkanFramework(): Framework {
    return this.framework
  }

  aturFramework(framework: Framework): void {
    switch (framework) {
      case Framework.Electron:
        if (this.target !== TargetSistem.CrossPlatformDesktop) {
          throw new GalatFrameworkTidakDidukung(this.target, framework)
        }
        this.bahasaPemrograman = BahasaPemrograman.Typescript
        break
    }

    this.framework = framework
  }

  dapatkanBahasaPemrograman(): BahasaPemrograman {
    return this.bahasaPemrograman
  }

  aturBahasaPemrograman(bahasa: BahasaPemrograman): void {
    switch (bahasa) {
      case BahasaPemrograman.TidakDiatur:
        if (this.framework === Framework.Electron) {
          throw new GalatBahasaPemrogramanTidakDidukung(this.framework, bahasa)
        }
        break
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
  framework?: Framework
  bahasaPemrograman?: BahasaPemrograman
  koleksiSubsistem?: Sistem[]
}
