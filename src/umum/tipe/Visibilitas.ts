import { VisibilitasPb } from '../proto/kri'

export enum Visibilitas {
  TIDAK_DIATUR = 0,
  PUBLIC = 1,
  PROTECTED = 2,
  PRIVATE = 3,
  PACKAGE = 4
}

export function visibilitasKeSimbol(visibilitas: Visibilitas): string {
  switch (visibilitas) {
    case Visibilitas.TIDAK_DIATUR:
      return ''
    case Visibilitas.PUBLIC:
      return '+'
    case Visibilitas.PROTECTED:
      return '#'
    case Visibilitas.PRIVATE:
      return '-'
    case Visibilitas.PACKAGE:
      return '~'
  }
}

export function visibilitasDariSimbol(simbol: string): Visibilitas {
  switch (simbol) {
    case '+':
      return Visibilitas.PUBLIC
    case '#':
      return Visibilitas.PROTECTED
    case '-':
      return Visibilitas.PRIVATE
    case '~':
      return Visibilitas.PACKAGE
    default:
      return Visibilitas.TIDAK_DIATUR
  }
}

export function visibilitasKeProto(visibilitas: Visibilitas): VisibilitasPb {
  switch (visibilitas) {
    case Visibilitas.TIDAK_DIATUR:
      return VisibilitasPb.TIDAK_DIATUR
    case Visibilitas.PUBLIC:
      return VisibilitasPb.PUBLIC
    case Visibilitas.PROTECTED:
      return VisibilitasPb.PROTECTED
    case Visibilitas.PRIVATE:
      return VisibilitasPb.PRIVATE
    case Visibilitas.PACKAGE:
      return VisibilitasPb.PACKAGE
  }
}

export function visibilitasDariProto(proto: VisibilitasPb): Visibilitas {
  switch (proto) {
    case VisibilitasPb.TIDAK_DIATUR:
      return Visibilitas.TIDAK_DIATUR
    case VisibilitasPb.PUBLIC:
      return Visibilitas.PUBLIC
    case VisibilitasPb.PRIVATE:
      return Visibilitas.PRIVATE
    case VisibilitasPb.PROTECTED:
      return Visibilitas.PROTECTED
    case VisibilitasPb.PACKAGE:
      return Visibilitas.PACKAGE
  }
}
