<script lang="ts">
  interface Properti {
    pesan: string
    oke: () => void
  }
  const { pesan, oke }: Properti = $props()
</script>

<div
  class="top-0 left-0 fixed z-50 w-full h-full bg-black/75 backdrop-blur-xs flex items-center justify-center"
>
  <div class="bg-white rounded-md w-full max-w-md">
    <!-- Judul -->
    <div class="border-b py-2 px-4 font-bold">Pesan</div>

    <!-- Isi -->
    <div class="px-4 py-2 border-b">{pesan}</div>

    <!-- Aksi -->
    <div class="flex px-4 py-2 justify-end">
      <button class="border px-4 py-0.5 cursor-pointer" onclick={oke}>Oke</button>
    </div>
  </div>
</div>
