<script lang="ts">
  import type { SistemLangsung } from '../umum/entitas/SistemLangsung.svelte'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import Kanvas from '../umum/ui/Kanvas.svelte'

  interface Properti {
    sistem: SistemLangsung
  }
  const { sistem }: Properti = $props()
</script>

<Kanvas ukuran={new Ukuran2D(1024, 600)}>
  <div class="w-full h-full flex flex-col p-8">
    <input
      type="text"
      class="py-0.5 px-2 border-b font-bold text-3xl outline-none focus:border-b-4"
      bind:value={(): string => sistem.dapatkanNama(), (v: string): void => sistem.aturNama(v)}
    />
  </div>
</Kanvas>
