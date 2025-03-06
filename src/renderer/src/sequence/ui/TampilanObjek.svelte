<script lang="ts">
  import { Koordinat } from '../../common/entitas/Koordinat'

  interface Properti {
    nama: string
    posisi?: Koordinat
  }
  const { nama, posisi = new Koordinat() }: Properti = $props()
</script>

<div class="absolute" style={`left: ${posisi.x}px; top: ${posisi.y}px`}>
  <div class="border py-1 px-4 select-none">{nama}</div>
</div>
