<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Properti {
    children?: Snippet
  }
  const { children }: Properti = $props()
</script>

<div class="relative border min-h-40">
  <div class="absolute">
    <svg
      class="absolute w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 20"
      preserveAspectRatio="xMaxYMid slice"
    >
      <line
        x1="0"
        y1="20"
        x2="295"
        y2="20"
        vector-effect="non-scaling-stroke"
        stroke-width="1.5"
        shape-rendering="crispEdges"
        stroke="black"
      />
      <line
        x1="300"
        y1="0"
        x2="300"
        y2="15"
        vector-effect="non-scaling-stroke"
        stroke-width="1.5"
        shape-rendering="crispEdges"
        stroke="black"
      />
      <line
        x1="300"
        y1="15"
        x2="295"
        y2="20"
        vector-effect="non-scaling-stroke"
        stroke-width="1"
        shape-rendering="crispEdges"
        stroke="black"
      />
    </svg>
    <div class="text-sm pt-1 pb-1.5 px-3"><strong>sd</strong> Nama Interaksi</div>
  </div>
  {@render children?.()}
</div>
