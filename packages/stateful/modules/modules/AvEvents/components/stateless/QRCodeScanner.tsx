

import { ComponentProps, useEffect, useState } from "react"
import { useZxing } from "react-zxing"
import QRCode from "qrcode"
import { ActionComponent, AvEventInstance, Entity, GuestScannedData, GuestSignatureData, GuestVerificationData, UsherQrData, UsherScannedData } from "@dao-dao/types"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { Button } from "@dao-dao/stateless"
import { useWallet } from "../../../../../hooks"
import { Any } from "cosmjs-types/google/protobuf/any"
import { useAvEvent } from "../../hooks/useAvEvent"


export type EventQrCodeData = {
    // data embedded in usher QR code, being scanned by guest
    guestScannedData?: GuestScannedData;
    // data embedded in guest QR code, being scanned by usher
    usherScannedData?: UsherScannedData;
    // Guest verification data
    guestVerification?: GuestVerificationData;
    // Generated guest signature data
    guestSignatureData?: GuestSignatureData;
    // Signature verification result
    signatureValid?: boolean;
};

export type QrCodeScannerProps = Pick<
    ComponentProps<ActionComponent>,
    'fieldNamePrefix' | 'errors' | 'isCreating'
> & {
    isEventUsher: boolean
    avEventInstance: AvEventInstance
    guestVerification: GuestVerificationData,
    currentEntity: Entity
}

