<script lang="ts">
  import type { ElemenKlas } from '../../../umum/entitas/ElemenKlas'
  import { Koordinat } from '../../../umum/entitas/Koordinat'

  interface Properti {
    elemenKlas: ElemenKlas
    adaYangMengedit: boolean
    dipilih: boolean
    mintaDipilih: () => void
    indeks: number
    dapatkanKoordinatPojokKiriAtasKanvas: () => Koordinat
  }
  let {
    elemenKlas,
    adaYangMengedit,
    dipilih,
    indeks,
    mintaDipilih,
    dapatkanKoordinatPojokKiriAtasKanvas
  }: Properti = $props()

  let elemen: HTMLDivElement

  let nama = $state(elemenKlas.klas.nama)
  let posisi = $state(elemenKlas.posisi)

  $effect(() => {
    nama = elemenKlas.klas.nama
  })

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
</script>

<div
  bind:this={elemen}
  class={`absolute bg-white border ${adaYangMengedit ? 'cursor-default' : 'cursor-move'} ${dipilih ? 'border-blue-600 ring-2 ring-blue-600' : 'border-black'}`}
  onmousedown={tanganiMouseTurun}
  role="button"
  tabindex={20000 + indeks}
  onkeydown={(): void => {}}
  style={`left: ${posisi.x}px; top: ${posisi.y}px;`}
>
  <div class="select-none font-bold py-1 px-4">{nama}</div>
</div>
