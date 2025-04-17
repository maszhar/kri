<script lang="ts">
  import {
    dukunganBahasaPemrograman,
    dukunganFramework,
    dukunganPlatform
  } from '../../../umum/entitas/PetaDukunganSistem'
  import {
    BahasaPemrograman,
    bahasaPemrogramanToString
  } from '../../../umum/tipe/BahasaPemrograman'
  import { Framework, frameworkToString } from '../../../umum/tipe/Framework'
  import { Platform, platformToString } from '../../../umum/tipe/Platform'
  import { TargetSistem, targetSistemToString } from '../../../umum/tipe/TargetSistem'
  import type { SistemLangsung } from '../umum/entitas/SistemLangsung.svelte'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import Kanvas from '../umum/ui/Kanvas.svelte'

  interface Properti {
    sistem: SistemLangsung
  }
  const { sistem }: Properti = $props()

  const opsiTargetSistem = Object.keys(TargetSistem)
    .filter((item) => !isNaN(Number(item)))
    .map((item) => Number(item))

  let opsiPlatform = $state(dukunganPlatform[sistem.dapatkanTargetSistemLangsung()])
  $effect(() => {
    opsiPlatform = dukunganPlatform[sistem.dapatkanTargetSistemLangsung()]
  })

  let opsiFramework = $state(dukunganFramework[sistem.dapatkanPlatformLangsung()])
  $effect(() => {
    opsiFramework = dukunganFramework[sistem.dapatkanPlatformLangsung()]
  })

  let opsiBahasaPemrograman = $state(dukunganBahasaPemrograman[sistem.dapatkanFrameworkLangsung()])
  $effect(() => {
    opsiBahasaPemrograman = dukunganBahasaPemrograman[sistem.dapatkanFrameworkLangsung()]
  })
</script>

<Kanvas ukuran={new Ukuran2D(1024, 600)}>
  <div class="w-full h-full flex flex-col p-8">
    <input
      type="text"
      class="py-0.5 px-2 border-b font-bold text-3xl outline-none focus:border-b-4"
      bind:value={(): string => sistem.dapatkanNama(), (v: string): void => sistem.aturNama(v)}
    />

    <table class="self-start">
      <tbody>
        <tr>
          <td class="px-2 py-0.5">Target sistem</td>
          <td class="py-0.5">
            <select
              bind:value={
                (): TargetSistem => sistem.dapatkanTargetSistemLangsung(),
                (v: TargetSistem): void => sistem.aturTargetSistem(v)
              }
            >
              {#each opsiTargetSistem as targetSistem}
                <option value={targetSistem}>{targetSistemToString(targetSistem)}</option>
              {/each}
            </select>
          </td>
        </tr>
        <tr>
          <td class="px-2 py-0.5">Platform</td>
          <td class="py-0.5">
            <select
              bind:value={
                (): Platform => sistem.dapatkanPlatformLangsung(),
                (v: Platform): void => sistem.aturPlatform(v)
              }
            >
              {#each opsiPlatform as platform}
                <option value={platform}>{platformToString(platform)}</option>
              {/each}
            </select>
          </td>
        </tr>
        <tr>
          <td class="px-2 py-0.5">Framework</td>
          <td class="py-0.5">
            <select
              bind:value={
                (): Framework => sistem.dapatkanFrameworkLangsung(),
                (v: Framework): void => sistem.aturFramework(v)
              }
            >
              {#each opsiFramework as framework}
                <option value={framework}>{frameworkToString(framework)}</option>
              {/each}
            </select>
          </td>
        </tr>
        <tr>
          <td class="px-2 py-0.5">Bahasa Pemrograman</td>
          <td class="py-0.5">
            <select
              bind:value={
                (): BahasaPemrograman => sistem.dapatkanBahasaPemrogramanLangsung(),
                (v: BahasaPemrograman): void => sistem.aturBahasaPemrograman(v)
              }
            >
              {#each opsiBahasaPemrograman as bahasaPemrograman}
                <option value={bahasaPemrograman}
                  >{bahasaPemrogramanToString(bahasaPemrograman)}</option
                >
              {/each}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</Kanvas>
