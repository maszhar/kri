<script lang="ts">
  import { Koordinat } from '../../common/entitas/Koordinat'
  import { Ukuran2D } from '../../common/entitas/Ukuran2D'
  import ItemMenuKonteks from '../../common/ui/ItemMenuKonteks.svelte'
  import JudulMenuKonteks from '../../common/ui/JudulMenuKonteks.svelte'
  import Kanvas from '../../common/ui/Kanvas.svelte'
  import MenuKonteks from '../../common/ui/MenuKonteks.svelte'
  import { SequenceDiagram } from '../../../../umum/entitas/SequenceDiagram'
  import type { Komponen } from '../../../../umum/entitas/Komponen'
  import TampilanObjek from './TampilanObjek.svelte'
  import TampilanPesanSinkron from './TampilanPesanSinkron.svelte'
  import TampilanFrame from './TampilanFrame.svelte'

  interface Properti {
    sequenceDiagram: SequenceDiagram
  }
  const { sequenceDiagram }: Properti = $props()

  let koleksiKomponen: Komponen[] = $state(sequenceDiagram.getKoleksiKomponen())
  let ukuranKanvas = $state(new Ukuran2D(800, 600))
  let indeksKomponenDiseleksi = $state(-1)

  let elemenKanvas: Kanvas | undefined = $state(undefined)

  let namaInteraksi = $state(sequenceDiagram.nama)

  let posisiMenuKonteks: Koordinat | null = $state(null)
  function tanganiKanvasBukaMenuKonteks(e: MouseEvent): void {
    posisiMenuKonteks = new Koordinat(e.clientX, e.clientY - 23)
  }
  function tanganiMenuKonteksSelesai(): void {
    posisiMenuKonteks = null
  }

  function tambahClass(): void {
    koleksiKomponen = sequenceDiagram.tambahClass()
    tanganiMenuKonteksSelesai()
  }

  function tanganiPermintaanSeleksi(indeks: number): void {
    indeksKomponenDiseleksi = indeks
  }

  function hapusSeleksi(): void {
    indeksKomponenDiseleksi = null
  }

  function tanganiEditNamaObjek(indeks: number, namaBaru: string): void {
    koleksiKomponen = sequenceDiagram.ubahNamaKomponen(indeks, namaBaru)
  }

  let adaYangMengedit = $state(false)
  function aturAdaYangMengedit(nilai: boolean): void {
    adaYangMengedit = nilai
  }

  let titikAwalMembuatPesan: Koordinat | null = $state(null)
  let panjangPesanSedangDibuat = $state(0)
  function mulaiMembuatPesan(titikAwal: Koordinat): void {
    if (elemenKanvas) {
      titikAwalMembuatPesan = new Koordinat(
        titikAwal.x - elemenKanvas.getXAbsolut(),
        titikAwal.y - elemenKanvas.getYAbsolut()
      )

      window.addEventListener('mouseup', akhiriMembuatPesan)
      window.addEventListener('mousemove', tanganiMouseGerakSaatMembuatPesan)
    }
  }

  function tanganiMouseGerakSaatMembuatPesan(e: MouseEvent): void {
    panjangPesanSedangDibuat = Math.max(e.clientX - titikAwalMembuatPesan.x - 12, 0)
  }

  function akhiriMembuatPesan(): void {
    window.removeEventListener('mouseup', akhiriMembuatPesan)
    window.removeEventListener('mousemove', tanganiMouseGerakSaatMembuatPesan)
    titikAwalMembuatPesan = null
    panjangPesanSedangDibuat = 0
  }

  // Nama interaksi
  function perbaruiNamaInteraksi(namaBaru: string): void {
    namaInteraksi = namaBaru
    sequenceDiagram.nama = namaBaru
  }
</script>

{#if posisiMenuKonteks !== null}
  <MenuKonteks posisi={posisiMenuKonteks} saatSelesai={(): void => tanganiMenuKonteksSelesai()}>
    <JudulMenuKonteks>Tambah Komponen</JudulMenuKonteks>
    <ItemMenuKonteks saatDiklik={(): void => tambahClass()}>Buat class baru</ItemMenuKonteks>
  </MenuKonteks>
{/if}

<Kanvas
  ukuran={ukuranKanvas}
  saatBukaMenuKonteks={(e: MouseEvent): void => tanganiKanvasBukaMenuKonteks(e)}
  saatDiklik={(): void => hapusSeleksi()}
  bind:this={elemenKanvas}
  class="p-4"
>
  <TampilanFrame
    {adaYangMengedit}
    {namaInteraksi}
    saatMulaiMengedit={(): void => aturAdaYangMengedit(true)}
    saatSelesaiMengedit={(): void => aturAdaYangMengedit(false)}
    saatNamaInteraksiDiedit={perbaruiNamaInteraksi}
  >
    {#each koleksiKomponen as komponen, indeks}
      <TampilanObjek
        nama={komponen.nama}
        posisi={new Koordinat(200 * indeks + 8, 8)}
        diseleksi={indeksKomponenDiseleksi === indeks}
        {indeks}
        saatMintaSeleksi={(): void => tanganiPermintaanSeleksi(indeks)}
        saatNamaObjekDiedit={(nama: string): void => tanganiEditNamaObjek(indeks, nama)}
        {adaYangMengedit}
        saatMulaiMengedit={(): void => aturAdaYangMengedit(true)}
        saatSelesaiMengedit={(): void => aturAdaYangMengedit(false)}
        pertama={indeks === 0}
        saatMulaiMembuatPesan={mulaiMembuatPesan}
        sedangMembuatPesan={titikAwalMembuatPesan !== null}
      />
    {/each}

    <!-- Pesan Sinkron Sementara -->
    {#if titikAwalMembuatPesan !== null}
      <TampilanPesanSinkron posisi={titikAwalMembuatPesan} panjang={panjangPesanSedangDibuat} />
    {/if}
  </TampilanFrame>
</Kanvas>
