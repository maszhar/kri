<script lang="ts">
  import type { ParameterBuatAtribut } from '../../../umum/entitas/Atribut'
  import type { ElemenKlas } from '../../../umum/entitas/ElemenKlas'
  import type { Klas } from '../../../umum/entitas/Klas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'
  import { GalatNamaSama } from '../../../umum/galat/GalatNamaSama'
  import TampilanKursorMulaiKoneksi from '../sequence/ui/TampilanKursorMulaiKoneksi.svelte'
  import ItemMenuKonteks from '../umum/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../umum/ui/JudulMenuKonteks.svelte'
  import MenuKonteks from '../umum/ui/MenuKonteks.svelte'
  import TampilanAtribut from './TampilanAtribut.svelte'
  import TampilanKompartemen from './TampilanKompartemen.svelte'

  // === ATRIBUT ===

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
    dapatkanPosisiKanvas: () => Koordinat
    mulaiBuatAsosiasi: (titikAwal: Koordinat, elemen: ElemenKlas) => void
    akhiriBuatAsosiasi: () => void
    elemenMembuatAsosiasi: ElemenKlas | null
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
    dapatkanPosisiKanvas,
    mulaiBuatAsosiasi,
    akhiriBuatAsosiasi,
    elemenMembuatAsosiasi
  }: Properti = $props()

  let nama = $state(elemenKlas.klas.nama)
  let posisi = $state(elemenKlas.posisi)
  let koleksiAtribut = $state(elemenKlas.klas.koleksiAtribut)

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

  // titik sentuh asosiasi
  function tanganiMouseMasukKeTitikSentuhAsosiasi(): void {
    if (!adaYangMengedit) {
      titikSentuhAsosiasiDisentuh = true
    }
  }

  function tanganiMouseGerakDiTitikSentuhAsosiasi(e: MouseEvent): void {
    if (titikSentuhAsosiasiDisentuh) {
      const posisiKanvas = dapatkanPosisiKanvas()

      const titikAtas = posisi.y + posisiKanvas.y
      const titikBawah = titikAtas + elemenTampilanElemenKlas.clientHeight
      const titikKiri = posisi.x + posisiKanvas.x
      const titikKanan = titikKiri + elemenTampilanElemenKlas.clientWidth

      posisiKursorMulaiAsosiasi = new Koordinat(
        Math.max(titikKiri, Math.min(titikKanan, e.clientX)),
        Math.max(titikAtas, Math.min(titikBawah, e.clientY))
      )
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
    }
  }

  function tanganiMouseKeluarDariElemenKlas(): void {
    if (elemenMembuatAsosiasi) {
      sebagaiTargetBuatAsosiasi = false
    }
  }

  $effect(() => {
    if (elemenMembuatAsosiasi === null && sebagaiTargetBuatAsosiasi) {
      sebagaiTargetBuatAsosiasi = false
    }
  })

  function tanganiDrag(e: DragEvent): void {
    e.preventDefault()
    console.log('Drag dibatalkan')
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

  {#if titikSentuhAsosiasiDisentuh && posisiKursorMulaiAsosiasi}
    <TampilanKursorMulaiKoneksi posisi={posisiKursorMulaiAsosiasi} />
  {/if}
</div>
