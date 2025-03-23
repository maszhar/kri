<script lang="ts">
  import { type Atribut, type ParameterBuatAtribut } from '../../../umum/entitas/Atribut'

  interface Properti {
    indeksKlas: number
    indeksAtribut: number
    atribut?: Atribut
    mulaiMengedit?: () => void
    selesaiMengedit: (atributBaru?: ParameterBuatAtribut) => void
    batalkanMengedit: () => void
  }
  let {
    indeksKlas,
    indeksAtribut,
    atribut,
    mulaiMengedit,
    batalkanMengedit,
    selesaiMengedit
  }: Properti = $props()

  let sedangMengedit = $state(false)
  let elemenInputAtribut: HTMLInputElement | null = $state(null)
  let namaAtributSementara = $state(atribut?.nama ?? '')

  export function mulaiMengeditAtribut(): void {
    sedangMengedit = true
    window.addEventListener('click', tanganiMouseKlikSaatMengedit)
    mulaiMengedit?.()
  }

  function tanganiSelesaiMengedit(): void {
    sedangMengedit = false

    let atributBaru: Atribut | undefined = undefined
    if (!atribut) {
      if (namaAtributSementara.trim().length > 0) {
        atributBaru = { nama: namaAtributSementara }
        selesaiMengedit(atributBaru)
      } else {
        batalkanMengedit()
      }
    }
  }

  function tanganiKeyboardTurunDiInput(e: KeyboardEvent): void {
    if (e.key == 'Enter' || e.key == 'Tab') {
      tanganiSelesaiMengedit()
    } else if (e.key == 'Escape') {
      batalkanMengedit()
    }
  }

  function tanganiMouseKlikSaatMengedit(e: MouseEvent): void {
    if (sedangMengedit && e.target != elemenInputAtribut) {
      window.removeEventListener('click', tanganiMouseKlikSaatMengedit)

      // baru
      tanganiSelesaiMengedit()
    }
  }

  $effect(() => {
    if (sedangMengedit && elemenInputAtribut) {
      elemenInputAtribut.focus()
      elemenInputAtribut.select()
    }
  })
</script>

<div
  class="relative"
  role="button"
  tabindex={(40000 + indeksKlas) * 100000 + 10000 + indeksAtribut}
  ondblclick={mulaiMengeditAtribut}
>
  {#if atribut}
    <span class={`px-2 ${sedangMengedit ? 'opacity-0' : ''}`}>
      {atribut?.nama}
    </span>
  {:else}
    <br />
  {/if}
  {#if sedangMengedit}
    <input
      name="namaAtribut"
      class="absolute outline-none z-10 px-2 top-0 left-0"
      autocomplete="off"
      style={`width: ${namaAtributSementara.length + 2}ch`}
      bind:value={namaAtributSementara}
      onkeydown={tanganiKeyboardTurunDiInput}
      bind:this={elemenInputAtribut}
    />
  {/if}
</div>
