<script lang="ts">
  import Dasar from './common/ui/Dasar.svelte'
  import Jendela from './common/ui/Jendela.svelte'
  import PanelAtas from './common/ui/panel-atas/PanelAtas.svelte'
  import TampilanSequenceDiagram from './sequence/ui/TampilanSequenceDiagram.svelte'
</script>

<Dasar>
  <PanelAtas />
  <Jendela>
    <TampilanSequenceDiagram />
  </Jendela>
</Dasar>
