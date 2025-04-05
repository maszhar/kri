<script lang="ts">
  import { onMount } from 'svelte'
  import Dasar from './umum/ui/Dasar.svelte'
  import Jendela from './umum/ui/Jendela.svelte'
  import PanelAtas from './umum/ui/panel-atas/PanelAtas.svelte'
  import TampilanSequenceDiagram from './sequence/ui/TampilanSequenceDiagram.svelte'
  import type { Model } from '../../umum/entitas/Model'
  import { SequenceDiagram } from '../../umum/entitas/SequenceDiagram'
  import type { Klas } from '../../umum/entitas/Klas'
  import PanelKiri from './umum/ui/panel-kiri/PanelKiri.svelte'
  import TampilanDiagramKlas from './klas/TampilanDiagramKlas.svelte'
  import TampilanPesan from './umum/ui/TampilanPesan.svelte'
  import { ProyekLangsung } from './umum/entitas/ProyekLangsung'
  import { get } from 'svelte/store'
  import { DiagramKlasLangsung } from './umum/entitas/DiagramKlasLangsung'
  import type { KlasLangsung } from './umum/entitas/KlasLangsung'
  import PanelKanan from './umum/ui/panel-kanan/PanelKanan.svelte'

  // === Atribut ===

  // proyek
  let proyek = $state(new ProyekLangsung())

  // penyimpanan
  let lokasiPenyimpananProyek = ''

  // klas
  const koleksiDiagramKlasLangsung = proyek.dapatkanKoleksiDiagramKlasLangsung()
  let koleksiSequenceDiagram: SequenceDiagram[] = $state([])
  let modelAktif: Model | null = $state(null)

  // diagram kasus guna
  const koleksiDiagramKasusGuna = proyek.dapatkanKoleksiDiagramKasusGuna()

  let pesan: string | null = $state(null)

  async function bukaProyek(): Promise<void> {
    // const dataProyek = await window.mesin.bukaProyek()
    // if (!dataProyek) {
    //   return
    // }
    // proyek = Proyek.bongkarBungkusanData(dataProyek.data)
    // lokasiPenyimpananProyek = dataProyek.lokasi
    // modelAktif = proyek.koleksiSequenceDiagram[0]
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

  // Klas
  function tambahKlasBaru(): KlasLangsung {
    return proyek.tambahKlasBaru()
  }

  function ubahNamaKlas(klas: KlasLangsung, nama: string): void {
    proyek.ubahNamaKlas(klas, nama)
  }

  function hapusKlas(klas: Klas): void {
    proyek.hapusKlas(klas)
  }

  // Diagram kasus guna
  function buatDiagramKasusGuna(): void {
    proyek.buatDiagramKasusGuna()
  }

  // Diagram urutan
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

  async function bukaDiagramKlas(indeks: number): Promise<void> {
    modelAktif = (await get(koleksiDiagramKlasLangsung))[indeks]
  }

  function buatDiagramKlas(): void {
    const diagramKlas = proyek.tambahDiagramKlasBaru()
    modelAktif = diagramKlas
  }

  function hasilkanKode(): void {
    window.mesin.hasilkanKode(proyek.bungkusData())
  }

  // pesan
  function tampilkanPesan(pPesan: string): void {
    pesan = pPesan
  }

  function tutupPesan(): void {
    pesan = null
  }

  onMount(() => {
    koleksiSequenceDiagram = proyek.koleksiSequenceDiagram
  })
</script>

{#if pesan}
  <TampilanPesan {pesan} oke={tutupPesan} />
{/if}

<Dasar>
  <PanelAtas saatBukaProyekDiklik={bukaProyek} saatSimpanDiklik={simpanProyek} {hasilkanKode} />
  <div class="flex-grow flex items-stretch">
    <PanelKiri
      koleksiDiagramKasusGuna={$koleksiDiagramKasusGuna}
      {koleksiSequenceDiagram}
      saatBuatSequenceDiagram={buatSequenceDiagram}
      {modelAktif}
      saatBukaSequenceDiagram={bukaSequenceDiagram}
      koleksiDiagramKlasLangsung={$koleksiDiagramKlasLangsung}
      saatBuatDiagramKlas={buatDiagramKlas}
      saatBukaDiagramKlas={bukaDiagramKlas}
      {buatDiagramKasusGuna}
    />
    <Jendela>
      {#if modelAktif instanceof SequenceDiagram}
        <TampilanSequenceDiagram
          {tambahKlasBaru}
          sequenceDiagram={modelAktif}
          saatSequenceDiagramDiperbarui={perbaruiSequenceDiagram}
        />
      {:else if modelAktif instanceof DiagramKlasLangsung}
        <TampilanDiagramKlas
          diagramKlas={modelAktif}
          {tambahKlasBaru}
          {ubahNamaKlas}
          {hapusKlas}
          {tampilkanPesan}
        />
      {/if}
    </Jendela>
    <PanelKanan {proyek} />
  </div>
</Dasar>
