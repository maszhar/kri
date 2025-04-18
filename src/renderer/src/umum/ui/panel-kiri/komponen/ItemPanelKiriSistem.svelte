<script lang="ts">
  import type { IsiProyek } from '../../../../../../umum/entitas/IsiProyek'
  import type { Koordinat } from '../../../../../../umum/entitas/Koordinat'
  import type { SistemLangsung } from '../../../entitas/SistemLangsung.svelte'
  import IkonSistem from '../../ikon/IkonSistem.svelte'
  import { JenisMenuPanelKiri } from '../JenisMenuPanelKiri'
  import ItemPanelKiri from './ItemPanelKiri.svelte'
  import ItemPanelKiriSistem from './ItemPanelKiriSistem.svelte'

  interface Properti {
    level: number
    sistem: SistemLangsung
    idAktif: number
    pilih: (id: number) => void
    bukaMenu: (posisiKlik: Koordinat, jenis: JenisMenuPanelKiri, ref: IsiProyek) => void
    idPrefix: number
    bukaSistem: (sistem: SistemLangsung) => void
    isiProyekAktif: IsiProyek
  }
  const {
    level,
    sistem,
    idAktif,
    pilih,
    bukaMenu,
    idPrefix,
    bukaSistem,
    isiProyekAktif
  }: Properti = $props()

  const id = parseInt(`${idPrefix}${sistem.dapatkanId()}`)

  const koleksiSubsistem = sistem.dapatkanKoleksiSubsistemLangsung()
</script>

<ItemPanelKiri
  {level}
  label={sistem.dapatkanNamaLangsung()}
  {idAktif}
  {pilih}
  bukaMenu={(posisiKlik: Koordinat): void =>
    bukaMenu(posisiKlik, JenisMenuPanelKiri.SISTEM, sistem)}
  {id}
  punyaChildren={koleksiSubsistem.length > 0}
  buka={(): void => bukaSistem(sistem)}
  aktif={isiProyekAktif === sistem}
>
  {#snippet ikon()}
    <IkonSistem class="w-full h-full" />
  {/snippet}

  {#snippet itemChildren(level: number)}
    {#if koleksiSubsistem.length > 0}
      <ItemPanelKiri
        id={parseInt(`${id}0`)}
        {level}
        label="Subsistem"
        {idAktif}
        {pilih}
        bukaMenu={(posisiKlik: Koordinat): void =>
          bukaMenu(posisiKlik, JenisMenuPanelKiri.JUDUL_SISTEM, sistem)}
        punyaChildren={true}
      >
        {#snippet ikon()}
          <IkonSistem class="w-full h-full" />
        {/snippet}
        {#snippet itemChildren(levelDalam: number)}
          {#each koleksiSubsistem as subsistem}
            <ItemPanelKiriSistem
              {bukaMenu}
              {idAktif}
              level={levelDalam}
              idPrefix={parseInt(`${id}0`)}
              sistem={subsistem}
              {pilih}
              {bukaSistem}
              {isiProyekAktif}
            />
          {/each}
        {/snippet}
      </ItemPanelKiri>
    {/if}
  {/snippet}
</ItemPanelKiri>
