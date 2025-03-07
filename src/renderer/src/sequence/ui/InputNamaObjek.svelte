<script lang="ts">
  import { onMount } from 'svelte'

  interface Properti {
    nilai?: string
    id?: string
  }
  let { nilai = $bindable(''), id }: Properti = $props()

  let elemen: Node

  export function contains(elemenTujuan: Node): boolean {
    return elemen.contains(elemenTujuan)
  }

  onMount(() => {
    if (elemen) {
      ;(elemen as HTMLInputElement).focus()
      ;(elemen as HTMLInputElement).select()
    }
  })
</script>

<input type="text" bind:value={nilai} bind:this={elemen} {id} />
