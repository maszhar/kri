<script lang="ts">
  import { Koordinat } from '../../../../umum/entitas/Koordinat'

  interface Properti {
    posisi?: Koordinat
  }
  const { posisi = new Koordinat() }: Properti = $props()
</script>

<div
  class="absolute rounded-full w-4 h-4 bg-sky-200 flex justify-center items-center pointer-events-none"
  style={`left: ${posisi.x}px; top: ${posisi.y}px;`}
>
  <div class="rounded-full w-2 h-2 bg-sky-400"></div>
</div>
