import { Add } from '@mui/icons-material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { registerDnasKeyVisibleAtom } from '@dao-dao/state'
import {
  Button,
  ChainProvider,
  CodeMirrorInput,
  InputLabel,
  Modal,
  NumericInput,
  ProfileImage,
  ProfileNameDisplayAndEditor,
  RadioInputNoForm,
  TextInput,
  Tooltip,
  useActionsContext,
  useDao,
  useDaoIfAvailable,
} from '@dao-dao/stateless'
import { processError } from '@dao-dao/utils'

import { useManageProfile, useRefreshProfile, useWallet } from '../../../../../hooks'
import { useForm, useFormContext } from 'react-hook-form'
import { EntityDisplay } from '../../../../../components/EntityDisplay'
import { ActionContextType, ActionOptions, DnasObjectWithValues, Entity } from '@dao-dao/types'
import { DnasLine } from './DnasLine'
import { ManageDnasActionData } from './ManageDnasComponent'
import { DnasKeyWithValueWithoutId } from '../types'
import { useDnas } from '../hooks'

export const CreateDnasProfilesModal = () => {
  const { t } = useTranslation()
  const [visible, setVisible] = useRecoilState(registerDnasKeyVisibleAtom)
  const [selectedProfileChainId, setSelectedProfileChainId] = useState<
    string | undefined
  >()
  const { address: walletAddress, chain: walletChain } = useWallet()

  const {
    profile,
    addDnasToDao,
  } = useDnas();

  // Use proper type with the correct structure
  const { control, watch, register, setValue, handleSubmit } = useForm<ManageDnasActionData>();

  // Watch form fields with proper naming structure
  const watchDnasKeyValue = watch(('dnas.apiKeyValue'));
  const watchDnasKeyOwner = watch('dnas.keyOwner');
  const watchDnasDao = watch('dnas.daoAddr');
  const watchDnasKeyMetadata = watch('dnas.keyMetadata');
  const watchUploadLimit = watch('dnas.uploadLimit');
  const watchDnasChainId = watch('dnas.chainId');
  const watchUpdating = watch('updating');
  const walletChainId = walletChain.chainId;
  const dnas = watch('dnas')


  // Form submission handler
  const onSubmit = handleSubmit((data: ManageDnasActionData) => {
    // Prepare the final data for signature
    const dnasData = {
      daoAddr: data.dnas.daoAddr != '' ? data.dnas.daoAddr : watchDnasDao,
      apiKeyValue: btoa(data.dnas.apiKeyValue || watchDnasKeyValue || ''),
      keyMetadata: data.dnas.keyMetadata || watchDnasKeyMetadata,
      keyOwner: data.dnas.keyOwner || watchDnasKeyOwner,
      chainId: data.dnas.chainId || watchDnasChainId || selectedProfileChainId || walletChain.chainId,
      uploadLimit: data.dnas.uploadLimit || watchUploadLimit || "1024"

    };

    // Pass the data to your DNAS registration function
    addDnasToDao.go([{ type: 'jackalPin', ...dnasData }]);
  });

  // Determine if this is a new profile or existing one
  const isNewProfile = useMemo(() => {
    if (profile.loading || !profile.data) return true;
    // Check if the profile has any existing DNAS entries
    return !Object.values(profile.data.chains).some(chainData =>
      chainData.dnas && Object.keys(chainData.dnas).length > 0
    );
  }, [profile]);

  // Set the newProfile value in the form data
  useEffect(() => {
    console.log("dnas", dnas)
  }, [dnas]);

  // Debugging values
  useEffect(() => {
    console.log("modal values 3:", useDao)
    console.log("Form values:", {
      updating: watchUpdating,
      chainId: watchDnasChainId,
      uploadLimit: watchUploadLimit,
      keyOwner: walletAddress,
      keyValue: watchDnasKeyValue,
      keyMetadata: watchDnasKeyMetadata
    });
  }, [watchUpdating, watchDnasChainId, watchUploadLimit, watchDnasKeyOwner, watchDnasKeyValue, watchDnasKeyMetadata]);



  // Get DNAS keys from the profile
  const dnasKeys = useMemo(() => {
    // For a brand new profile with form values, create a temporary DNAS object
    if (isNewProfile && watchDnasKeyValue) {
      return [{
        daoAddr: watchDnasDao || '',
        keyMetadata: watchDnasKeyMetadata || '',
        keyOwner: walletAddress || '',
        apiKeyValue: btoa(watchDnasKeyValue || ''),
        uploadLimit: watchUploadLimit || "1024",
        chainId: watchDnasChainId || selectedProfileChainId || walletChainId,
      }];
    }

    // If profile is still loading or no chain selected, return empty array
    if (profile.loading || !profile.data || !selectedProfileChainId) {
      return [];
    }

    // Get chain data from profile
    const chainData = profile.data.chains[selectedProfileChainId];
    if (!chainData || !chainData.dnas) {
      return [];
    }

    // Convert DNAS record to array with key information preserved
    return Object.entries(chainData.dnas).map(([daoAddr, dnaData]): DnasObjectWithValues => ({
      ...dnaData,
      daoAddr,
      chainId: selectedProfileChainId,
      apiKeyValue: daoAddr === watchDnasKeyValue ? btoa(watchDnasKeyValue || '') : '',
      keyOwner: profile.data.chains[selectedProfileChainId].address,
    }));
  }, [profile, selectedProfileChainId, isNewProfile, watchDnasKeyValue, watchDnasDao,
    watchDnasKeyMetadata, watchDnasKeyOwner, watchUploadLimit, walletChainId, watchDnasChainId]);

  if (profile.loading) {
    return null;
  }

  const newDnasForm = {
    daoAddr: watchDnasDao,
    apiKeyValue: watchDnasKeyValue,
    keyMetadata: watchDnasKeyMetadata,
    keyOwner: walletAddress,
    chainId: watchDnasChainId || selectedProfileChainId || walletChainId,
    uploadLimit: watchUploadLimit || "1024"
  };

  return (
    <Modal
      header={{
        title: t('title.createDnasProfile'),
        subtitle: t('info.createDnasProfileExplanation')
      }}
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <form onSubmit={onSubmit}>
        {dnasKeys && dnasKeys.length > 0 ? (
          // <RadioInputNoForm<string>
          //   className="!flex-col !gap-1"
          //   onChange={(chainId) => {
          //     setSelectedProfileChainId(chainId);
          //     // Find the selected profile data
          //     const selectedProfile = dnasKeys.find(profile => profile.daoAddr === chainId);
          //     if (selectedProfile) {
          //       // Update form values based on selection
          //       setValue('dnas.daoAddr', selectedProfile.daoAddr);
          //       setValue('dnas.keyOwner', selectedProfile.keyOwner);
          //       setValue('dnas.chainId', selectedProfile.chainId);
          //       setValue('dnas.keyMetadata', selectedProfile.keyMetadata);
          //       setValue('dnas.uploadLimit', selectedProfile.uploadLimit);
          //       setValue('updating', true);
          //     }
          //   }}
          //   options={dnasKeys.map((profile) => ({
          //     value: profile.daoAddr,
          //     display: (
          //       <div className="flex min-w-0 flex-row items-center gap-2">
          //         <InputLabel name={t('form.dnasKeyValue')} />
          //         {/* <DnasLine
          //           key={profile.keyOwner}
          //           onClick={() => { }}
          //           chainId={profile.chainId}
          //           daoAddr={profile.daoAddr}
          //           EntityDisplay={EntityDisplay}
          //         /> */}
          //         <div className="flex min-w-0 flex-row items-center gap-2">
          //           {profile.keyMetadata}
          //           {profile.apiKeyValue}
          //           {profile.uploadLimit}
          //         </div>
          //       </div>
          //     ),
          //   }))}
          //   selected={selectedProfileChainId}
          // />
          <></>
        ) : (
          <></>
        )}
        <>
          {/* Make dao address field visible */}
          <Tooltip title={t('info.daoAddress')}>
            <InputLabel name={t('form.daoAddress')} />
          </Tooltip>
          <TextInput
            fieldName="dnas.daoAddr"
            register={register}
            defaultValue={watchDnasDao}
            required
          />


          {/* if no keys for this profile, display forms for registering one */}
          <Tooltip title={t('info.dnasKeyUseLimit')}>
            <InputLabel name={t('form.dnasKeyMetadata')} />
          </Tooltip>
          <CodeMirrorInput
            control={control}
            fieldName="dnas.keyMetadata"
            validation={[]}
          />

          <Tooltip title={t('info.dnasKeyUseLimit')}>
            <InputLabel name={t('form.dnasKeyUseLimit')} />
          </Tooltip>
          <NumericInput
            fieldName="dnas.uploadLimit"
            max={1048576}
            min={1}
            numericValue
            register={register}
            sizing="sm"
            step={1}
            validation={[]}
          />

          <Tooltip title={t('info.dnasKeyValue')}>
            <>
              <InputLabel name={t('form.dnasKeyValue')} />
              <TextInput
                fieldName="dnas.apiKeyValue"
                register={register}
                required
              />
            </>
          </Tooltip>



          <ChainProvider chainId={selectedProfileChainId || walletChainId}>
            <PerformDnasKeyRegister
              dnas={[newDnasForm as DnasObjectWithValues]}
              key={selectedProfileChainId || walletChainId}
              updatingExistingDnasKey={watchUpdating}
              onClose={() => setVisible(false)}
            />
          </ChainProvider>
        </>
      </form>
    </Modal>
  );
};

