<script lang="ts">
  import type { Koordinat } from '../../../umum/entitas/Koordinat'

  interface Properti {
    posisiAsal: Koordinat
    posisiTujuan: Koordinat
  }
  const { posisiAsal, posisiTujuan }: Properti = $props()

  let posisiKiri = $state(hitungPosisiKiri(posisiAsal, posisiTujuan))
  let posisiAtas = $state(hitungPosisiAtas(posisiAsal, posisiTujuan))
  let lebar = $state(hitungLebar(posisiAsal, posisiTujuan))
  let tinggi = $state(hitungTinggi(posisiAsal, posisiTujuan))

  function hitungPosisiKiri(posisiAsal: Koordinat, posisiTujuan: Koordinat): number {
    return Math.min(posisiAsal.x, posisiTujuan.x)
  }

  function hitungPosisiAtas(posisiAsal: Koordinat, posisiTujuan: Koordinat): number {
    return Math.min(posisiAsal.y, posisiTujuan.y)
  }

  function hitungLebar(posisiAsal: Koordinat, posisiTujuan: Koordinat): number {
    return Math.abs(posisiAsal.x - posisiTujuan.x)
  }

  function hitungTinggi(posisiAsal: Koordinat, posisiTujuan: Koordinat): number {
    return Math.abs(posisiAsal.y - posisiTujuan.y)
  }

  $effect(() => {
    posisiKiri = hitungPosisiKiri(posisiAsal, posisiTujuan)
    posisiAtas = hitungPosisiAtas(posisiAsal, posisiTujuan)
    lebar = hitungLebar(posisiAsal, posisiTujuan)
    tinggi = hitungTinggi(posisiAsal, posisiTujuan)
  })
</script>

<svg
  width={lebar}
  height={tinggi}
  class="absolute"
  style={`top: ${posisiAtas}px; left: ${posisiKiri}px;`}
>
  <line
    x1={posisiAsal.x - posisiKiri}
    y1={posisiAsal.y - posisiAtas}
    x2={posisiTujuan.x - posisiKiri}
    y2={posisiTujuan.y - posisiAtas}
    stroke="black"
    stroke-width="1"
  />
</svg>
