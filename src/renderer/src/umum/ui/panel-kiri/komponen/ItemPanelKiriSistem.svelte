<script lang="ts">
  import type { SistemLangsung } from '../../../entitas/SistemLangsung.svelte'
  import ItemPanelKiri from './ItemPanelKiri.svelte'

  interface Properti {
    level: number
    sistem: SistemLangsung
    idAktif: number
    pilih: (id: number) => void
  }
  const { level, sistem, idAktif, pilih }: Properti = $props()
</script>

<ItemPanelKiri {level} label={sistem.dapatkanNamaLangsung()} {idAktif} {pilih} />
