import { TargetSistemPb } from '../proto/kri'

export enum TargetSistem {
  TIDAK_DIATUR = 0,
  DESKTOP = 1,
  SERVER = 2
}

export function targetSistemToString(target: TargetSistem): string {
  switch (target) {
    case TargetSistem.TIDAK_DIATUR:
      return 'Tidak diatur'
    case TargetSistem.DESKTOP:
      return 'Desktop'
    case TargetSistem.SERVER:
      return 'Server'
  }
}

export function targetSistemKeProto(target: TargetSistem): TargetSistemPb {
  switch (target) {
    case TargetSistem.TIDAK_DIATUR:
      return TargetSistemPb.TIDAK_DIATUR
    case TargetSistem.DESKTOP:
      return TargetSistemPb.DESKTOP
    case TargetSistem.SERVER:
      return TargetSistemPb.SERVER
  }
}

export function targetSistemDariProto(proto: TargetSistemPb): TargetSistem {
  switch (proto) {
    case TargetSistemPb.TIDAK_DIATUR:
      return TargetSistem.TIDAK_DIATUR
    case TargetSistemPb.DESKTOP:
      return TargetSistem.DESKTOP
    case TargetSistemPb.SERVER:
      return TargetSistem.SERVER
  }
}
