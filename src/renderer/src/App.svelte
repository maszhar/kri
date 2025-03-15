<script lang="ts">
  import Dasar from './common/ui/Dasar.svelte'
  import Jendela from './common/ui/Jendela.svelte'
  import PanelAtas from './common/ui/panel-atas/PanelAtas.svelte'
  import TampilanSequenceDiagram from './sequence/ui/TampilanSequenceDiagram.svelte'

  function tampilkanDialogBukaProyek(): void {
    window.mesin.tampilkanDialogBukaProyek()
  }
</script>

<Dasar>
  <PanelAtas saatBukaProyekDiklik={tampilkanDialogBukaProyek} />
  <Jendela>
    <TampilanSequenceDiagram />
  </Jendela>
</Dasar>
