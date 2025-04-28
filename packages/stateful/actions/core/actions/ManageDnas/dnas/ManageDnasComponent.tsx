// load all registered dnas for this profile
// handle forms for registering or removing dnas for this profile
// handle successful responses

// load dnas available for dao
// handle form for selecting key owner + files 
// handle returning sucessful upload metadata
// handle form for adding new content to the custom open edition
import { Check, Close, WarningRounded } from '@mui/icons-material'
import { useEffect, useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
    constSelector,
    useRecoilState,
    useRecoilValue,
    useRecoilValueLoadable,
    useSetRecoilState,
    waitForAny,
} from 'recoil'

import { CommonNftSelectors, DaoDaoCoreSelectors, registerDnasKeyVisibleAtom } from '@dao-dao/state/recoil'
import {
    AddressInput,
    Button,
    ButtonLink,
    CodeMirrorInput,
    FileUploadInput,
    FormattedJsonDisplay,
    IconButton,
    ImageUploadInput,
    InputErrorMessage,
    InputLabel,
    NoContent,
    TextAreaInput,
    TextInput,
    useActionOptions,
} from '@dao-dao/stateless'
import { ActionComponent, DnasObjectWithValues, WidgetEditorProps } from '@dao-dao/types'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import {
    isValidBech32Address,
    makeValidateAddress,
    transformIpfsUrlToHttpsIfNecessary,
    validateCosmosMsgForChain,
    validateJSON,
    validateRequired,
} from '@dao-dao/utils'

import { DnasLine } from './DnasLine'

import { EntityDisplay } from '../../../../../components/EntityDisplay'
import { useDnas } from '../hooks'
import { useEntity } from '../../../../../hooks'


export type ManageDnasActionData = {
    // managing
    fieldNamePrefix: string
    updating: boolean
    newProfile?: boolean
    dnas: DnasObjectWithValues
}

export const HandleDnasKeysRenderer: ActionComponent<ManageDnasActionData> = ({ fieldNamePrefix, isCreating, options }) => {
    const { t } = useTranslation()
    const {
        address,
        chain: { chainId, bech32Prefix },
        queryClient,
    } = useActionOptions()

    const { unregisterDnasKey } = useDnas()
    // todo: set option for multi-chain support 
    const { dnas, profile } = useDnas({ chainId })
    const {
        control,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<ManageDnasActionData>()

    const watchNeedNewProfile = watch((fieldNamePrefix + 'newProfile') as 'newProfile')
    // check if connected wallet has any dnas keys

    // Get the setter function at the component level
    const [registerDnasKeyVisible, setRegisterDnasKeyVisible] = useRecoilState(registerDnasKeyVisibleAtom);

    // Improved click handler with additional logging
    const handleShowModal = () => {
        console.log('Show modal clicked, setting to true');
        setRegisterDnasKeyVisible(true);
        console.log('Modal visibility after setting:', registerDnasKeyVisible); // This might still show the old value due to React's state update timing

        // Force check state after React has processed the update
        setTimeout(() => {
            console.log('Modal visibility after timeout:', registerDnasKeyVisible);
        }, 0);
    };

    // load wallet and dao keys: (what is best  way to do this)
    //  hook, useQueries  , useCachedLoading , useRecoilValueLoadable  , 
    const watchDnasDao = watch((fieldNamePrefix + 'dnas.daoAddr') as 'dnas.daoAddr')
    const watchApiKeyHash = watch((fieldNamePrefix + 'dnas.apiKeyHash') as 'dnas.apiKeyHash')
    const watchApiKeyValue = watch((fieldNamePrefix + 'dnas.apiKeyValue') as 'dnas.apiKeyValue')


    // Set initial values when modal becomes visible or profile changes
    useEffect(() => {
        console.log("profile:", profile)
        console.log("dnas:", dnas)
    }, [profile,]);

    return (
        <>
            <div className="flex flex-col items-start gap-1">
                <div className="space-y-1">

                    {dnas && dnas.length > 0 ? (<>
                        {Object.values(dnas).map((info, index) => (
                            <DnasLine
                                key={info.chainId + index}
                                onClick={handleShowModal}
                                onUpdate={() => {
                                    setValue((fieldNamePrefix + 'dnas.daoAddr') as 'dnas.daoAddr', info.daoAddr)
                                    setValue((fieldNamePrefix + 'dnas.keyOwner') as 'dnas.keyOwner', info.keyOwner)
                                    setValue((fieldNamePrefix + 'dnas.apiKeyHash' as 'dnas.apiKeyHash'), info.keyHashValue)
                                    setValue((fieldNamePrefix + 'dnas.apiKeyValue') as 'dnas.apiKeyValue', '')
                                    console.log("watchDnasDao:", watchDnasDao)
                                    setRegisterDnasKeyVisible(true)
                                }}
                                onRemove={() => {
                                    //  set values to map when updating and removing to have in form
                                    setValue((fieldNamePrefix + 'dnas.daoAddr') as 'dnas.daoAddr', info.daoAddr)
                                    setValue((fieldNamePrefix + 'dnas.keyOwner') as 'dnas.keyOwner', info.keyOwner)
                                    setValue((fieldNamePrefix + 'dnas.apiKeyHash') as 'dnas.apiKeyHash', info.keyHashValue)
                                    setValue((fieldNamePrefix + 'dnas.apiKeyValue') as 'dnas.apiKeyValue', '')

                                    !profile.loading && unregisterDnasKey.go({
                                        daoAddrs: [info.daoAddr],
                                        nonce: profile.data.nonce,
                                    })
                                }}
                                chainId={info.chainId}
                                daoAddr={info.daoAddr}
                                EntityDisplay={EntityDisplay}
                            />
                        ))}
                        <Button
                            className="self-start"
                            onClick={() => setRegisterDnasKeyVisible(true)}
                            variant="secondary"
                        >
                            {t('button.registerNewDnasKey')}
                        </Button>
                    </>) : (<>

                        <NoContent
                            Icon={WarningRounded}
                            actionNudge={t('info.registerFirstDnasKey')}
                            body={t('info.addDnasKeyToProfile')}
                            buttonLabel={t('button.create')}
                            onClick={handleShowModal}
                        /></>)
                    }-
                    {/* <ActiveShitStrapLineHeader /> */}
                </div>
            </div >
        </>
    )
}

// Add this to your component
const ModalDebugger = () => {
    // Get both the value and the setter for debugging
    const [isVisible, setIsVisible] = useRecoilState(registerDnasKeyVisibleAtom);

    return (
        <div className="fixed bottom-4 right-4 bg-bg-secondary p-3 rounded-md shadow-lg z-50 border border-border-primary">
            <div className="mb-2">Modal Visible: {isVisible ? 'Yes' : 'No'}</div>
            <div className="flex gap-2">
                <button
                    className="px-3 py-1 bg-primary text-white rounded-md"
                    onClick={() => setIsVisible(true)}
                >
                    Force Show
                </button>
                <button
                    className="px-3 py-1 bg-error text-white rounded-md"
                    onClick={() => setIsVisible(false)}
                >
                    Force Hide
                </button>
            </div>
        </div>
    );
};
