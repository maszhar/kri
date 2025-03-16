<script lang="ts">
  import { onDestroy, onMount, type Snippet } from 'svelte'
  import { Koordinat } from '../entitas/Koordinat'

  interface Properti {
    posisi?: Koordinat
    saatSelesai?: () => void
    children?: Snippet
  }
  let { posisi = new Koordinat(), saatSelesai, children }: Properti = $props()

  let elemen: Node

  function tanganiKlik(e: PointerEvent): void {
    if (!elemen.contains(e.target as Node)) {
      saatSelesai?.()
    }
  }

  onMount(() => {
    window.addEventListener('click', tanganiKlik)
  })
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', tanganiKlik)
    }
  })
</script>

<div
  bind:this={elemen}
  class="fixed z-30 border-2 border-zinc-600 bg-white rounded-md overflow-hidden shadow-lg"
  style={`left: ${posisi.x}px; top: ${posisi.y}px;`}
>
  {@render children?.()}
</div>
