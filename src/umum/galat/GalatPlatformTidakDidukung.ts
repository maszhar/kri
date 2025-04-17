import { Platform } from '../tipe/Platform'
import { TargetSistem } from '../tipe/TargetSistem'

export class GalatPlatformTidakDidukung extends Error {
  constructor(
    public target: TargetSistem,
    public platform: Platform
  ) {
    super(`Target sistem '${target.toString()}' tidak mendukung platform '${platform.toString()}'`)
  }
}
