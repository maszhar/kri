<script lang="ts">
  import { onMount } from 'svelte'
  import Dasar from './umum/ui/Dasar.svelte'
  import Jendela from './umum/ui/Jendela.svelte'
  import PanelAtas from './umum/ui/panel-atas/PanelAtas.svelte'
  import TampilanSequenceDiagram from './sequence/ui/TampilanSequenceDiagram.svelte'
  import type { Model } from '../../umum/entitas/Model'
  import { SequenceDiagram } from '../../umum/entitas/SequenceDiagram'
  import type { Kelas } from '../../umum/entitas/Kelas'
  import PanelKiri from './umum/ui/panel-kiri/PanelKiri.svelte'
  import TampilanDiagramKlas from './klas/TampilanDiagramKlas.svelte'
  import TampilanPesan from './umum/ui/TampilanPesan.svelte'
  import { ProyekLangsungLama } from './umum/entitas/ProyekLangsungLama'
  import { get } from 'svelte/store'
  import { DiagramKlasLangsung } from './umum/entitas/DiagramKlasLangsung'
  import type { KlasLangsung } from './umum/entitas/KlasLangsung'
  import PanelKanan from './umum/ui/panel-kanan/PanelKanan.svelte'
  import { CeritaPenggunaLangsung } from './umum/entitas/CeritaPenggunaLangsung'
  import TampilanCeritaPengguna from './cerita/TampilanCeritaPengguna.svelte'
  import { ProyekLangsung } from './umum/entitas/ProyekLangsung.svelte'

  // === Atribut ===

  // proyek
  let proyek = $state(new ProyekLangsung())

  let proyekLama = $state(new ProyekLangsungLama())

  // penyimpanan
  let lokasiPenyimpananProyek = ''

  // cerita pengguna
  const koleksiCeritaPengguna = proyekLama.dapatkanKoleksiCeritaPenggunaLangsung()

  // klas
  const koleksiDiagramKlasLangsung = proyekLama.dapatkanKoleksiDiagramKlasLangsung()
  let koleksiSequenceDiagram: SequenceDiagram[] = $state([])
  let modelAktif: Model | null = $state(null)

  // diagram kasus guna
  const koleksiDiagramKasusGuna = proyekLama.dapatkanKoleksiDiagramKasusGuna()

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

    await window.mesin.simpanProyek(lokasiPenyimpananProyek, proyekLama.bungkusData())
  }

  // cerita pengguna
  function bukaCeritaPengguna(ceritaPengguna: CeritaPenggunaLangsung): void {
    modelAktif = ceritaPengguna
  }

  function buatCeritaPengguna(): void {
    const ceritaBaru = proyekLama.buatCeritaPengguna()
    modelAktif = ceritaBaru
  }

  // Kelas
  function tambahKlasBaru(): KlasLangsung {
    return proyekLama.tambahKlasBaru()
  }

  function ubahNamaKlas(klas: KlasLangsung, nama: string): void {
    proyekLama.ubahNamaKlas(klas, nama)
  }

  function hapusKlas(klas: Kelas): void {
    proyekLama.hapusKlas(klas)
  }

  // Diagram kasus guna
  function buatDiagramKasusGuna(): void {
    proyekLama.buatDiagramKasusGuna()
  }

  // Diagram urutan
  function bukaSequenceDiagram(indeks: number): void {
    modelAktif = koleksiSequenceDiagram[indeks]
  }

  function buatSequenceDiagram(): void {
    const sequenceDiagram = proyekLama.tambahSequenceDiagramBaru()
    modelAktif = sequenceDiagram
    koleksiSequenceDiagram = proyekLama.koleksiSequenceDiagram
  }

  function perbaruiSequenceDiagram(): void {
    const indeksSequenceDiagramLamaTerkait = koleksiSequenceDiagram.findIndex(
      (sequenceDiagramLama) => sequenceDiagramLama == modelAktif
    )
    if (indeksSequenceDiagramLamaTerkait < 0) {
      return
    }
    proyekLama.buatKlonaSequenceDiagram(indeksSequenceDiagramLamaTerkait)
    koleksiSequenceDiagram = proyekLama.koleksiSequenceDiagram
    modelAktif = koleksiSequenceDiagram[indeksSequenceDiagramLamaTerkait]
  }

  async function bukaDiagramKlas(indeks: number): Promise<void> {
    modelAktif = (await get(koleksiDiagramKlasLangsung))[indeks]
  }

  function buatDiagramKlas(): void {
    const diagramKlas = proyekLama.tambahDiagramKlasBaru()
    modelAktif = diagramKlas
  }

  function hasilkanKode(): void {
    window.mesin.hasilkanKode(proyekLama.bungkusData())
  }

  // pesan
  function tampilkanPesan(pPesan: string): void {
    pesan = pPesan
  }

  function tutupPesan(): void {
    pesan = null
  }

  onMount(() => {
    koleksiSequenceDiagram = proyekLama.koleksiSequenceDiagram
  })
</script>

<svelte:head>
  <title>{proyek.dapatkanNamaLangsung()} | Kri</title>
</svelte:head>

{#if pesan}
  <TampilanPesan {pesan} oke={tutupPesan} />
{/if}

<Dasar>
  <PanelAtas saatBukaProyekDiklik={bukaProyek} saatSimpanDiklik={simpanProyek} {hasilkanKode} />
  <div class="flex-grow flex items-stretch">
    <PanelKiri
      {proyek}
      {modelAktif}
      koleksiCeritaPengguna={$koleksiCeritaPengguna}
      koleksiDiagramKasusGuna={$koleksiDiagramKasusGuna}
      {koleksiSequenceDiagram}
      {bukaCeritaPengguna}
      {buatCeritaPengguna}
      saatBuatSequenceDiagram={buatSequenceDiagram}
      saatBukaSequenceDiagram={bukaSequenceDiagram}
      koleksiDiagramKlasLangsung={$koleksiDiagramKlasLangsung}
      saatBuatDiagramKlas={buatDiagramKlas}
      saatBukaDiagramKlas={bukaDiagramKlas}
      {buatDiagramKasusGuna}
    />
    <Jendela>
      {#if modelAktif instanceof CeritaPenggunaLangsung}
        <TampilanCeritaPengguna ceritaPengguna={modelAktif} />
      {:else if modelAktif instanceof SequenceDiagram}
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
    <PanelKanan proyek={proyekLama} />
  </div>
</Dasar>
