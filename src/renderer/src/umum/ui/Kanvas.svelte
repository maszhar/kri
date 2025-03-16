<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Ukuran2D } from '../entitas/Ukuran2D'

  interface Properti {
    children?: Snippet
    ukuran?: Ukuran2D
    saatBukaMenuKonteks?: (e: MouseEvent) => void
    saatDiklik?: () => void
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

  export function getXAbsolut(): number {
    return elemen.getBoundingClientRect().x
  }

  export function getYAbsolut(): number {
    return elemen.getBoundingClientRect().y
  }
</script>

<div
  class={`relative m-6 inline-block bg-white ${className}`}
  style={`width: ${ukuran.lebar}px; height: ${ukuran.tinggi}px;`}
  ondblclick={(e: unknown): void => saatBukaMenuKonteks?.(e as MouseEvent)}
  oncontextmenu={(e: unknown): void => saatBukaMenuKonteks?.(e as MouseEvent)}
  role="button"
  tabindex={0}
  onclick={(): void => saatDiklik()}
  onkeypress={(): void => {}}
  bind:this={elemen}
>
  {@render children?.()}
</div>
