<script lang="ts">
  import { Atribut } from '../../../umum/entitas/Atribut'

  interface Properti {
    atribut?: Atribut
    mulaiMengedit: () => void
    selesaiMengedit: (atributBaru?: Atribut) => void
    batalkanMengedit: () => void
  }
  let { atribut, mulaiMengedit, batalkanMengedit, selesaiMengedit }: Properti = $props()

  let sedangMengedit = $state(false)
  let elemenInputAtribut: HTMLInputElement | null = $state(null)
  let namaAtributSementara = $state(atribut?.nama ?? '')

  function tanganiSelesaiMengedit(): void {
    sedangMengedit = false

    let atributBaru: Atribut | undefined = undefined
    if (!atribut) {
      atributBaru = new Atribut({ nama: namaAtributSementara })
    }

    selesaiMengedit(atributBaru)
  }

  function tanganiKeyboardTurunDiInput(e: KeyboardEvent): void {
    if (e.key == 'Enter' || e.key == 'Tab') {
      tanganiSelesaiMengedit()
    } else if (e.key == 'Escape') {
      batalkanMengedit()
    }
  }

  $effect(() => {
    if (!atribut) {
      sedangMengedit = true
    }
  })

  $effect(() => {
    if (sedangMengedit && elemenInputAtribut) {
      elemenInputAtribut.focus()
      elemenInputAtribut.select()
    }
  })
</script>

<div class="relative">
  {#if atribut}
    {atribut?.nama}
  {:else}
    <br />
  {/if}
  {#if sedangMengedit}
    <input
      name="namaAtribut"
      class="absolute outline-none z-10 px-2 top-0 left-0"
      autocomplete="off"
      bind:value={namaAtributSementara}
      onkeydown={tanganiKeyboardTurunDiInput}
      bind:this={elemenInputAtribut}
    />
  {/if}
</div>
