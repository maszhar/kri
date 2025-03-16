<script lang="ts">
  import { onMount } from 'svelte'
  import { Proyek } from '../../umum/entitas/Proyek'
  import Dasar from './umum/ui/Dasar.svelte'
  import Jendela from './umum/ui/Jendela.svelte'
  import PanelAtas from './umum/ui/panel-atas/PanelAtas.svelte'
  import TampilanSequenceDiagram from './sequence/ui/TampilanSequenceDiagram.svelte'
  import type { Model } from '../../umum/entitas/Model'
  import { SequenceDiagram } from '../../umum/entitas/SequenceDiagram'

  let proyek: Proyek = new Proyek()
  let lokasiPenyimpananProyek = ''

  let modelAktif: Model | null = $state(null)

  async function bukaProyek(): Promise<void> {
    const dataProyek = await window.mesin.bukaProyek()
    proyek = Proyek.bongkarDataTerbungkus(dataProyek.data)
    lokasiPenyimpananProyek = dataProyek.lokasi
    modelAktif = proyek.koleksiSequenceDiagram[0]
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
  <PanelAtas saatBukaProyekDiklik={bukaProyek} saatSimpanDiklik={simpanProyek} />
  <Jendela>
    {#if modelAktif instanceof SequenceDiagram}
      <TampilanSequenceDiagram sequenceDiagram={modelAktif} />
    {/if}
  </Jendela>
</Dasar>
