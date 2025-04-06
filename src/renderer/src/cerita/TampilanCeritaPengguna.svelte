<script lang="ts">
  import type { CeritaPenggunaLangsung } from '../umum/entitas/CeritaPenggunaLangsung'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import Kanvas from '../umum/ui/Kanvas.svelte'

  interface Properti {
    ceritaPengguna: CeritaPenggunaLangsung
  }
  const { ceritaPengguna }: Properti = $props()

  let namaLangsung = $state(ceritaPengguna.dapatkanNamaLangsung())
  let ceritaLangsung = $state(ceritaPengguna.dapatkanCeritaLangsung())

  $effect(() => {
    namaLangsung = ceritaPengguna.dapatkanNamaLangsung()
    ceritaLangsung = ceritaPengguna.dapatkanCeritaLangsung()
  })
</script>

<Kanvas ukuran={new Ukuran2D(800, 600)}>
  <div class="flex flex-col p-4 gap-4">
    <textarea
      class="border"
      bind:value={(): string => $namaLangsung, (v): void => ceritaPengguna.aturNama(v)}
    ></textarea>
    <textarea
      class="border"
      bind:value={(): string => $ceritaLangsung, (v): void => ceritaPengguna.aturCerita(v)}
    ></textarea>
  </div>
</Kanvas>
