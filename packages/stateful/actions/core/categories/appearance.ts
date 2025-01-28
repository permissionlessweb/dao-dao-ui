import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionContextType,
  ActionKey,
} from '@dao-dao/types'

export const makeAppearanceActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) =>
  // Only DAOs.
  context.type === ActionContextType.Dao
    ? {
        key: ActionCategoryKey.Appearance,
        label: t('actionCategory.appearanceLabel'),
        description: t('actionCategory.appearanceDescription'),
        actionKeys: [ActionKey.UpdateInfo, ActionKey.ManageWidgets],
      }
    : null
