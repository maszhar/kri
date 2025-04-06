<script lang="ts">
  import type { CeritaPenggunaLangsung } from '../umum/entitas/CeritaPenggunaLangsung'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import Kanvas from '../umum/ui/Kanvas.svelte'

  interface Properti {
    ceritaPengguna: CeritaPenggunaLangsung
  }
  const { ceritaPengguna }: Properti = $props()

  const namaLangsung = ceritaPengguna.dapatkanNamaLangsung()
  const ceritaLangsung = ceritaPengguna.dapatkanCeritaLangsung()
</script>

<Kanvas ukuran={new Ukuran2D(800, 600)}>
  <div class="flex flex-col p-4 gap-4">
    <textarea class="border" bind:value={$namaLangsung}></textarea>
    <textarea class="border" bind:value={$ceritaLangsung}></textarea>
  </div>
</Kanvas>
