<script lang="ts">
  import { get } from 'svelte/store'
  import type { ParameterBuatAtribut } from '../../../umum/entitas/Atribut'
  import type { ElemenKlas } from '../../../umum/entitas/ElemenKlas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'
  import type { ParameterBuatOperasi } from '../../../umum/entitas/Operasi'
  import { GalatNamaSama } from '../../../umum/galat/GalatNamaSama'
  import { TipeElemen } from '../../../umum/tipe/TipeElemen'
  import TampilanKursorMulaiKoneksi from '../sequence/ui/TampilanKursorMulaiKoneksi.svelte'
  import type { ElemenKlasLangsung } from '../umum/entitas/ElemenKlasLangsung'
  import ItemMenuKonteks from '../umum/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../umum/ui/JudulMenuKonteks.svelte'
  import MenuKonteks from '../umum/ui/MenuKonteks.svelte'
  import TampilanAtribut from './TampilanAtribut.svelte'
  import TampilanKompartemen from './TampilanKompartemen.svelte'
  import TampilanOperasi from './TampilanOperasi.svelte'
  import type { KlasLangsung } from '../umum/entitas/KlasLangsung'

  // === ATRIBUT ===

  interface Properti {
    elemenKlas: ElemenKlasLangsung
    adaYangMengedit: boolean
    dipilih: boolean
    mintaDipilih: () => void
    indeks: number
    dapatkanKoordinatPojokKiriAtasKanvas: () => Koordinat
    ubahNamaElemenKlas: (idKlas: KlasLangsung, nama: string) => void
    mulaiMengedit: () => void
    akhiriMengedit: () => void
    hapus: () => void
    tampilkanPesan: (pesan: string) => void
    mulaiBuatAsosiasi: (titikAwal: Koordinat, elemen: ElemenKlas) => void
    akhiriBuatAsosiasi: () => void
    elemenMembuatAsosiasi: ElemenKlas | null
    tetapkanTujuanAsosiasi: (tujuan: ElemenKlas) => void
    batalkanPenetapanTujuanAsosiasi: () => void
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
    tampilkanPesan,
    mulaiBuatAsosiasi,
    akhiriBuatAsosiasi,
    elemenMembuatAsosiasi,
    tetapkanTujuanAsosiasi,
    batalkanPenetapanTujuanAsosiasi
  }: Properti = $props()

  // data
  const klasLangsung = elemenKlas.dapatkanKlasLangsung()
  const nama = klasLangsung.dapatkanNamaLangsung()
  let posisi = $state(elemenKlas.posisi)
  let koleksiAtribut = $state(elemenKlas.klas.koleksiAtribut)
  let koleksiOperasi = $state(elemenKlas.klas.koleksiOperasi)

  // elemen web
  let elemenTampilanElemenKlas: HTMLDivElement
  let elemenTitikSentuhAsosiasi: HTMLDivElement

  // titik sentuh asosiasi
  let titikSentuhAsosiasiDisentuh: boolean = $state(false)
  let posisiKursorMulaiAsosiasi: Koordinat | null = $state(null)

  // sebagai target buat asosiasi
  let sebagaiTargetBuatAsosiasi: boolean = $state(false)

  // === OPERASI ===
  $effect(() => {
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

  // posisi elemen
  export function dapatkanTitikTengahKiri(): Koordinat {
    return new Koordinat(posisi.x, posisi.y + Math.floor(elemenTampilanElemenKlas.clientHeight / 2))
  }

  // Edit nama klas
  let mengedit = $state(false)
  let namaKlasSementara = $state('')
  let elemenInputNamaKlas: HTMLInputElement | null = $state(null)

  async function mulaiMengeditNamaKlas(): Promise<void> {
    namaKlasSementara = await get(nama)
    window.addEventListener('click', tanganiKlikSaatMengedit)
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
      ubahNamaElemenKlas(klasLangsung, namaKlasSementara)
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
        tampilkanGalatNamaSama(e)
        akhiriMengedit()
      } else {
        throw e
      }
    }
  }

  // buat operasi
  let elemenOperasiBaru: TampilanOperasi | null = $state(null)
  let sedangMembuatOperasiBaru = $state(false)

  function mulaiBuatOperasiBaru(e: MouseEvent): void {
    e.stopPropagation()
    // buatAtributupMenuModifikasiKlas()
    sedangMembuatOperasiBaru = true
  }

  $effect(() => {
    if (sedangMembuatOperasiBaru && elemenOperasiBaru) {
      elemenOperasiBaru.mulaiEditOperasi()
    }
  })

  // edit operasi
  function batalkanEditOperasi(): void {
    if (sedangMembuatOperasiBaru) {
      sedangMembuatOperasiBaru = false
    }
    akhiriMengedit()
  }

  function selesaikanEditOperasi(indeks: number, parameterBuatOperasi: ParameterBuatOperasi): void {
    try {
      if (sedangMembuatOperasiBaru && parameterBuatOperasi) {
        sedangMembuatOperasiBaru = false
        elemenKlas.klas.tambahOperasiBaru(parameterBuatOperasi)
      } else if (!sedangMembuatOperasiBaru) {
        elemenKlas.klas.ubahOperasi(indeks, parameterBuatOperasi)
      }
      koleksiOperasi = elemenKlas.klas.koleksiOperasi
      akhiriMengedit()
    } catch (e: any) {
      if (e instanceof GalatNamaSama) {
        tampilkanGalatNamaSama(e)
        akhiriMengedit()
      } else {
        throw e
      }
    }
  }

  function tampilkanGalatNamaSama(e: GalatNamaSama): void {
    let tipe = 'elemen'
    switch (e.tipe) {
      case TipeElemen.ATRIBUT:
        tipe = 'atribut'
        break
      case TipeElemen.OPERASI:
        tipe = 'operasi'
        break
      default:
    }

    let pesan = `Nama '${e.nama}' telah digunakan untuk nama ${tipe} dalam klas ini.`
    tampilkanPesan(pesan)
  }

  // titik sentuh asosiasi
  function tanganiMouseMasukKeTitikSentuhAsosiasi(): void {
    if (!adaYangMengedit) {
      titikSentuhAsosiasiDisentuh = true
    }
  }

  function tanganiMouseGerakDiTitikSentuhAsosiasi(e: MouseEvent): void {
    if (titikSentuhAsosiasiDisentuh) {
      const posisiKursorKiri = e.offsetX
      const posisiKursorAtas = e.offsetY

      const styleTitikSentuh = window.getComputedStyle(elemenTitikSentuhAsosiasi, null)

      const jarakTitikSentuhAtas = parseFloat(
        styleTitikSentuh.getPropertyValue('top').replace('px', '')
      )
      const jarakTitikSentuhKiri = parseFloat(
        styleTitikSentuh.getPropertyValue('left').replace('px', '')
      )

      const posisiKiri = posisiKursorKiri + jarakTitikSentuhKiri
      const posisiAtas = posisiKursorAtas + jarakTitikSentuhAtas

      const posisiKiriDikoreksi = Math.min(
        Math.max(0, posisiKiri),
        elemenTitikSentuhAsosiasi.clientWidth + 2 * jarakTitikSentuhKiri
      )
      const posisiAtasDikoreksi = Math.min(
        Math.max(0, posisiAtas),
        elemenTitikSentuhAsosiasi.clientHeight + 2 * jarakTitikSentuhAtas
      )

      posisiKursorMulaiAsosiasi = new Koordinat(posisiKiriDikoreksi, posisiAtasDikoreksi)
    }
  }

  function tanganiMouseKeluarDariTitikSentuhAsosiasi(): void {
    if (titikSentuhAsosiasiDisentuh) {
      titikSentuhAsosiasiDisentuh = false
      posisiKursorMulaiAsosiasi = null
    }
  }

  function tanganiMouseTurunDiTitikSentuhAsosiasi(e: MouseEvent): void {
    const styleTitikSentuh = window.getComputedStyle(elemenTitikSentuhAsosiasi, null)

    const jarakTitikSentuhAtas = parseFloat(
      styleTitikSentuh.getPropertyValue('top').replace('px', '')
    )
    const jarakTitikSentuhKiri = parseFloat(
      styleTitikSentuh.getPropertyValue('left').replace('px', '')
    )

    const posisiKursorKiri = Math.min(
      Math.max(0, e.offsetX + jarakTitikSentuhKiri),
      elemenTitikSentuhAsosiasi.clientWidth + 2 * jarakTitikSentuhKiri
    )

    const posisiKursorAtas = Math.min(
      Math.max(0, e.offsetY + jarakTitikSentuhAtas),
      elemenTitikSentuhAsosiasi.clientHeight + 2 * jarakTitikSentuhAtas
    )

    const titikAwal = new Koordinat(
      elemenKlas.posisi.x + posisiKursorKiri,
      elemenKlas.posisi.y + posisiKursorAtas
    )
    mulaiBuatAsosiasi(titikAwal, elemenKlas)
    window.addEventListener('mouseup', tanganiMouseNaikSaatBuatAsosiasi)
  }

  function tanganiMouseNaikSaatBuatAsosiasi(e: MouseEvent): void {
    e.stopPropagation()
    window.removeEventListener('mouseup', tanganiMouseNaikSaatBuatAsosiasi)
    akhiriBuatAsosiasi()
  }

  // buat asosiasi
  function tanganiMouseMasukKeElemenKlas(): void {
    if (elemenMembuatAsosiasi) {
      sebagaiTargetBuatAsosiasi = true
      tetapkanTujuanAsosiasi(elemenKlas)
    }
  }

  function tanganiMouseKeluarDariElemenKlas(): void {
    if (elemenMembuatAsosiasi) {
      sebagaiTargetBuatAsosiasi = false
      batalkanPenetapanTujuanAsosiasi()
    }
  }

  $effect(() => {
    if (elemenMembuatAsosiasi === null && sebagaiTargetBuatAsosiasi) {
      sebagaiTargetBuatAsosiasi = false
    }
  })

  function tanganiDrag(e: DragEvent): void {
    e.preventDefault()
  }
