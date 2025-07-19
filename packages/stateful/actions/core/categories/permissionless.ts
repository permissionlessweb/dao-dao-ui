import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionChainContextType,
  ActionKey,
  ChainId,
} from '@dao-dao/types'

export const makeManagePermissionlessActionCategory: ActionCategoryMaker = ({
  t,
  context,
  chainContext,
}) =>
  // Chains without CosmWasm cannot use NFTs.
  chainContext.type !== ActionChainContextType.Any &&
  !chainContext.config.noCosmWasm &&
  // OmniFlix doesn't use CW721 NFTs.
  chainContext.chainId !== ChainId.OmniflixHubMainnet
    ? {
        key: ActionCategoryKey.PermissionlessWeb,
        label: t('actionCategory.permissionlessWeb'),
        description: t('actionCategory.permissionlessWebDescription', {
          context: context.type,
        }),
        actionKeys: [
          ActionKey.InfuseNfts,
          // ActionKey.ManageAvEvents,
          // ActionKey.ManageDnas,
          // ActionKey.ManageShitstrap,
          // ActionKey.ManageHeadstash,
        ],
      }
    : null
