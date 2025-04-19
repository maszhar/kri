import { ArahParameterPb } from '../proto/kri'

export enum ArahParameter {
  MASUK = 0,
  KELUAR = 1,
  MASUK_KELUAR = 2
}

export function arahParameterKeProto(arah: ArahParameter): ArahParameterPb {
  switch (arah) {
    case ArahParameter.MASUK:
      return ArahParameterPb.ARAH_PARAMETER_MASUK
    case ArahParameter.KELUAR:
      return ArahParameterPb.ARAH_PARAMETER_KELUAR
    case ArahParameter.MASUK_KELUAR:
      return ArahParameterPb.ARAH_PARAMETER_MASUK_KELUAR
    default:
      return ArahParameterPb.ARAH_PARAMETER_MASUK
  }
}

export function arahParameterDariProto(protoArah: number): ArahParameter {
  switch (protoArah) {
    case ArahParameterPb.ARAH_PARAMETER_MASUK:
      return ArahParameter.MASUK
    case ArahParameterPb.ARAH_PARAMETER_KELUAR:
      return ArahParameter.KELUAR
    case ArahParameterPb.ARAH_PARAMETER_MASUK_KELUAR:
      return ArahParameter.MASUK_KELUAR
    default:
      return ArahParameter.MASUK
  }
}
