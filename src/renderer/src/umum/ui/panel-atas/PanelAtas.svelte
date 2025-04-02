<script lang="ts">
  import TabPanelAtas from './komponen/TabPanelAtas.svelte'
  import TempatTabPanelAtas from './komponen/TempatTabPanelAtas.svelte'
  import TempatTombolPanelAtas from './komponen/TempatTombolPanelAtas.svelte'
  import TabPenghasilKode from './tab/TabPenghasilKode.svelte'
  import TabUmum from './tab/TabUmum.svelte'

  interface Properti {
    saatBukaProyekDiklik: () => void
    saatSimpanDiklik: () => void
    hasilkanKode: () => void
  }
  const { saatBukaProyekDiklik, saatSimpanDiklik, hasilkanKode }: Properti = $props()

  const TAB_UMUM = 0
  const TAB_PENGHASIL_KODE = 1

  let tabAktif = $state(TAB_UMUM)
  function aktifkanTab(tab: number): void {
    tabAktif = tab
  }
</script>

<div class="fixed w-full z-40 h-32">
  <TempatTabPanelAtas>
    <TabPanelAtas aktif={tabAktif === TAB_UMUM} pilih={(): void => aktifkanTab(TAB_UMUM)}>
      Umum
    </TabPanelAtas>
    <TabPanelAtas
      aktif={tabAktif === TAB_PENGHASIL_KODE}
      pilih={(): void => aktifkanTab(TAB_PENGHASIL_KODE)}
    >
      Penghasil Kode
    </TabPanelAtas>
  </TempatTabPanelAtas>
  <TempatTombolPanelAtas>
    {#if tabAktif === TAB_UMUM}
      <TabUmum {saatSimpanDiklik} {saatBukaProyekDiklik} />
    {:else if tabAktif === TAB_PENGHASIL_KODE}
      <TabPenghasilKode {hasilkanKode} />
    {/if}
  </TempatTombolPanelAtas>
</div>
