<script lang="ts">
  import type { KelasLangsung } from '../umum/entitas/KelasLangsung.svelte'
  import type { SistemLangsung } from '../umum/entitas/SistemLangsung.svelte'
  import TampilanNamaKelas from './TampilanNamaKelas.svelte'

  interface Properti {
    sistem: SistemLangsung
    kelas: KelasLangsung
  }
  const { kelas, sistem }: Properti = $props()

  function perbaruiNama(nama: string): void {
    sistem.ubahNamaKelas(kelas, nama)
  }
</script>

<div class="bg-white border">
  <TampilanNamaKelas nama={kelas.dapatkanNamaLangsung()} {perbaruiNama} />
</div>
