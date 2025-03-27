<script lang="ts">
  import type { ParameterBuatAtribut } from '../../../umum/entitas/Atribut'
  import type { ElemenKlas } from '../../../umum/entitas/ElemenKlas'
  import type { Klas } from '../../../umum/entitas/Klas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'
  import { GalatNamaSama } from '../../../umum/galat/GalatNamaSama'
  import ItemMenuKonteks from '../umum/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../umum/ui/JudulMenuKonteks.svelte'
  import MenuKonteks from '../umum/ui/MenuKonteks.svelte'
  import TampilanAtribut from './TampilanAtribut.svelte'
  import TampilanKompartemen from './TampilanKompartemen.svelte'

  interface Properti {
    elemenKlas: ElemenKlas
    adaYangMengedit: boolean
    dipilih: boolean
    mintaDipilih: () => void
    indeks: number
    dapatkanKoordinatPojokKiriAtasKanvas: () => Koordinat
    ubahNamaElemenKlas: (klas: Klas, nama: string) => void
    mulaiMengedit: () => void
    akhiriMengedit: () => void
    hapus: () => void
    tampilkanPesan: (pesan: string) => void
  }
  let {
    elemenKlas,
    adaYangMengedit,
    dipilih,
    indeks,
    mintaDipilih,
    dapatkanKoordinatPojokKiriAtasKanvas,
    ubahNamaElemenKlas,
    mulaiMengedit,
    akhiriMengedit,
    hapus,
    tampilkanPesan
  }: Properti = $props()

  let nama = $state(elemenKlas.klas.nama)
  let posisi = $state(elemenKlas.posisi)
  let koleksiAtribut = $state(elemenKlas.klas.koleksiAtribut)

  $effect(() => {
    nama = elemenKlas.klas.nama
    koleksiAtribut = elemenKlas.klas.koleksiAtribut
  })

  // Perpindahan posisi elemen
  let titikPojokKiriAtasKanvas: Koordinat | null = null
  let bedaTitikKursorDanElemenSaatAwalMemindah: Koordinat | null = null

  function tanganiMouseTurun(e: MouseEvent): void {
    if (!adaYangMengedit) {
      mintaDipilih()
      titikPojokKiriAtasKanvas = dapatkanKoordinatPojokKiriAtasKanvas()
      bedaTitikKursorDanElemenSaatAwalMemindah = new Koordinat(
        e.clientX - titikPojokKiriAtasKanvas.x - elemenKlas.posisi.x,
        e.clientY - titikPojokKiriAtasKanvas.y - elemenKlas.posisi.y
      )
      window.addEventListener('mouseup', tanganiMouseNaikSaatMemindahElemen)
      window.addEventListener('mousemove', tanganiMousePindahSaatMemindahElemen)
    }
  }

  function tanganiMousePindahSaatMemindahElemen(e: MouseEvent): void {
    elemenKlas.posisi = new Koordinat(
      e.clientX - titikPojokKiriAtasKanvas.x - bedaTitikKursorDanElemenSaatAwalMemindah.x,
      e.clientY - titikPojokKiriAtasKanvas.y - bedaTitikKursorDanElemenSaatAwalMemindah.y
    )
    posisi = elemenKlas.posisi
  }

  function tanganiMouseNaikSaatMemindahElemen(): void {
    window.removeEventListener('mouseup', tanganiMouseNaikSaatMemindahElemen)
    window.removeEventListener('mousemove', tanganiMousePindahSaatMemindahElemen)
    bedaTitikKursorDanElemenSaatAwalMemindah = null
  }

  // Edit nama klas
  let mengedit = $state(false)
  let namaKlasSementara = $state('')
  let elemenInputNamaKlas: HTMLInputElement | null = $state(null)

  function mulaiMengeditNamaKlas(): void {
    window.addEventListener('click', tanganiKlikSaatMengedit)
    namaKlasSementara = nama
    mengedit = true
    mulaiMengedit()
  }

  function tanganiKlikSaatMengedit(e: MouseEvent): void {
    e.stopPropagation()
    if (elemenInputNamaKlas.contains(e.target as Node)) {
      return
    }
    akhiriMengeditNamaKlas()
  }

  function akhiriMengeditNamaKlas(terapkan = true): void {
    window.removeEventListener('click', tanganiKlikSaatMengedit)
    if (terapkan) {
      ubahNamaElemenKlas(elemenKlas.klas, namaKlasSementara)
    }
    namaKlasSementara = ''
    mengedit = false
    akhiriMengedit()
  }

  function tanganiKeyboardTurunDiInputNamaKlas(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === 'Tab') {
      akhiriMengeditNamaKlas()
    } else if (e.key === 'Escape') {
      akhiriMengeditNamaKlas(false)
    }
  }

  $effect(() => {
    if (mengedit === true && elemenInputNamaKlas !== null) {
      elemenInputNamaKlas.focus()
      elemenInputNamaKlas.select()
    }
  })

  // menu
  let posisiMenuModifikasiKlas: Koordinat | null = $state(null)

  function bukaMenuModifikasiKlas(e: MouseEvent): void {
    posisiMenuModifikasiKlas = new Koordinat(e.clientX, e.clientY)
    window.addEventListener('click', tutupMenuModifikasiKlas)
  }

  function tutupMenuModifikasiKlas(): void {
    window.removeEventListener('click', tutupMenuModifikasiKlas)
    posisiMenuModifikasiKlas = null
  }

  // buat atribut
  let elemenAtributBaru: TampilanAtribut | null = $state(null)
  let sedangMembuatAtributBaru = $state(false)

  function mulaiMembuatAtributBaru(e: MouseEvent): void {
    e.stopPropagation()
    tutupMenuModifikasiKlas()
    sedangMembuatAtributBaru = true
  }

  $effect(() => {
    if (sedangMembuatAtributBaru && elemenAtributBaru) {
      elemenAtributBaru.mulaiMengeditAtribut()
    }
  })

  // edit atribut
  function batalkanEditAtribut(): void {
    if (sedangMembuatAtributBaru) {
      sedangMembuatAtributBaru = false
    }
    akhiriMengedit()
  }

  function selesaikanEditAtribut(indeks: number, parameterBuatAtribut: ParameterBuatAtribut): void {
    try {
      if (sedangMembuatAtributBaru && parameterBuatAtribut) {
        sedangMembuatAtributBaru = false
        elemenKlas.klas.tambahAtributBaru(parameterBuatAtribut)
      } else if (!sedangMembuatAtributBaru) {
        elemenKlas.klas.ubahAtribut(indeks, parameterBuatAtribut)
      }
      koleksiAtribut = elemenKlas.klas.koleksiAtribut
      akhiriMengedit()
    } catch (e: any) {
      if (e instanceof GalatNamaSama) {
        tampilkanPesan(`Nama atribut '${e.nama}' telah digunakan dalam klas ini.`)
        akhiriMengedit()
      } else {
        throw e
      }
    }
  }
