<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  interface Properti {
    saatSelesai?: () => void
  }
  let { saatSelesai }: Properti = $props()

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

<div bind:this={elemen} class="absolute z-10 border bg-white">Menu Konteks</div>
