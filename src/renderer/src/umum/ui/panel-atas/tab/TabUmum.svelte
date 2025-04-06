<script lang="ts">
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
  <TombolKecilPanelAtas>Proyek Baru</TombolKecilPanelAtas>
  <TombolKecilPanelAtas saatDiklik={saatBukaProyekDiklik}>Buka Proyek</TombolKecilPanelAtas>
</KelompokTombolPanelAtas>
