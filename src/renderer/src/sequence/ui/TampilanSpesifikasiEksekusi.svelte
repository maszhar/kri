<script lang="ts">
  import { onMount } from 'svelte'
  import { Koordinat } from '../../common/entitas/Koordinat'
  import TampilanKursorMulaiKoneksi from './TampilanKursorMulaiKoneksi.svelte'

  interface Properti {
    indeks: number
  }
  const { indeks }: Properti = $props()

  let elemen: Node
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

  onMount(() => {
    titikAtas = (elemen as HTMLElement).getBoundingClientRect().y
  })
</script>

<div
  class="absolute -left-1 top-5"
  onmouseenter={(): void => tanganiMouseMelayang()}
  onmousemove={(e: unknown): void => tanganiMouseGerak(e as MouseEvent)}
  onmouseleave={(): void => tanganiMouseMeninggalkan()}
  role="button"
  tabindex={2000 + indeks}
  bind:this={elemen}
>
  <svg width="17" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" width="13" height="100" fill="#ccc" stroke="black" />
  </svg>
</div>

{#if mouseMelayang && posisiKursorMulaiKoneksi !== null}
  <TampilanKursorMulaiKoneksi posisi={posisiKursorMulaiKoneksi} />
{/if}
