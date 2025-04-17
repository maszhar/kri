import { FrameworkPb } from '../proto/kri'

export enum Framework {
  TIDAK_DIATUR = 0,
  ELECTRON = 1
}

export function frameworkToString(target: Framework): string {
  switch (target) {
    case Framework.TIDAK_DIATUR:
      return 'Tidak diatur'
    case Framework.ELECTRON:
      return 'Electron'
  }
}

// Konversi dari Framework ke FrameworkPb
export function frameworkKeProto(framework: Framework): FrameworkPb {
  switch (framework) {
    case Framework.TIDAK_DIATUR:
      return FrameworkPb.TIDAK_DIATUR
    case Framework.ELECTRON:
      return FrameworkPb.ELECTRON
    default:
      return FrameworkPb.TIDAK_DIATUR
  }
}

// Konversi dari FrameworkPb ke Framework
export function frameworkDariProto(pb: FrameworkPb): Framework {
  switch (pb) {
    case FrameworkPb.TIDAK_DIATUR:
      return Framework.TIDAK_DIATUR
    case FrameworkPb.ELECTRON:
      return Framework.ELECTRON
    default:
      return Framework.TIDAK_DIATUR
  }
}
