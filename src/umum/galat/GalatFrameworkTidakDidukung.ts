import { Framework } from '../tipe/Framework'
import { TargetSistem } from '../tipe/TargetSistem'

export class GalatFrameworkTidakDidukung extends Error {
  constructor(
    public target: TargetSistem,
    public framework: Framework
  ) {
    super(
      `Target sistem '${target.toString()}' tidak mendukung framework '${framework.toString()}'`
    )
  }
}
