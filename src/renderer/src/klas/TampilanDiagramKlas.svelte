<script lang="ts">
  import type { DiagramKlas } from '../../../umum/entitas/DiagramKlas'
  import type { ElemenKlas } from '../../../umum/entitas/ElemenKlas'
  import type { Klas } from '../../../umum/entitas/Klas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'
  import { GalatNamaSama } from '../../../umum/galat/GalatNamaSama'
  import { TipeElemen } from '../../../umum/tipe/TipeElemen'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import ItemMenuKonteks from '../umum/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../umum/ui/JudulMenuKonteks.svelte'
  import Kanvas from '../umum/ui/Kanvas.svelte'
  import MenuKonteks from '../umum/ui/MenuKonteks.svelte'
  import TampilanAsosiasi from './TampilanAsosiasi.svelte'
  import TampilanElemenKlas from './TampilanElemenKlas.svelte'

  // === ATRIBUT ===

  interface Properti {
    diagramKlas: DiagramKlas
    tambahKlasBaru: () => Klas
    ubahNamaKlas: (klas: Klas, nama: string) => void
    hapusKlas: (klas: Klas) => void
    tampilkanPesan: (pesan: string) => void
  }
  const { diagramKlas, tambahKlasBaru, hapusKlas, ubahNamaKlas, tampilkanPesan }: Properti =
    $props()

  // elemen web
  let elemenKanvas: Kanvas
  let ukuranKanvas = $state(new Ukuran2D(800, 600))
  let koleksiElemenKlas: ElemenKlas[] = $state([])

  let posisiMenuDiagramKlas: Koordinat | null = $state(null)

  let elemenKlasDipilih = $state(-1)

  // buat asosisasi
  let titikAsalBuatAsosiasi: Koordinat | null = $state(null)
  let titikTujuanBuatAsosiasi: Koordinat | null = $state(null)
  let elemenMembuatAsosiasi: ElemenKlas | null = $state(null)

  // === OPERASI ===

  function bukaMenuDiagramKlas(e: MouseEvent): void {
    posisiMenuDiagramKlas = new Koordinat(e.clientX, e.clientY)
  }

  function tutupMenuDiagramKlas(): void {
    posisiMenuDiagramKlas = null
  }

  // modifikasi klas
  function tambahElemenKlasBaru(): void {
    const klasBaru = tambahKlasBaru()
    diagramKlas.tambahElemenKlasBaru(
      klasBaru,
      new Koordinat(
        posisiMenuDiagramKlas.x - elemenKanvas.getXAbsolut(),
        posisiMenuDiagramKlas.y - elemenKanvas.getYAbsolut()
      )
    )
    koleksiElemenKlas = diagramKlas.koleksiElemenKlas
  }

  function tanganiTambahElemenKlasBaru(): void {
    tambahElemenKlasBaru()
    tutupMenuDiagramKlas()
  }

  function pilihElemenKlas(indeks: number): void {
    elemenKlasDipilih = indeks
  }

  function ubahNamaElemenKlas(indeks: number, klas: Klas, nama: string): void {
    try {
      ubahNamaKlas(klas, nama)
      diagramKlas.terapkanPerubahanKlas(indeks)
      koleksiElemenKlas = diagramKlas.koleksiElemenKlas
    } catch (e: any) {
      if (e instanceof GalatNamaSama && e.tipe === TipeElemen.Klas) {
        tampilkanPesan(`Nama klas '${e.nama}' telah dipakai.`)
      }
    }
  }

  // kanvas
  function dapatkanKoordinatPojokKiriAtasKanvas(): Koordinat {
    return new Koordinat(elemenKanvas.getXAbsolut(), elemenKanvas.getYAbsolut())
  }

  function tanganiKanvasDiklik(e: MouseEvent): void {
    if (e.target === elemenKanvas.dapatkanElemen()) {
      elemenKlasDipilih = -1
    }
  }

  $effect(() => {
    koleksiElemenKlas = diagramKlas.koleksiElemenKlas
  })

  // kunci saat ada yang mengedit
  let adaYangMengedit = $state(false)
  function mulaiMengedit(): void {
    adaYangMengedit = true
  }
  function akhiriMengedit(): void {
    adaYangMengedit = false
  }

  // hapus klas
  function hapusElemenKlas(indeks: number): void {
    const klasTerkait = diagramKlas.koleksiElemenKlas[indeks].klas
    diagramKlas.hapusElemenKlas(indeks)
    hapusKlas(klasTerkait)
    koleksiElemenKlas = diagramKlas.koleksiElemenKlas
  }

  // tangani buat asosiasi
  function mulaiBuatAsosiasi(titikAwal: Koordinat, elemen: ElemenKlas): void {
    titikAsalBuatAsosiasi = titikAwal
    titikTujuanBuatAsosiasi = titikAwal
    elemenMembuatAsosiasi = elemen
    window.addEventListener('mousemove', tanganiMouseGerakSaatBuatAsosiasi)
  }

  function akhiriBuatAsosiasi(): void {
    window.removeEventListener('mousemove', tanganiMouseGerakSaatBuatAsosiasi)
    titikAsalBuatAsosiasi = null
    elemenMembuatAsosiasi = null
  }

  function tanganiMouseGerakSaatBuatAsosiasi(e: MouseEvent): void {
    e.stopPropagation()

    const posisiKanvas = elemenKanvas.dapatkanPosisi()
    const posisiKursorKiri = e.pageX - posisiKanvas.x
    const posisiKursorAtas = e.pageY - posisiKanvas.y
    titikTujuanBuatAsosiasi = new Koordinat(posisiKursorKiri, posisiKursorAtas)
  }
</script>

{#if posisiMenuDiagramKlas !== null}
  <MenuKonteks posisi={posisiMenuDiagramKlas} saatSelesai={tutupMenuDiagramKlas}>
    <JudulMenuKonteks>Tambah Klas</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={tanganiTambahElemenKlasBaru}>Buat klas baru</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<Kanvas
  bind:this={elemenKanvas}
  ukuran={ukuranKanvas}
  saatBukaMenuKonteks={bukaMenuDiagramKlas}
  saatDiklik={tanganiKanvasDiklik}
>
  {#each koleksiElemenKlas as elemenKlas, indeks}
    <TampilanElemenKlas
      {elemenKlas}
      {indeks}
      {adaYangMengedit}
      mintaDipilih={(): void => pilihElemenKlas(indeks)}
      dipilih={elemenKlasDipilih === indeks}
      {dapatkanKoordinatPojokKiriAtasKanvas}
      ubahNamaElemenKlas={(klas: Klas, nama: string): void =>
        ubahNamaElemenKlas(indeks, klas, nama)}
      {mulaiMengedit}
      {akhiriMengedit}
      hapus={(): void => hapusElemenKlas(indeks)}
      {tampilkanPesan}
      {mulaiBuatAsosiasi}
      {akhiriBuatAsosiasi}
      {elemenMembuatAsosiasi}
    />
  {/each}

  {#if titikAsalBuatAsosiasi !== null}
    <TampilanAsosiasi posisiAsal={titikAsalBuatAsosiasi} posisiTujuan={titikTujuanBuatAsosiasi} />
  {/if}
</Kanvas>
