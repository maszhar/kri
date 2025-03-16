<script lang="ts">
  import { onMount } from 'svelte'
  import { Proyek } from '../../umum/entitas/Proyek'
  import Dasar from './common/ui/Dasar.svelte'
  import Jendela from './common/ui/Jendela.svelte'
  import PanelAtas from './common/ui/panel-atas/PanelAtas.svelte'
  import TampilanSequenceDiagram from './sequence/ui/TampilanSequenceDiagram.svelte'
  import type { Model } from '../../umum/entitas/Model'
  import { SequenceDiagram } from '../../umum/entitas/SequenceDiagram'

  let proyek: Proyek = new Proyek()
  let lokasiPenyimpananProyek = ''

  let modelAktif: Model | null = null

  function tampilkanDialogBukaProyek(): void {
    window.mesin.tampilkanDialogBukaProyek()
  }

  async function simpanProyek(): Promise<void> {
    if (lokasiPenyimpananProyek === '') {
      const lokasiPenyimpananBaru = await window.mesin.tampilkanDialogSimpanProyek()
      if (lokasiPenyimpananBaru === null) {
        return
      }

      lokasiPenyimpananProyek = lokasiPenyimpananBaru
    }

    await window.mesin.simpanProyek(lokasiPenyimpananProyek, proyek.bungkusData())
  }

  onMount(() => {
    const sequenceDiagram = proyek.tambahSequenceDiagramBaru()
    modelAktif = sequenceDiagram
  })
</script>

<Dasar>
  <PanelAtas saatBukaProyekDiklik={tampilkanDialogBukaProyek} saatSimpanDiklik={simpanProyek} />
  <Jendela>
    {#if modelAktif instanceof SequenceDiagram}
      <TampilanSequenceDiagram sequenceDiagram={modelAktif} />
    {/if}
  </Jendela>
</Dasar>
