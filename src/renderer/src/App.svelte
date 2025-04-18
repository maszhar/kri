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

  // === Atribut ===

  // proyek
  let proyek = $state(new ProyekLangsung())

  let proyekLama = $state(new ProyekLangsungLama())

  // penyimpanan
  let lokasiPenyimpananProyek = ''

  let isiProyekAktif: IsiProyek | null = $state(null)

  let pesan: string | null = $state(null)

  async function bukaProyek(): Promise<void> {
    const dataProyek = await window.mesin.bukaProyek()
    if (!dataProyek) {
      return
    }
    isiProyekAktif = null
    proyek = ProyekLangsung.deserialisasi(dataProyek.data)
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

    console.log(proyek.serialisasi())
    await window.mesin.simpanProyek(lokasiPenyimpananProyek, proyek.serialisasi())
  }

  function hasilkanKode(): void {
    window.mesin.hasilkanKode(proyekLama.bungkusData())
  }

  function tutupPesan(): void {
    pesan = null
  }

  // isi proyek aktif
  function bukaIsiProyek(isiProyek: IsiProyek): void {
    isiProyekAktif = isiProyek
  }
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
      {isiProyekAktif}
      bukaSistem={(sistem: SistemLangsung): void => bukaIsiProyek(sistem)}
    />
    <Jendela>
      {#if isiProyekAktif instanceof SistemLangsung}
        <TampilanKonfigurasiSistem sistem={isiProyekAktif} />
      {/if}
    </Jendela>
    <PanelKanan proyek={proyekLama} />
  </div>
</Dasar>
