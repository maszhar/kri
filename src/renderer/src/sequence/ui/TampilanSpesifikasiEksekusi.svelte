<script lang="ts">
  import TampilanKursorMulaiKoneksi from './TampilanKursorMulaiKoneksi.svelte'

  interface Properti {
    indeks: number
  }
  const { indeks }: Properti = $props()

  let mouseMelayang = $state(false)
  function tanganiMouseMelayang(): void {
    mouseMelayang = true
  }

  function tanganiMouseMeninggalkan(): void {
    mouseMelayang = false
  }
</script>

<div
  class="absolute top-5"
  onmouseenter={(): void => tanganiMouseMelayang()}
  onmouseleave={(): void => tanganiMouseMeninggalkan()}
  role="button"
  tabindex={2000 + indeks}
>
  <svg width="10" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" width="8" height="100" fill="#ccc" stroke="black" />
  </svg>
</div>

{#if mouseMelayang}
  <TampilanKursorMulaiKoneksi />
{/if}
