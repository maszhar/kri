<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { Koordinat } from '../entitas/Koordinat'

  interface Properti {
    posisi?: Koordinat
    saatSelesai?: () => void
  }
  let { posisi = new Koordinat(), saatSelesai }: Properti = $props()

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
  class="absolute z-10 border bg-white"
  style={`left: ${posisi.x}px; top: ${posisi.y}px;`}
>
  Menu Konteks
</div>
