<script lang="ts">
  import { GalatNamaSama } from '../../../umum/galat/GalatNamaSama'
  import { TipeElemen } from '../../../umum/tipe/TipeElemen'
  import type { AtributLangsung } from '../umum/entitas/AtributLangsung.svelte'
  import { Pesan } from '../umum/entitas/Pesan.svelte'

  interface Properti {
    atribut: AtributLangsung
  }
  let { atribut }: Properti = $props()

  let mengedit = $state(false)
  let elemenInput: HTMLInputElement | null = $state(null)
  let teksAtributTerinput = $state('')

  function mulaiEditAtribut(): void {
    teksAtributTerinput = atribut.toString()
    mengedit = true
    window.addEventListener('click', tanganiKlikSaatMengedit)
  }

  function tanganiKlikSaatMengedit(e: MouseEvent): void {
    if (e.target !== elemenInput) {
      akhiriEditAtribut()
    }
  }

  function tanganiKeyboardTurunDiInput(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === 'Tab') {
      akhiriEditAtribut()
    } else if (e.key === 'Escape') {
      akhiriEditAtribut(false)
    }
  }

  function akhiriEditAtribut(terapkan: boolean = true): void {
    window.removeEventListener('click', tanganiKlikSaatMengedit)
    mengedit = false

    if (terapkan && teksAtributTerinput.trim() !== '') {
      try {
        atribut.aturDariTeks(teksAtributTerinput)
      } catch (e: any) {
        if (e instanceof GalatNamaSama) {
          Pesan.tampilkan(
            `Nama '${e.nama}' telah digunakan sebagai nama ${e.tipe === TipeElemen.ATRIBUT ? 'atribut lain' : 'metode'} pada kelas ini.`
          )
        } else {
          Pesan.tampilkan(e.message)
        }
      }
    }
  }

  $effect(() => {
    if (elemenInput) {
      elemenInput.focus()
      elemenInput.select()
    }
  })
</script>

<div class="relative cursor-move" role="button" tabindex={0} ondblclick={mulaiEditAtribut}>
  {#if atribut}
    <span class={`px-2 select-none ${mengedit ? 'opacity-0' : ''}`}>
      {atribut.toStringLangsung()}
    </span>
  {:else}
    <br />
  {/if}
  {#if mengedit}
    <input
      name="namaAtribut"
      class="absolute outline-none z-10 px-2 top-0 left-0"
      autocomplete="off"
      style={`width: ${teksAtributTerinput.length + 2}ch`}
      bind:value={teksAtributTerinput}
      onkeydown={tanganiKeyboardTurunDiInput}
      bind:this={elemenInput}
    />
  {/if}
</div>
