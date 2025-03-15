<script lang="ts">
  import { onMount } from 'svelte'
  import { Proyek } from './common/entitas/Proyek'
  import Dasar from './common/ui/Dasar.svelte'
  import Jendela from './common/ui/Jendela.svelte'
  import PanelAtas from './common/ui/panel-atas/PanelAtas.svelte'
  import TampilanSequenceDiagram from './sequence/ui/TampilanSequenceDiagram.svelte'
  import type { Model } from './common/entitas/Model'
  import { SequenceDiagram } from './sequence/entitas/SequenceDiagram'

  let proyek: Proyek = new Proyek()
  let lokasiPenyimpananProyek = ''

  let modelAktif: Model | null = null

  function tampilkanDialogBukaProyek(): void {
    window.mesin.tampilkanDialogBukaProyek()
  }

  onMount(() => {
    const sequenceDiagram = proyek.tambahSequenceDiagramBaru()
    modelAktif = sequenceDiagram
  })
</script>

<Dasar>
  <PanelAtas saatBukaProyekDiklik={tampilkanDialogBukaProyek} />
  <Jendela>
    {#if modelAktif instanceof SequenceDiagram}
      <TampilanSequenceDiagram sequenceDiagram={modelAktif} />
    {/if}
  </Jendela>
</Dasar>
