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
      key: ActionCategoryKey.Permissionless,
      label: t('actionCategory.permissionless'),
      description: t('actionCategory.permissionlessDescription', {
        context: context.type,
      }),
      actionKeys: [
        ActionKey.ManageDnas,
        ActionKey.InfuseNfts,
        ActionKey.ManageShitstrap,
        // ActionKey.ManageHeadstash,
      ],
    }
    : null
