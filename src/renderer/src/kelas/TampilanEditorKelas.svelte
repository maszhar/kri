<script lang="ts">
  import type { KelasLangsung } from '../umum/entitas/KelasLangsung.svelte'
  import type { SistemLangsung } from '../umum/entitas/SistemLangsung.svelte'
  import { Ukuran2D } from '../umum/entitas/Ukuran2D'
  import Kanvas from '../umum/ui/Kanvas.svelte'
  import TampilanKelas from './TampilanKelas.svelte'

  interface Properti {
    sistem: SistemLangsung
    kelas: KelasLangsung
  }
  const { sistem, kelas }: Properti = $props()
</script>

<Kanvas ukuran={new Ukuran2D(-1, -1)}>
  <div class="p-4">
    <TampilanKelas {kelas} {sistem} />
  </div>
</Kanvas>
