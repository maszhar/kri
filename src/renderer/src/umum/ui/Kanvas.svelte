<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Ukuran2D } from '../entitas/Ukuran2D'
  import { Koordinat } from '../../../../umum/entitas/Koordinat'

  interface Properti {
    children?: Snippet
    ukuran?: Ukuran2D
    saatBukaMenuKonteks?: (e: MouseEvent) => void
    saatDiklik?: (e: MouseEvent) => void
    class?: string
  }
  const {
    children,
    ukuran = new Ukuran2D(100, 100),
    saatBukaMenuKonteks,
    saatDiklik,
    class: className = ''
  }: Properti = $props()

  let elemen: HTMLDivElement

  function tanganiKlikGanda(e: MouseEvent): void {
    if (e.target === elemen) {
      saatBukaMenuKonteks?.(e)
    }
  }

  function tanganiBukaMenuKonteks(e: MouseEvent): void {
    if (e.target === elemen) {
      saatBukaMenuKonteks?.(e)
    }
  }

  export function dapatkanElemen(): HTMLDivElement {
    return elemen
  }

  export function getXAbsolut(): number {
    return elemen.getBoundingClientRect().x
  }

  export function getYAbsolut(): number {
    return elemen.getBoundingClientRect().y
  }

  export function dapatkanPosisi(): Koordinat {
    return new Koordinat(elemen.offsetLeft, elemen.offsetTop)
  }
</script>

<div
  class={`relative m-4 inline-block bg-white ${className}`}
  style={`width: ${ukuran.lebar}px; height: ${ukuran.tinggi}px;`}
  ondblclick={tanganiKlikGanda}
  oncontextmenu={tanganiBukaMenuKonteks}
  role="button"
  tabindex={20000}
  onclick={saatDiklik}
  onkeypress={(): void => {}}
  bind:this={elemen}
>
  {@render children?.()}
</div>