</script>

{#if posisiMenuModifikasiKlas !== null}
  <MenuKonteks posisi={posisiMenuModifikasiKlas}>
    <JudulMenuKonteks>Tambah Fitur</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={mulaiMembuatAtributBaru}>Tambah Atribut</ItemMenuKonteks>
    <ItemMenuKonteks saatDiklik={mulaiBuatOperasiBaru}>Tambah Operasi</ItemMenuKonteks>
    <JudulMenuKonteks>Hapus</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={hapus}>Hapus</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<div class="absolute" style={`left: ${posisi.x}px; top: ${posisi.y}px;`}>
  <!-- Titik sentuh asosiasi -->
  <div
    bind:this={elemenTitikSentuhAsosiasi}
    class="absolute -top-2 -left-2"
    style="width: calc(100% + 16px); height: calc(100% + 16px);"
    onmouseenter={tanganiMouseMasukKeTitikSentuhAsosiasi}
    onmousemove={tanganiMouseGerakDiTitikSentuhAsosiasi}
    onmouseleave={tanganiMouseKeluarDariTitikSentuhAsosiasi}
    onmousedown={tanganiMouseTurunDiTitikSentuhAsosiasi}
    ondragstart={tanganiDrag}
    role="button"
    tabindex={(40000 + indeks) * 100000 + 90000}
  ></div>

  <!-- Elemen Klas -->
  <div
    class={`relative bg-white border ${adaYangMengedit || elemenMembuatAsosiasi !== null ? 'cursor-default' : 'cursor-move'} ${dipilih ? 'border-blue-600 ring-2 ring-blue-600' : 'border-black'} ${sebagaiTargetBuatAsosiasi ? 'ring-3 border-green-700 ring-green-400' : ''}`}
    onmouseenter={tanganiMouseMasukKeElemenKlas}
    onmouseleave={tanganiMouseKeluarDariElemenKlas}
    onmousedown={tanganiMouseTurun}
    role="button"
    tabindex={30000 + indeks}
    onkeydown={(): void => {}}
    oncontextmenu={bukaMenuModifikasiKlas}
    ondragstart={tanganiDrag}
    bind:this={elemenTampilanElemenKlas}
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
        {$nama}
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

    <!-- Kompartemen Operasi -->
    {#if koleksiOperasi.length > 0 || sedangMembuatOperasiBaru}
      <TampilanKompartemen>
        {#each koleksiOperasi as operasi, indeksOperasi}
          <TampilanOperasi
            {operasi}
            indeksKlas={indeks}
            indeksOperasi={indeksOperasi + 1}
            {mulaiMengedit}
            batalkanMengedit={batalkanEditOperasi}
            selesaiMengedit={(parameter: ParameterBuatOperasi): void =>
              selesaikanEditOperasi(indeksOperasi, parameter)}
          />
        {/each}

        {#if sedangMembuatOperasiBaru}
          <TampilanOperasi
            indeksKlas={indeks}
            indeksOperasi={0}
            {mulaiMengedit}
            batalkanMengedit={batalkanEditOperasi}
            selesaiMengedit={(parameter: ParameterBuatOperasi): void =>
              selesaikanEditOperasi(0, parameter)}
            bind:this={elemenOperasiBaru}
          />
        {/if}
      </TampilanKompartemen>
    {/if}
  </div>

  {#if titikSentuhAsosiasiDisentuh && posisiKursorMulaiAsosiasi}
    <TampilanKursorMulaiKoneksi posisi={posisiKursorMulaiAsosiasi} />
  {/if}
</div>