type PerformMergeProps = {
  dnas: DnasObjectWithValues[]
  updatingExistingDnasKey: boolean
  onClose: () => void
}

const PerformDnasKeyRegister = ({ updatingExistingDnasKey, onClose, dnas }: PerformMergeProps) => {
  const { t } = useTranslation();
  const { addDnasToDao } = useDnas()
  // CORRECT STRUCTURE (flattened properties)
  const daosToRegisterKeysTo: DnasKeyWithValueWithoutId[] = dnas ? dnas.map((data) => ({
    daoAddr: data.daoAddr,
    chainId: data.chainId,
    keyOwner: data.keyOwner,
    type: 'jackalPin',
    keyMetadata: data.keyMetadata,
    uploadLimit: data.uploadLimit,
    apiKeyValue: data.apiKeyValue ? data.apiKeyValue : '',
    // Include any other required properties from ProfileDnasKeyWithoutIds
  })) : []

  return (
    <Button
      center
      className="mt-4"
      onClick={async () => {
        try {
          console.log("daosToRegisterKeysTo:", daosToRegisterKeysTo);

          // Check for required fields before submission
          const hasInvalidData = daosToRegisterKeysTo.some(item =>
            !item.daoAddr || !item.apiKeyValue || !item.keyOwner
          );

          if (hasInvalidData) {
            toast.error(t('error.missingRequiredFields'));
            return;
          }

          await addDnasToDao.go(daosToRegisterKeysTo);
          toast.success(t('success.addedDnasToProfile'));
          onClose();
        } catch (err) {
          console.error(err);
          toast.error(processError(err));
        }
      }}
      size="lg"
      variant="brand"
    >
      {updatingExistingDnasKey ? (
        <>
          <Add className="!h-5 !w-5" />
          {t('button.updateDnasKey')}
        </>
      ) : (
        t('button.createNewDnasProfile')
      )}
    </Button>
  );
};