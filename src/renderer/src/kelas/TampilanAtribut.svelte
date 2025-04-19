<script lang="ts">
  import type { AtributLangsung } from '../umum/entitas/AtributLangsung.svelte'

  interface Properti {
    atribut: AtributLangsung
  }
  let { atribut }: Properti = $props()

  let sedangMengedit = $state(false)
  let elemenInputAtribut: HTMLInputElement | null = $state(null)
  let teksAtributTerformatSementara = $state('')

  function mulaiEditAtribut(): void {}

  function tanganiKeyboardTurunDiInput(e: KeyboardEvent): void {}
</script>

<div class="relative" role="button" tabindex={0} ondblclick={mulaiEditAtribut}>
  {#if atribut}
    <span class={`px-2 select-none ${sedangMengedit ? 'opacity-0' : ''}`}>
      {atribut.toStringLangsung()}
    </span>
  {:else}
    <br />
  {/if}
  {#if sedangMengedit}
    <input
      name="namaAtribut"
      class="absolute outline-none z-10 px-2 top-0 left-0"
      autocomplete="off"
      style={`width: ${teksAtributTerformatSementara.length + 2}ch`}
      bind:value={teksAtributTerformatSementara}
      onkeydown={tanganiKeyboardTurunDiInput}
      bind:this={elemenInputAtribut}
    />
  {/if}
</div>
