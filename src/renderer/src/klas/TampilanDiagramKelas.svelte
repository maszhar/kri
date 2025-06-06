<script lang="ts">
  import type { Asosiasi } from '../../../umum/entitas/Asosiasi'
  import type { ElemenKlas } from '../../../umum/entitas/ElemenKlas'
  import type { Kelas } from '../../../umum/entitas/Kelas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'
  import { GalatNamaSama } from '../../../umum/galat/GalatNamaSama'
  import { TipeElemen } from '../../../umum/tipe/TipeElemen'
  import type { DiagramKelasLangsung } from '../umum/entitas/DiagramKelasLangsung.svelte'
  import type { KlasLangsung } from '../umum/entitas/KlasLangsung'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import ItemMenuKonteks from '../umum/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../umum/ui/JudulMenuKonteks.svelte'
  import Kanvas from '../umum/ui/Kanvas.svelte'
  import MenuKonteks from '../umum/ui/MenuKonteks.svelte'
  import TampilanAsosiasi from './TampilanAsosiasi.svelte'
  import TampilanElemenKlas from './TampilanElemenKlas.svelte'

  // === ATRIBUT ===

  interface Properti {
    diagramKlas: DiagramKelasLangsung
    tambahKlasBaru: () => KlasLangsung
    ubahNamaKlas: (klas: Kelas, nama: string) => void
    hapusKlas: (klas: Kelas) => void
    tampilkanPesan: (pesan: string) => void
  }
  const { diagramKlas, tambahKlasBaru, hapusKlas, ubahNamaKlas, tampilkanPesan }: Properti =
    $props()

  // elemen web
  let elemenKanvas: Kanvas
  let ukuranKanvas = $state(new Ukuran2D(800, 600))
  let koleksiElemenKlas = diagramKlas.dapatkanKoleksiElemenKlasLangsung()

  let posisiMenuDiagramKlas: Koordinat | null = $state(null)

  let elemenKlasDipilih = $state(-1)

  // asosiasi
  let koleksiAsosiasi: Asosiasi[] = $state([])

  // buat asosisasi
  let titikAsalBuatAsosiasi: Koordinat | null = $state(null)
  let titikTujuanBuatAsosiasi: Koordinat | null = $state(null)
  let elemenMembuatAsosiasi: ElemenKlas | null = $state(null)
  let elemenTujuanMembuatAsosiasi: ElemenKlas | null = null

  // === OPERASI ===

  function bukaMenuDiagramKlas(e: MouseEvent): void {
    posisiMenuDiagramKlas = new Koordinat(e.clientX, e.clientY)
  }

  function tutupMenuDiagramKlas(): void {
    posisiMenuDiagramKlas = null
  }

  // modifikasi klas
  function tambahElemenKlasDariKlasBaru(): void {
    const klasBaru = tambahKlasBaru()
    diagramKlas.tambahElemenKlasBaru(
      klasBaru,
      new Koordinat(
        posisiMenuDiagramKlas.x - elemenKanvas.getXAbsolut(),
        posisiMenuDiagramKlas.y - elemenKanvas.getYAbsolut()
      )
    )
  }

  function tanganiTambahElemenKlasBaru(): void {
    tambahElemenKlasDariKlasBaru()
    tutupMenuDiagramKlas()
  }

  function pilihElemenKlas(indeks: number): void {
    elemenKlasDipilih = indeks
  }

  function ubahNamaElemenKlas(idKlas: number, nama: string): void {
    try {
      ubahNamaKlas(idKlas, nama)
    } catch (e: any) {
      if (e instanceof GalatNamaSama && e.tipe === TipeElemen.KLAS) {
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

  // kunci saat ada yang mengedit
  let adaYanKELASgedit = $state(false)
  function mulaiMengedit(): void {
    adaYangMengedit = true
  }
  function akhiriMengedit(): void {
    adaYangMengedit = false
  }

  // hapus klas
  function hapusElemenKlas(indeks: number): void {
    // const klasTerkait = diagramKlas.koleksiElemenKlas[indeks].klas
    // diagramKlas.hapusElemenKlas(indeks)
    // hapusKlas(klasTerkait)
    // koleksiElemenKlas = diagramKlas.koleksiElemenKlas
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

    if (elemenTujuanMembuatAsosiasi) {
      const asosiasiBaru = elemenMembuatAsosiasi.klas.tambahAsosiasi(
        elemenTujuanMembuatAsosiasi.klas
      )
      koleksiAsosiasi.push(asosiasiBaru)
    }

    titikAsalBuatAsosiasi = null
    elemenMembuatAsosiasi = null
    elemenTujuanMembuatAsosiasi = null
  }

  function tanganiMouseGerakSaatBuatAsosiasi(e: MouseEvent): void {
    e.stopPropagation()

    const posisiKanvas = elemenKanvas.dapatkanPosisi()
    const posisiKursorKiri = e.pageX - posisiKanvas.x
    const posisiKursorAtas = e.pageY - posisiKanvas.y
    titikTujuanBuatAsosiasi = new Koordinat(posisiKursorKiri, posisiKursorAtas)
  }

  function tetapkanTujuanAsosiasi(tujuan: ElemenKlas): void {
    elemenTujuanMembuatAsosiasi = tujuan
  }

  function batalkanPenetapanTujuanAsosiasi(): void {
    elemenTujuanMembuatAsosiasi = null
  }
</script>

{#if posisiMenuDiagramKlas !== null}
  <MenuKonteks posisi={posisiMenuDiagramKlas} saatSelesai={tutupMenuDiagramKlas}>
    <JudulMenuKonteks>Tambah Kelas</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={tanganiTambahElemenKlasBaru}>Buat klas baru</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<Kanvas
  bind:this={elemenKanvas}
  ukuran={ukuranKanvas}
  saatBukaMenuKonteks={bukaMenuDiagramKlas}
  saatDiklik={tanganiKanvasDiklik}
>
  {#each $koleksiElemenKlas as elemenKlas, indeks}
    <TampilanElemenKlas
      {elemenKlas}
      {indeks}
      {adaYangMengedit}
      mintaDipilih={(): void => pilihElemenKlas(indeks)}
      dipilih={elemenKlasDipilih === indeks}
      {dapatkanKoordinatPojokKiriAtasKanvas}
      {ubahNamaElemenKlas}
      {mulaiMengedit}
      {akhiriMengedit}
      hapus={(): void => hapusElemenKlas(indeks)}
      {tampilkanPesan}
      {mulaiBuatAsosiasi}
      {akhiriBuatAsosiasi}
      {elemenMembuatAsosiasi}
      {tetapkanTujuanAsosiasi}
      {batalkanPenetapanTujuanAsosiasi}
    />
  {/each}

  <!-- {#each koleksiAsosiasi as asosiasi}
    <TampilanAsosiasi
      posisiAsal={koleksiElemenKlas.find((elemenKlas) => elemenKlas.klas == asosiasi.asal).posisi}
      posisiTujuan={koleksiElemenKlas.find((elemenKlas) => elemenKlas.klas == asosiasi.tujuan)
        .posisi}
    />
  {/each} -->

  {#if titikAsalBuatAsosiasi !== null}
    <TampilanAsosiasi posisiAsal={titikAsalBuatAsosiasi} posisiTujuan={titikTujuanBuatAsosiasi} />
  {/if}
</Kanvas>
