<script>
  import KelompokTombolPanelAtas from './komponen/KelompokTombolPanelAtas.svelte'
  import TombolKecilPanelAtas from './komponen/TombolKecilPanelAtas.svelte'
  import TabPanelAtas from './komponen/TabPanelAtas.svelte'
  import TempatTabPanelAtas from './komponen/TempatTabPanelAtas.svelte'
  import TempatTombolPanelAtas from './komponen/TempatTombolPanelAtas.svelte'
  import TombolBesarPanelAtas from './komponen/TombolBesarPanelAtas.svelte'

  let tabAktif = $state(0)
</script>

<TempatTabPanelAtas>
  <TabPanelAtas aktif={tabAktif == 0}>Umum</TabPanelAtas>
</TempatTabPanelAtas>
<TempatTombolPanelAtas>
  <KelompokTombolPanelAtas>
    <TombolBesarPanelAtas>Simpan</TombolBesarPanelAtas>
    <TombolKecilPanelAtas>Proyek Baru</TombolKecilPanelAtas>
    <TombolKecilPanelAtas>Buka Proyek</TombolKecilPanelAtas>
  </KelompokTombolPanelAtas>
</TempatTombolPanelAtas>
