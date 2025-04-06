<script lang="ts">
  import IkonBaru from '../../ikon/IkonBaru.svelte'
  import IkonBuka from '../../ikon/IkonBuka.svelte'
  import IkonSimpan from '../../ikon/IkonSimpan.svelte'
  import KelompokTombolPanelAtas from '../komponen/KelompokTombolPanelAtas.svelte'
  import TombolBesarPanelAtas from '../komponen/TombolBesarPanelAtas.svelte'
  import TombolKecilPanelAtas from '../komponen/TombolKecilPanelAtas.svelte'

  interface Properti {
    saatSimpanDiklik: () => void
    saatBukaProyekDiklik: () => void
  }
  const { saatSimpanDiklik, saatBukaProyekDiklik }: Properti = $props()
</script>

<KelompokTombolPanelAtas>
  <TombolBesarPanelAtas saatDiklik={saatSimpanDiklik}>
    {#snippet icon()}
      <IkonSimpan class="h-10 w-full" />
    {/snippet}
    Simpan
  </TombolBesarPanelAtas>
  <TombolKecilPanelAtas>
    {#snippet icon()}
      <IkonBaru class="w-full h-full" />
    {/snippet}
    Proyek Baru
  </TombolKecilPanelAtas>
  <TombolKecilPanelAtas saatDiklik={saatBukaProyekDiklik}>
    {#snippet icon()}
      <IkonBuka class="w-full h-full" />
    {/snippet}
    Buka Proyek
  </TombolKecilPanelAtas>
</KelompokTombolPanelAtas>
