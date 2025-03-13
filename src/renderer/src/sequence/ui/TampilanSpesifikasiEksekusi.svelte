<script lang="ts">
  import { onMount } from 'svelte'
  import { Koordinat } from '../../common/entitas/Koordinat'
  import TampilanKursorMulaiKoneksi from './TampilanKursorMulaiKoneksi.svelte'

  interface Properti {
    indeks: number
    pratinjau?: boolean
    saatMulaiMembuatPesan?: (titikAwal: Koordinat) => void
  }
  const { indeks, saatMulaiMembuatPesan, pratinjau = false }: Properti = $props()

  let elemen: HTMLDivElement
  let titikAtas = 0

  let posisiKursorMulaiKoneksi: Koordinat | null = $state(null)
  let mouseMelayang = $state(false)
  function tanganiMouseMelayang(): void {
    mouseMelayang = true
  }

  function tanganiMouseMeninggalkan(): void {
    posisiKursorMulaiKoneksi = null
    mouseMelayang = false
  }

  function tanganiMouseGerak(e: MouseEvent): void {
    if (mouseMelayang) {
      posisiKursorMulaiKoneksi = new Koordinat(4, e.clientY - titikAtas + 14)
    }
  }

  function tanganiMouseTurun(): void {
    saatMulaiMembuatPesan?.(
      new Koordinat(
        elemen.getBoundingClientRect().x + elemen.clientWidth - 1,
        titikAtas + posisiKursorMulaiKoneksi.y - 18
      )
    )
  }

  onMount(() => {
    titikAtas = elemen.getBoundingClientRect().y
  })
</script>

<div
  class="absolute -left-1 top-5"
  onmouseenter={(): void => tanganiMouseMelayang()}
  onmousemove={(e: unknown): void => tanganiMouseGerak(e as MouseEvent)}
  onmouseleave={(): void => tanganiMouseMeninggalkan()}
  onmousedown={(): void => tanganiMouseTurun()}
  role="button"
  tabindex={2000 + indeks}
  bind:this={elemen}
>
  <svg width="17" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2"
      width="13"
      height="100"
      fill={`${pratinjau ? '#fff' : '#ccc'}`}
      stroke={`${pratinjau ? '#888' : 'black'}`}
    />
  </svg>
</div>

{#if mouseMelayang && posisiKursorMulaiKoneksi !== null}
  <TampilanKursorMulaiKoneksi posisi={posisiKursorMulaiKoneksi} />
{/if}