</script>

{#if posisiMenuModifikasiKlas !== null}
  <MenuKonteks posisi={posisiMenuModifikasiKlas}>
    <JudulMenuKonteks>Tambah Fitur</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={mulaiMembuatAtributBaru}>Tambah Atribut</ItemMenuKonteks>
    <ItemMenuKonteks>Tambah Operasi</ItemMenuKonteks>
    <JudulMenuKonteks>Hapus</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={hapus}>Hapus</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<div
  class={`absolute bg-white border ${adaYangMengedit ? 'cursor-default' : 'cursor-move'} ${dipilih ? 'border-blue-600 ring-2 ring-blue-600' : 'border-black'}`}
  onmousedown={tanganiMouseTurun}
  role="button"
  tabindex={30000 + indeks}
  onkeydown={(): void => {}}
  style={`left: ${posisi.x}px; top: ${posisi.y}px;`}
  oncontextmenu={bukaMenuModifikasiKlas}
>
  <div
    class="relative select-none font-bold py-1 px-4 text-center"
    ondblclick={mulaiMengeditNamaKlas}
    role="button"
    tabindex={(40000 + indeks) * 100000}
  >
    {#if mengedit}
      <input
        bind:this={elemenInputNamaKlas}
        class="absolute outline-none z-10 px-2 text-center left-1/2 -translate-x-1/2"
        type="text"
        style={`width: ${namaKlasSementara.length + 3}ch`}
        bind:value={namaKlasSementara}
        onkeydown={tanganiKeyboardTurunDiInputNamaKlas}
      />
    {/if}
    <span class={mengedit ? 'opacity-0' : ''}>
      {nama}
    </span>
  </div>

  <!-- Kompartemen Atribut -->
  {#if koleksiAtribut.length > 0 || sedangMembuatAtributBaru}
    <TampilanKompartemen>
      {#each koleksiAtribut as atribut, indeksAtribut}
        <TampilanAtribut
          indeksKlas={indeks}
          indeksAtribut={indeksAtribut + 1}
          {atribut}
          {mulaiMengedit}
          batalkanMengedit={batalkanEditAtribut}
          selesaiMengedit={(parameter?: ParameterBuatAtribut): void =>
            selesaikanEditAtribut(indeksAtribut, parameter)}
        />
      {/each}

      {#if sedangMembuatAtributBaru}
        <TampilanAtribut
          bind:this={elemenAtributBaru}
          indeksKlas={indeks}
          indeksAtribut={0}
          batalkanMengedit={batalkanEditAtribut}
          selesaiMengedit={(parameter?: ParameterBuatAtribut): void =>
            selesaikanEditAtribut(0, parameter)}
        />
      {/if}
    </TampilanKompartemen>
  {/if}
</div>
