<script lang="ts">
  import type { Koordinat } from '../../../umum/entitas/Koordinat'

  interface Properti {
    posisi: Koordinat
  }
  const { posisi }: Properti = $props()
</script>

<svg width="200" height="1" class="absolute" style={`top: ${posisi.y}px; left: ${posisi.x}px;`}>
  <line x1="0" y1="0" x2="200" y2="0" stroke="black" stroke-width="1" />
</svg>
