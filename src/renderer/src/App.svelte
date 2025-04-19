<script lang="ts">
  import Dasar from './umum/ui/Dasar.svelte'
  import Jendela from './umum/ui/Jendela.svelte'
  import PanelAtas from './umum/ui/panel-atas/PanelAtas.svelte'
  import PanelKiri from './umum/ui/panel-kiri/PanelKiri.svelte'
  import TampilanPesan from './umum/ui/TampilanPesan.svelte'
  import { ProyekLangsungLama } from './umum/entitas/ProyekLangsungLama'
  import PanelKanan from './umum/ui/panel-kanan/PanelKanan.svelte'
  import { ProyekLangsung } from './umum/entitas/ProyekLangsung.svelte'
  import type { IsiProyek } from '../../umum/entitas/IsiProyek'
  import { SistemLangsung } from './umum/entitas/SistemLangsung.svelte'
  import TampilanKonfigurasiSistem from './sistem/TampilanKonfigurasiSistem.svelte'
  import TampilanEditorKelas from './kelas/TampilanEditorKelas.svelte'
  import { KelasLangsung } from './umum/entitas/KelasLangsung.svelte'
  import { Pesan } from './umum/entitas/Pesan.svelte'

  // === Atribut ===

  // proyek
  let proyek = $state(new ProyekLangsung())
  let waktuLoad = $state(new Date().getTime())

  let proyekLama = $state(new ProyekLangsungLama())

  // penyimpanan
  let lokasiPenyimpananProyek = ''

  let sistemAktif: SistemLangsung | null = $state(null)
  let isiProyekAktif: IsiProyek | null = $state(null)

  // === Operasi ===
  async function bukaProyek(): Promise<void> {
    const dataProyek = await window.mesin.bukaProyek()
    if (!dataProyek) {
      return
    }
    isiProyekAktif = null
    proyek = ProyekLangsung.deserialisasi(dataProyek.data)
    waktuLoad = new Date().getTime()
    lokasiPenyimpananProyek = dataProyek.lokasi
  }

  async function simpanProyek(): Promise<void> {
    if (lokasiPenyimpananProyek === '') {
      const lokasiPenyimpananBaru = await window.mesin.tampilkanDialogSimpanProyek()
      if (lokasiPenyimpananBaru === null) {
        return
      }

      const lokasiWindowsChunk = lokasiPenyimpananBaru.split('\\')
      const lokasiLinuxChunk = lokasiWindowsChunk[lokasiWindowsChunk.length - 1].split('/')
      const namaProyek = lokasiLinuxChunk[lokasiLinuxChunk.length - 1].replace('.kri', '')
      proyek.aturNama(namaProyek)

      lokasiPenyimpananProyek = lokasiPenyimpananBaru
    }

    await window.mesin.simpanProyek(lokasiPenyimpananProyek, proyek.serialisasi())
  }

  function hasilkanKode(): void {
    window.mesin.hasilkanKode(proyekLama.bungkusData())
  }

  // isi proyek aktif
  function bukaIsiProyek(isiProyek: IsiProyek, sistem: SistemLangsung | null): void {
    isiProyekAktif = isiProyek
    sistemAktif = sistem
  }
</script>

<svelte:head>
  <title>{proyek.dapatkanNamaLangsung()} | Kri</title>
</svelte:head>

{#if Pesan.dapatkanPesanLangsung()}
  <TampilanPesan pesan={Pesan.dapatkanPesanLangsung()} oke={(): void => Pesan.tutup()} />
{/if}

<Dasar>
  <PanelAtas saatBukaProyekDiklik={bukaProyek} saatSimpanDiklik={simpanProyek} {hasilkanKode} />
  <div class="flex-grow flex items-stretch">
    <PanelKiri {proyek} {isiProyekAktif} {bukaIsiProyek} {waktuLoad} />
    <Jendela>
      {#if isiProyekAktif instanceof SistemLangsung}
        <TampilanKonfigurasiSistem sistem={isiProyekAktif} />
      {:else if isiProyekAktif instanceof KelasLangsung && sistemAktif}
        <TampilanEditorKelas kelas={isiProyekAktif} sistem={sistemAktif} />
      {/if}
    </Jendela>
    <PanelKanan proyek={proyekLama} />
  </div>
</Dasar>
