<script lang="ts">
  import type { ElemenKlas } from '../../../umum/entitas/ElemenKlas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'
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
    terapkanPerubahanKlas: () => void
  }
  let {
    elemenKlas,
    adaYangMengedit,
    dipilih,
    indeks,
    mintaDipilih,
    dapatkanKoordinatPojokKiriAtasKanvas,
    terapkanPerubahanKlas
  }: Properti = $props()

  let elemen: HTMLDivElement

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

  // Edit nama
  let mengedit = $state(false)
  let namaKlasSementara = $state('')
  let elemenInputNamaKlas: HTMLInputElement | null = $state(null)

  function mulaiMengedit(): void {
    window.addEventListener('click', tanganiKlikSaatMengedit)
    namaKlasSementara = nama
    mengedit = true
  }

  function tanganiKlikSaatMengedit(e: MouseEvent): void {
    e.stopPropagation()
    if (elemenInputNamaKlas.contains(e.target as Node)) {
      return
    }
    akhiriMengedit()
  }

  function akhiriMengedit(terapkan = true): void {
    window.removeEventListener('click', tanganiKlikSaatMengedit)
    if (terapkan) {
      elemenKlas.klas.nama = namaKlasSementara
      terapkanPerubahanKlas()
    }
    namaKlasSementara = ''
    mengedit = false
  }

  function tanganiKeyboardTurunDiInputNamaKlas(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === 'Tab') {
      akhiriMengedit()
    } else if (e.key === 'Escape') {
      akhiriMengedit(false)
    }
  }

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
  let sedangMembuatAtributBaru = $state(false)
  function mulaiMembuatAtributBaru(): void {
    sedangMembuatAtributBaru = true
  }
  function batalkanEditAtribut(): void {
    if (sedangMembuatAtributBaru) {
      sedangMembuatAtributBaru = false
    }
  }

  $effect(() => {
    if (mengedit === true && elemenInputNamaKlas !== null) {
      elemenInputNamaKlas.focus()
      elemenInputNamaKlas.select()
    }
  })
</script>

{#if posisiMenuModifikasiKlas !== null}
  <MenuKonteks posisi={posisiMenuModifikasiKlas}>
    <JudulMenuKonteks>Tambah Fitur</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={mulaiMembuatAtributBaru}>Tambah Atribut</ItemMenuKonteks>
    <ItemMenuKonteks>Tambah Operasi</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<div
  bind:this={elemen}
  class={`absolute bg-white border ${adaYangMengedit ? 'cursor-default' : 'cursor-move'} ${dipilih ? 'border-blue-600 ring-2 ring-blue-600' : 'border-black'}`}
  onmousedown={tanganiMouseTurun}
  role="button"
  tabindex={30000 + indeks}
  onkeydown={(): void => {}}
  style={`left: ${posisi.x}px; top: ${posisi.y}px;`}
  oncontextmenu={bukaMenuModifikasiKlas}
>
  <div
    class="relative select-none font-bold py-1 px-4"
    ondblclick={mulaiMengedit}
    role="button"
    tabindex={40000 + indeks}
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
      {#each koleksiAtribut as atribut}
        <TampilanAtribut {atribut} batalkanMengedit={batalkanEditAtribut} />
      {/each}

      {#if sedangMembuatAtributBaru}
        <TampilanAtribut batalkanMengedit={batalkanEditAtribut} />
      {/if}
    </TampilanKompartemen>
  {/if}
</div>
