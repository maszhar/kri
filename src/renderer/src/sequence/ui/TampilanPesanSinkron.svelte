<script lang="ts">
  import { Koordinat } from '../../common/entitas/Koordinat'

  interface Properti {
    posisi?: Koordinat
    panjang?: number
  }
  const { posisi = new Koordinat(), panjang = 200 }: Properti = $props()
</script>

<div class="absolute" style={`left: ${posisi.x}px; top: ${posisi.y}px;`}>
  <svg width={panjang} height="15" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="head" orient="auto" markerWidth="5" markerHeight="6" refX="0" refY="3">
        <path d="M0,0 V6 L5,3 Z" fill="black" />
      </marker>
    </defs>

    <line
      stroke-width="2"
      stroke="black"
      x1="0"
      y1="7"
      x2={panjang - 20}
      y2="7"
      marker-end="url(#head)"
    />
  </svg>
</div>
