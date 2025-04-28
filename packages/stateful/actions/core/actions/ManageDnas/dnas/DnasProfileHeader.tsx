import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { EntityType } from '@dao-dao/types'

import { ProfileImage, ProfileNameDisplayAndEditor } from '@dao-dao/stateless/components/profile'
import { StatusCard } from '@dao-dao/stateless/components/StatusCard'
import { DnasProfileHeaderProps } from '@dao-dao/stateful/actions/core/actions/ManageDnas/types'

export const DnasProfileHeader = ({
  editable,
  profile,
  entity,
  manageDnasProfileType,
  openManageDnasProfileModal,
  updateProfile,
  openProfileNftUpdate,
  className,
  children,
}: DnasProfileHeaderProps) => {
  const { t } = useTranslation()

  const canEditProfile =
    editable &&
    profile &&
    !profile.loading &&
    profile.data.nonce >= 0 &&
    !manageDnasProfileType

  const loading = entity?.loading || profile?.loading

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 text-center',
        className
      )}
    >
      {/* {editable &&
        !loading &&
        // profile.data.nonce > -1 &&
        // manageDnasProfileType && 
        (
        )} */}
      <StatusCard
        className="max-w-xs mb-4 text-left"
        content={
          manageDnasProfileType === 'add'
            ? t('info.addDnasKeyToProfile')
            : t('info.noDnasAddUntilProfileRegister')
        }
        onClick={openManageDnasProfileModal}
        size="sm"
        style="warning"
      />

      {/* {profile && (
        <ProfileNameDisplayAndEditor
          header
          hideNoNameTooltip
          nameOverride={
            (entity &&
              !entity.loading &&
              entity.data.type === EntityType.Dao &&
              entity.data.name) ||
            undefined
          }
          profile={profile}
          updateProfile={canEditProfile ? updateProfile : undefined}
        />
      )} */}

      {children}
    </div>
  )
}
