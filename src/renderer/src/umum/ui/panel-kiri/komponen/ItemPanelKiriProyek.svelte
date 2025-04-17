<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { ProyekLangsung } from '../../../entitas/ProyekLangsung.svelte'
  import type { SistemLangsung } from '../../../entitas/SistemLangsung.svelte'
  import IkonProyek from '../../ikon/IkonProyek.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'
  import ItemPanelKiriSistem from './ItemPanelKiriSistem.svelte'

  interface Properti {
    idAktif: number
    pilih: (id: number) => void
    proyek: ProyekLangsung
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref?: IsiProyek) => void
    bukaSistem: (sistem: SistemLangsung) => void
  }
  const { proyek, idAktif, pilih, bukaMenu, bukaSistem }: Properti = $props()

  const idProyek = 1
</script>

<ItemPanelKiri
  label={proyek.dapatkanNamaLangsung()}
  punyaChildren={proyek.dapatkanKoleksiSistemLangsung().length > 0}
  {idAktif}
  {pilih}
  bukaMenu={(posisi: Koordinat): void => bukaMenu(posisi, JenisMenuPanelKiri.PROYEK)}
  id={idProyek}
>
  {#snippet ikon()}
    <IkonProyek class="w-full h-full" />
  {/snippet}
  {#snippet itemChildren(level: number)}
    {#each proyek.dapatkanKoleksiSistemLangsung() as sistem, _i (sistem.dapatkanId())}
      <ItemPanelKiriSistem
        {level}
        {sistem}
        {idAktif}
        {pilih}
        {bukaMenu}
        idPrefix={idProyek}
        {bukaSistem}
      />
    {/each}
  {/snippet}
</ItemPanelKiri>
