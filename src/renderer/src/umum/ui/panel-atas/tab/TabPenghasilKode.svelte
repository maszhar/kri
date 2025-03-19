<script lang="ts">
  import TombolBesarPanelAtas from '../komponen/TombolBesarPanelAtas.svelte'

  interface Properti {
    hasilkanKode: () => void
  }
  const { hasilkanKode }: Properti = $props()
</script>

<TombolBesarPanelAtas saatDiklik={hasilkanKode}>Hasilkan Kode</TombolBesarPanelAtas>