export const QrCodeScanner = ({
    isEventUsher,
    avEventInstance,
    currentEntity,
    guestVerification,
    ...props
}: QrCodeScannerProps) => {
    const { t } = useTranslation()
    const { setValue, watch, control, register } =
        useFormContext<EventQrCodeData>()

    const { address, hexPublicKey } = useWallet()

    const { guestCheckIntoEvent, usherCheckGuestIntoEvent } = useAvEvent()

    // scan & decode QR code 
    const { ref } = useZxing({
        onDecodeResult(result) {
            const scannedData = JSON.parse(result.getText());
            if (isEventUsher) {
                setValue((props.fieldNamePrefix + 'usherScannedData') as 'usherScannedData', scannedData as UsherScannedData);
            } else {
                setValue((props.fieldNamePrefix + 'guestScannedData') as 'guestScannedData', scannedData as GuestScannedData);
            }
        },
    });

    const [eventSegmentId, setEventSegmentId] = useState(0)
    const [qrcode, setQrCodeData] = useState("")
    const [isScanning, setIsScanning] = useState(false)
    const [step, setStep] = useState<'initial' | 'scanning' | 'generating' | 'complete'>('initial')

    const guestScannedData = watch((props.fieldNamePrefix + 'guestScannedData') as 'guestScannedData')
    const usherScannedData = watch((props.fieldNamePrefix + 'usherScannedData') as 'usherScannedData')
    const guestSignature = watch((props.fieldNamePrefix + 'guestSignatureData') as 'guestSignatureData')

    function showQrCode(encodeToQrCodeData: string) {
        QRCode.toDataURL(encodeToQrCodeData).then(setQrCodeData)
    }

    function resetClick() {
        setStep('initial')
        setIsScanning(false)
        setQrCodeData("")
        setValue((props.fieldNamePrefix + 'guestScannedData') as 'guestScannedData', undefined)
        setValue((props.fieldNamePrefix + 'usherScannedData') as 'usherScannedData', undefined)
        setValue((props.fieldNamePrefix + 'guestSignatureData') as 'guestSignatureData', undefined)
    }


    async function startScanning() {
        setIsScanning(true)
        if (!isEventUsher && guestScannedData && step === 'scanning' && !hexPublicKey.loading) {
            setStep('generating')
            // create offline signature to turn into QR Code 
            let checkinRes = await guestCheckIntoEvent.go(guestScannedData)


            const guestSignatureData: GuestSignatureData = {
                signature: checkinRes.signature.signature,
                publicKeyJson: JSON.stringify(checkinRes.signature.pub_key),
                guestWalletAddress: currentEntity.address,
                eventContractAddr: guestScannedData.eventContractAddr,
                eventSegmentId: guestScannedData.eventSegmentId
            }

            setValue((props.fieldNamePrefix + 'guestSignatureData') as 'guestSignatureData', guestSignatureData)

            // Generate QR code for guest display
            const guestQrData: UsherScannedData = {
                signature: guestSignatureData.signature,
                publicKeyJson: guestSignatureData.publicKeyJson,
                guestWalletAddress: guestSignatureData.guestWalletAddress,
                eventSegmentId: guestScannedData.eventSegmentId,
                eventContractAddr: guestScannedData.eventContractAddr

            }
            showQrCode(JSON.stringify(guestQrData))
            setStep('complete')

        } else if (isEventUsher && usherScannedData && step === 'scanning') {
            let usherCheckinGuestRes = await usherCheckGuestIntoEvent.go(usherScannedData)
        }
        setStep('scanning')
    }

    // Generate QR code for usher display
    useEffect(() => {
        if (isEventUsher && step === 'initial') {
            const usherQrData: UsherQrData = {
                eventContractAddr: avEventInstance.eventContract,
                usherWalletAddr: currentEntity.address,
                eventSegmentId: eventSegmentId.toString()
            }
            showQrCode(JSON.stringify(usherQrData))
        }
    }, [isEventUsher, eventSegmentId, avEventInstance.eventContract, currentEntity.address, step])


    return (
        <div className="flex justify-center">
            <div className="rounded-lg bg-background-tertiary w-full max-w-3xl p-6">
                <div className="flex flex-col gap-5">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-white mb-2">
                            {isEventUsher ? 'Event Usher Check-in' : 'Guest Check-in'}
                        </h2>
                        <p className="text-text-secondary">
                            {isEventUsher
                                ? 'Display your QR code for guests to scan, then scan guest QR codes to check them in'
                                : 'Scan the usher QR code to generate your check-in code'
                            }
                        </p>
                    </div>

                    {/* Event Segment Selection */}
                    <div className="rounded-lg border border-border-secondary p-4">
                        <h3 className="text-lg text-white mb-3">Event Segment</h3>
                        <select
                            value={eventSegmentId}
                            onChange={(e) => setEventSegmentId(Number(e.target.value))}
                            className="w-full p-2 rounded bg-background-secondary border border-border-secondary text-white"
                        >
                            {avEventInstance.eventTimeline.map((segment, index) => (
                                <option key={index} value={index}>
                                    {segment.stage_description}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* QR Code Display */}
                    {qrcode && (
                        <div className="rounded-lg border border-border-secondary p-4 text-center">
                            <h3 className="text-lg text-white mb-3">
                                {isEventUsher ? 'Your Usher QR Code' : 'Your Check-in QR Code'}
                            </h3>
                            <div className="flex justify-center mb-4">
                                <img src={qrcode} alt="QR Code" className="max-w-[200px]" />
                            </div>
                            <p className="text-text-secondary text-sm">
                                {isEventUsher
                                    ? 'Show this QR code to guests for scanning'
                                    : 'Show this QR code to the usher to check in'
                                }
                            </p>
                        </div>
                    )}

                    {/* Camera Scanner */}
                    {isScanning && (
                        <div className="rounded-lg border border-border-secondary p-4">
                            <h3 className="text-lg text-white mb-3">
                                {isEventUsher ? 'Scan Guest QR Code' : 'Scan Usher QR Code'}
                            </h3>
                            <video
                                ref={ref as React.RefObject<HTMLVideoElement>}
                                id="video"
                                className="w-full max-w-[400px] h-auto mx-auto rounded"
                            />
                        </div>
                    )}

                    {/* Status Display */}
                    {step === 'generating' && (
                        <div className="rounded-lg border border-border-secondary p-4 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-3"></div>
                            <p className="text-white">Generating signature...</p>
                        </div>
                    )}

                    {step === 'complete' && (
                        <div className="rounded-lg border border-border-secondary p-4 text-center">
                            <div className="text-green-500 text-2xl mb-3">✓</div>
                            <p className="text-white">
                                {isEventUsher
                                    ? 'Guest check-in data received. Ready to submit check-in.'
                                    : 'Check-in code generated successfully!'
                                }
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-center">
                        {step === 'initial' && !isEventUsher && (
                            <Button onClick={startScanning} variant="primary">
                                Scan To Checkin
                            </Button>
                        )}

                        {step === 'initial' && isEventUsher && (
                            <Button onClick={startScanning} variant="primary">
                                Complete Guest Checkin
                            </Button>
                        )}

                        <Button onClick={resetClick} variant="secondary">
                            Reset
                        </Button>
                    </div>

                    {/* Guest Verification Status */}
                    {!isEventUsher && guestVerification && (
                        <div className="rounded-lg border border-border-secondary p-4">
                            <h3 className="text-lg text-white mb-3">Your Status</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary">Guest Weight:</span>
                                <span className="text-white">{guestVerification.guestWeight}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary">Check-in Status:</span>
                                <span className={guestVerification.isCheckedIn ? 'text-green-500' : 'text-red-500'}>
                                    {guestVerification.isCheckedIn ? 'Checked In' : 'Not Checked In'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


{/* <div className="rounded-lg border border-border-secondary">
    <div className="flex flex-col">
        <div className="py-4 px-6">
            <h3 className="text-lg text-white text-center">Guest Type</h3>
            <h3 className="text-lg text-[#F3C674] text-center py-2">

            </h3>
        </div>

        <div className="border-t border-border-secondary py-4 px-6">
            <div className="flex justify-center">
                <h3 className="text-lg text-white">Arrival Status: Dinner</h3>
            </div>
            <p className="text-lg text-[#F3C674] text-center py-2">

            </p>
        </div>

        <div className="border-t border-border-secondary py-4 px-6">
            <div className="flex justify-center">
                <h3 className="text-lg text-white">Arrival Status: Brunch</h3>
            </div>
            <p className="text-lg text-[#F3C674] text-center py-2">

            </p>
        </div>

        <div className="border-t border-border-secondary py-4 px-6">
            <div className="grid grid-cols-2 gap-10">

                <div className="rounded-lg border border-border-secondary">
                    <div className="flex flex-col">
                        <div className="py-4 px-6">
                            <h3 className="text-lg text-white text-center">
                                Update Brunch Arrival Status
                            </h3>
                        </div>
                        <div className="border-t border-border-secondary py-4 px-6">
                            <div className="flex justify-center">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="rounded-lg border border-border-secondary">
                    <div className="flex flex-col">
                        <div className="py-4 px-6">
                            <h3 className="text-lg text-white text-center">
                                Update Dinner Arrival Status
                            </h3>
                        </div>
                        <div className="border-t border-border-secondary py-4 px-6">
                            <div className="flex justify-center">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}