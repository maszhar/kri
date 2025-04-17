import { BahasaPemrogramanPb } from '../proto/kri'

export enum BahasaPemrograman {
  TIDAK_DIATUR = 0,
  TYPESCRIPT = 1
}

export function bahasaPemrogramanToString(target: BahasaPemrograman): string {
  switch (target) {
    case BahasaPemrograman.TIDAK_DIATUR:
      return 'Tidak diatur'
    case BahasaPemrograman.TYPESCRIPT:
      return 'Typescript'
  }
}

// Converter dari BahasaPemrograman ke BahasaPemrogramanPb
export function bahasaPemrogramanKeProto(bahasa: BahasaPemrograman): BahasaPemrogramanPb {
  switch (bahasa) {
    case BahasaPemrograman.TIDAK_DIATUR:
      return BahasaPemrogramanPb.TIDAK_DIATUR
    case BahasaPemrograman.TYPESCRIPT:
      return BahasaPemrogramanPb.TYPESCRIPT
    default:
      return BahasaPemrogramanPb.TIDAK_DIATUR
  }
}

// Converter dari BahasaPemrogramanPb ke BahasaPemrograman
export function bahasaPemrogramanDariProto(bahasaPb: BahasaPemrogramanPb): BahasaPemrograman {
  switch (bahasaPb) {
    case BahasaPemrogramanPb.TIDAK_DIATUR:
      return BahasaPemrograman.TIDAK_DIATUR
    case BahasaPemrogramanPb.TYPESCRIPT:
      return BahasaPemrograman.TYPESCRIPT
    default:
      return BahasaPemrograman.TIDAK_DIATUR
  }
}
