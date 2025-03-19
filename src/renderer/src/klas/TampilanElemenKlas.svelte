<script lang="ts">
  interface Properti {
    nama: string
    adaYangMengedit: boolean
    dipilih: boolean
    mintaDipilih: () => void
    indeks: number
  }
  let { nama, adaYangMengedit, dipilih, indeks, mintaDipilih }: Properti = $props()

  function tanganiKlik(e: MouseEvent): void {
    if (!adaYangMengedit) {
      mintaDipilih()
      e.stopPropagation()
    }
  }
</script>

<div
  class={`absolute border ${adaYangMengedit ? 'cursor-default' : 'cursor-move'} ${dipilih ? 'border-blue-600 ring-2 ring-blue-600' : 'border-black'}`}
  onclick={tanganiKlik}
  role="button"
  tabindex={20000 + indeks}
  onkeydown={(): void => {}}
>
  <div class="select-none font-bold py-1 px-4">{nama}</div>
</div>
