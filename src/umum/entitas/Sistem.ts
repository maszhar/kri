import { GalatFrameworkTidakDidukung } from '../galat/GalatFrameworkTidakDidukung'
import { Framework } from '../tipe/Framework'
import { TargetSistem } from '../tipe/TargetSistem'
import { IsiProyek, ParameterBuatIsiProyek } from './IsiProyek'

export class Sistem extends IsiProyek {
  private target: TargetSistem = TargetSistem.TidakDiatur
  private framework: Framework = Framework.TidakDiatur
  private koleksiSubsistem: Sistem[]

  constructor(parameter: ParameterBuatSistem) {
    super({
      nama: parameter.nama ?? 'Sistem baru'
    })

    this.aturTarget(parameter.target ?? TargetSistem.TidakDiatur)
    if (parameter.framework !== undefined) {
      this.aturFramework(parameter.framework)
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
    }

    this.framework = framework
  }

  dapatkanKoleksiSubsistem(): Sistem[] {
    return this.koleksiSubsistem
  }

  tambahSubsistem(parameter: ParameterBuatSistem): Sistem {
    let idSubsistemTerbesar = 0
    if (this.koleksiSubsistem.length > 0) {
      idSubsistemTerbesar = Math.max(...this.koleksiSubsistem.map((subsistem) => subsistem.id))
    }
    parameter.id = idSubsistemTerbesar + 1

    const subsistem = new Sistem(parameter)
    this.koleksiSubsistem.push(subsistem)
    return subsistem
  }
}
interface ParameterBuatSistem extends ParameterBuatIsiProyek {
  target?: TargetSistem
  framework?: Framework
  koleksiSubsistem?: Sistem[]
}
