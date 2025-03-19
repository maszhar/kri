<script lang="ts">
  import { onMount } from 'svelte'
  import { Proyek } from '../../umum/entitas/Proyek'
  import Dasar from './umum/ui/Dasar.svelte'
  import Jendela from './umum/ui/Jendela.svelte'
  import PanelAtas from './umum/ui/panel-atas/PanelAtas.svelte'
  import TampilanSequenceDiagram from './sequence/ui/TampilanSequenceDiagram.svelte'
  import type { Model } from '../../umum/entitas/Model'
  import { SequenceDiagram } from '../../umum/entitas/SequenceDiagram'
  import type { Klas } from '../../umum/entitas/Klas'
  import PanelKiri from './umum/ui/panel-kiri/PanelKiri.svelte'
  import { DiagramKlas } from '../../umum/entitas/DiagramKlas'
  import TampilanDiagramKlas from './klas/TampilanDiagramKlas.svelte'

  let proyek: Proyek = new Proyek()
  let lokasiPenyimpananProyek = ''

  let koleksiSequenceDiagram: SequenceDiagram[] = $state([])
  let koleksiDiagramKlas: DiagramKlas[] = $state([])
  let modelAktif: Model | null = $state(null)

  async function bukaProyek(): Promise<void> {
    const dataProyek = await window.mesin.bukaProyek()
    proyek = Proyek.bongkarBungkusanData(dataProyek.data)
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

  function tambahKlasBaru(): Klas {
    return proyek.tambahKlasBaru()
  }

  function bukaSequenceDiagram(indeks: number): void {
    modelAktif = koleksiSequenceDiagram[indeks]
  }

  function buatSequenceDiagram(): void {
    const sequenceDiagram = proyek.tambahSequenceDiagramBaru()
    modelAktif = sequenceDiagram
    koleksiSequenceDiagram = proyek.koleksiSequenceDiagram
  }

  function perbaruiSequenceDiagram(): void {
    const indeksSequenceDiagramLamaTerkait = koleksiSequenceDiagram.findIndex(
      (sequenceDiagramLama) => sequenceDiagramLama == modelAktif
    )
    if (indeksSequenceDiagramLamaTerkait < 0) {
      return
    }
    proyek.buatKlonaSequenceDiagram(indeksSequenceDiagramLamaTerkait)
    koleksiSequenceDiagram = proyek.koleksiSequenceDiagram
    modelAktif = koleksiSequenceDiagram[indeksSequenceDiagramLamaTerkait]
  }

  function bukaDiagramKlas(indeks: number): void {
    modelAktif = koleksiDiagramKlas[indeks]
  }

  function buatDiagramKlas(): void {
    const diagramKlas = proyek.tambahDiagramKlasBaru()
    koleksiDiagramKlas = proyek.koleksiDiagramKlas
    modelAktif = diagramKlas
  }

  onMount(() => {
    koleksiSequenceDiagram = proyek.koleksiSequenceDiagram
    koleksiDiagramKlas = proyek.koleksiDiagramKlas
  })
</script>

<Dasar>
  <PanelAtas saatBukaProyekDiklik={bukaProyek} saatSimpanDiklik={simpanProyek} />
  <div class="flex-grow flex items-stretch">
    <PanelKiri
      {koleksiSequenceDiagram}
      saatBuatSequenceDiagram={buatSequenceDiagram}
      {modelAktif}
      saatBukaSequenceDiagram={bukaSequenceDiagram}
      {koleksiDiagramKlas}
      saatBuatDiagramKlas={buatDiagramKlas}
      saatBukaDiagramKlas={bukaDiagramKlas}
    />
    <Jendela>
      {#if modelAktif instanceof SequenceDiagram}
        <TampilanSequenceDiagram
          {tambahKlasBaru}
          sequenceDiagram={modelAktif}
          saatSequenceDiagramDiperbarui={perbaruiSequenceDiagram}
        />
      {:else if modelAktif instanceof DiagramKlas}
        <TampilanDiagramKlas diagramKlas={modelAktif} {tambahKlasBaru} />
      {/if}
    </Jendela>
  </div>
</Dasar>
