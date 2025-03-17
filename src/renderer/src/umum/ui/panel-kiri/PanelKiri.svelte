<script lang="ts">
  import type { SequenceDiagram } from '../../../../../umum/entitas/SequenceDiagram'
  import TampilanItemKomponenProyek from './komponen/TampilanItemKomponenProyek.svelte'

  interface Properti {
    koleksiSequenceDiagram: SequenceDiagram[]
  }
  const { koleksiSequenceDiagram }: Properti = $props()

  let itemDipilih = $state(-1)
  let elemenPanel: HTMLDivElement

  function tanganiPanelDiklik(e: MouseEvent): void {
    if (elemenPanel === e.target) {
      hilangkanPilihan()
    }
  }

  function tanganiKeyboardTurunDiPanel(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      hilangkanPilihan()
    }
  }

  function hilangkanPilihan(): void {
    itemDipilih = -1
  }

  function pilih(indeks: number): void {
    itemDipilih = indeks
  }

  let koleksiClassDiagram = ['a']
</script>

<div
  class="w-50 bg-white border-r-2 border-zinc-400 flex flex-col flex-none p-3 overflow-auto"
  role="button"
  tabindex={11}
  onclick={tanganiPanelDiklik}
  onkeydown={tanganiKeyboardTurunDiPanel}
  bind:this={elemenPanel}
>
  <TampilanItemKomponenProyek
    saatDipilih={(): void => pilih(0)}
    indeks={0}
    dipilih={itemDipilih === 0}
  >
    Proyek
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={1}
    saatDipilih={(): void => pilih(1)}
    indeks={1}
    dipilih={itemDipilih === 1}
  >
    Class Diagram
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={2}
    saatDipilih={(): void => pilih(2)}
    indeks={2}
    dipilih={itemDipilih === 2}
  >
    Class Diagram 1
  </TampilanItemKomponenProyek>
  <TampilanItemKomponenProyek
    level={1}
    saatDipilih={(): void => pilih(koleksiClassDiagram.length + 3)}
    indeks={koleksiClassDiagram.length + 3}
    dipilih={itemDipilih === koleksiClassDiagram.length + 3}
  >
    Sequence Diagram
  </TampilanItemKomponenProyek>

  {#each koleksiSequenceDiagram as sequenceDiagram, indeks}
    <TampilanItemKomponenProyek
      level={2}
      saatDipilih={(): void => pilih(koleksiClassDiagram.length + 4 + indeks)}
      indeks={koleksiClassDiagram.length + 4 + indeks}
      dipilih={itemDipilih === koleksiClassDiagram.length + 4 + indeks}
    >
      {sequenceDiagram.nama}
    </TampilanItemKomponenProyek>
  {/each}
</div>
