<script lang="ts">
  import type { KelasLangsung } from '../umum/entitas/KelasLangsung.svelte'
  import type { SistemLangsung } from '../umum/entitas/SistemLangsung.svelte'
  import TampilanAtribut from './TampilanAtribut.svelte'
  import TampilanKompartemen from './TampilanKompartemen.svelte'
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

  <!-- Atribut -->
  {#if kelas.dapatkanKoleksiAtributLangsung().length > 0}
    <TampilanKompartemen>
      <div class="text-center px-4">attributes</div>
      {#each kelas.dapatkanKoleksiAtributLangsung() as atribut, _id (atribut.dapatkanId())}
        <TampilanAtribut {atribut} />
      {/each}
    </TampilanKompartemen>
  {/if}
</div>
