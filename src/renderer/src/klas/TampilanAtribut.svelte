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
  let teksAtributTerformatSementara = $state('')

  // pengformat
  function hasilkanTeksAtributTerformat(atribut: Atribut): string {
    let teksTerformat = ''
    teksTerformat += atribut.nama
    if (atribut.tipe) {
      teksTerformat += ` : ${atribut.tipe}`
    }
    return teksTerformat
  }

  function hasilkanParameterBuatAtributDariTeksTerformat(
    teksTerformat: string
  ): ParameterBuatAtribut {
    let indeksPemisahNamaDanTipe = teksTerformat.lastIndexOf(':')

    let nama = ''
    let tipe = undefined
    if (indeksPemisahNamaDanTipe === -1) {
      nama = teksTerformat
    } else {
      nama = teksTerformat.slice(0, indeksPemisahNamaDanTipe).trim()
      tipe = teksTerformat.slice(indeksPemisahNamaDanTipe + 1, teksTerformat.length).trim()
    }

    return {
      nama,
      tipe
    }
  }

  // edit atribut
  export function mulaiMengeditAtribut(): void {
    if (atribut) {
      teksAtributTerformatSementara = hasilkanTeksAtributTerformat(atribut)
    } else {
      teksAtributTerformatSementara = ''
    }
    sedangMengedit = true
    window.addEventListener('click', tanganiMouseKlikSaatMengedit)
    mulaiMengedit?.()
  }

  function tanganiSelesaiMengedit(): void {
    sedangMengedit = false

    if (!atribut) {
      if (teksAtributTerformatSementara.trim().length > 0) {
        const parameterAtributBaru = hasilkanParameterBuatAtributDariTeksTerformat(
          teksAtributTerformatSementara
        )
        selesaiMengedit(parameterAtributBaru)
      } else {
        batalkanMengedit()
      }
    } else {
      if (teksAtributTerformatSementara.trim().length === 0) {
        batalkanMengedit()
        return
      }

      const parameterAtributBaru = hasilkanParameterBuatAtributDariTeksTerformat(
        teksAtributTerformatSementara
      )
      atribut.nama = parameterAtributBaru.nama
      atribut.tipe = parameterAtributBaru.tipe
      selesaiMengedit()
    }
  }

  function tanganiKeyboardTurunDiInput(e: KeyboardEvent): void {
    if (e.key == 'Enter' || e.key == 'Tab') {
      tanganiSelesaiMengedit()
      sedangMengedit = false
    } else if (e.key == 'Escape') {
      batalkanMengedit()
      sedangMengedit = false
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
    <span class={`px-2 select-none ${sedangMengedit ? 'opacity-0' : ''}`}>
      {hasilkanTeksAtributTerformat(atribut)}
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
