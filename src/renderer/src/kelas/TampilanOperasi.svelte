<script lang="ts">
  import type { Metode, ParameterBuatMetode } from '../../../umum/entitas/Metode'
  import { ParameterMetode } from '../../../umum/entitas/ParameterMetode'

  interface Properti {
    indeksKlas: number
    indeksMetode: number
    metode?: Metode
    mulaiMengedit?: () => void
    selesaiMengedit: (metodeBaru: ParameterBuatMetode) => void
    batalkanMengedit: () => void
  }
  let {
    indeksKlas,
    indeksMetode: indeksAtribut,
    metode,
    mulaiMengedit,
    batalkanMengedit,
    selesaiMengedit
  }: Properti = $props()

  let sedangMengedit = $state(false)
  let elemenInputAtribut: HTMLInputElement | null = $state(null)
  let teksAtributTerformatSementara = $state('')

  // pengformat
  function hasilkanTeksAtributTerformat(metode: Metode): string {
    let teksTerformat = ''
    teksTerformat += metode.nama
    teksTerformat += '('
    teksTerformat += metode.koleksiParameter
      .map((parameter) => {
        let teksParameterTerformat = ''
        teksParameterTerformat += parameter.nama
        if (parameter.tipe) {
          teksParameterTerformat += ` : ${parameter.tipe}`
        }
        return teksParameterTerformat
      })
      .join(', ')
    teksTerformat += ')'
    if (metode.tipeKeluaran) {
      teksTerformat += ` : ${metode.tipeKeluaran}`
    }
    return teksTerformat
  }

  function hasilkanParameterBuatMetodeDariTeksTerformat(
    teksTerformat: string
  ): ParameterBuatMetode {
    const indeksPembukaKoleksiParameter = teksTerformat.lastIndexOf('(')

    let nama = ''
    if (indeksPembukaKoleksiParameter === -1) {
      nama = teksTerformat
      return {
        nama: nama
      }
    }

    nama = teksTerformat.slice(0, indeksPembukaKoleksiParameter).trim()
    if (teksTerformat.length === indeksPembukaKoleksiParameter + 1) {
      return {
        nama: nama
      }
    }

    let teksKoleksiParameter = ''

    const indeksPenutupKoleksiParameter = teksTerformat.lastIndexOf(')')
    if (indeksPenutupKoleksiParameter === -1) {
      teksKoleksiParameter = teksTerformat
        .slice(indeksPembukaKoleksiParameter + 1, teksTerformat.length)
        .trim()
    } else {
      teksKoleksiParameter = teksTerformat
        .slice(indeksPembukaKoleksiParameter + 1, indeksPenutupKoleksiParameter)
        .trim()
    }

    let koleksiParameter: ParameterMetode[] = []

    if (teksKoleksiParameter) {
      let koleksiTeksParameter = teksKoleksiParameter.split(',')
      koleksiTeksParameter.forEach((teksParameter) => {
        let nama: string
        let tipe: string | undefined = undefined

        const indeksPemisahNamaDanTipe = teksParameter.lastIndexOf(':')
        if (indeksPemisahNamaDanTipe === -1) {
          nama = teksParameter.trim()
        } else {
          nama = teksParameter.slice(0, indeksPemisahNamaDanTipe).trim()
          if (teksParameter.length > indeksPemisahNamaDanTipe + 1) {
            tipe = teksParameter.slice(indeksPemisahNamaDanTipe + 1, teksParameter.length)
          }
        }

        koleksiParameter.push(
          new ParameterMetode({
            nama: nama,
            tipe: tipe
          })
        )
      })
    }

    // tipe keluaran
    let tipeKeluaran: string | undefined = undefined

    if (
      indeksPenutupKoleksiParameter !== -1 &&
      teksTerformat.length > indeksPenutupKoleksiParameter + 1
    ) {
      const teksTipeKeluaran = teksTerformat.slice(
        indeksPenutupKoleksiParameter + 1,
        teksTerformat.length
      )
      const potonganTeksTipeKeluaran = teksTipeKeluaran.split(':')

      if (potonganTeksTipeKeluaran.length > 1) {
        tipeKeluaran = potonganTeksTipeKeluaran[1].trim()
      }
    }

    return {
      nama: nama,
      koleksiParameter: koleksiParameter,
      tipeKeluaran: tipeKeluaran
    }
  }

  // edit atribut
  export function mulaiEditMetode(): void {
    if (metode) {
      teksAtributTerformatSementara = hasilkanTeksAtributTerformat(metode)
    } else {
      teksAtributTerformatSementara = ''
    }
    sedangMengedit = true
    window.addEventListener('click', tanganiMouseKlikSaatMengedit)
    mulaiMengedit?.()
  }

  function tanganiSelesaiMengedit(): void {
    sedangMengedit = false

    if (!metode) {
      if (teksAtributTerformatSementara.trim().length > 0) {
        const parameterAtributBaru = hasilkanParameterBuatMetodeDariTeksTerformat(
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

      const parameterAtributBaru = hasilkanParameterBuatMetodeDariTeksTerformat(
        teksAtributTerformatSementara
      )
      selesaiMengedit(parameterAtributBaru)
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
  ondblclick={mulaiEditMetode}
>
  {#if metode}
    <span class={`px-2 select-none ${sedangMengedit ? 'opacity-0' : ''}`}>
      {hasilkanTeksAtributTerformat(metode)}
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
