import { MemberResponse } from "./contracts/Cw4Group"
import { ArrayOfGenericTokenGuestDetails, ArrayOfGuestDetails, Config, EventSegments } from "./contracts/CwAve"

export type AvEventInstance = {
    loading: boolean
    eventChainId: string,
    eventContract: string,
    config: Config,
    eventTimeline: EventSegments[],
    usherWeight: MemberResponse
    guestWeight?: MemberResponse
    eventGuestDetails: ArrayOfGenericTokenGuestDetails,
    completed: boolean,
}

/// data scanned by guest, used to generate offline signature 
export type GuestScannedData = {
    eventContractAddr: string;
    usherWalletAddr: string;
    eventSegmentId: string;
};

export type GuestVerificationData = {
    guestWeight: number;
    isCheckedIn: boolean;
};

export type CheckInSignatureData = {
    eventContractAddr: string;
    usherWalletAddr: string;
    eventSegmentId: number;
};

export type GuestSignatureData = {
    signature: string;
    publicKeyJson: string;
    guestWalletAddress: string;
    eventContractAddr: string
    eventSegmentId: string
};

// Usher Mode Data
export type UsherQrData = {
    eventContractAddr: string;
    usherWalletAddr: string;
    eventSegmentId: string;
};

export type UsherScannedData = {
    signature: string;
    publicKeyJson: string;
    guestWalletAddress: string;
    eventContractAddr: string
    eventSegmentId: string;
};

export type EventTicket = {
    signature: string;
    publicKeyJson: string;
    guestWalletAddress: string;
    eventContractAddr: string
    eventSegmentId: string;
};


export enum CwAveContractVersion {
    V1 = 1,
}
export const LATEST_CW_AVE_CONTRACT_VERSION = CwAveContractVersion.V1
export type AvEventModuleData = {
    /**
     * A map of chain ID to current contract on that chain. This replaces the
     * single `avEvent` and allows for multiple chains.
     */
    deployers?: Record<
        string,
        {
            address: string
            version: CwAveContractVersion
        }
    >
    /**
     * Versioning was created after the widget was created, so it may be
     * undefined. If undefined, assume it supports none of the versioned features.
     * This is part of the old single factory, before the factories map which
     * allows for multiple chains.
     */
    version?: 1
    // optional default factory on home chain as dao or connected wallet to fallback to
    deployer?: string
}

export type CheckInGuestData = {
    /// data specific to usher guest is checking in with
    usherData: UsherQrCodeData
    /// data specific to guest checking in
    guestData: GuestQrCodeData
}

export type UsherQrCodeData = {
    eventId: number
    nonce: number
    /// sha256 hash of an ushers bech32 addr 
    addrHash: string
}

export type GuestQrCodeData = {
    /// public key guest is using to check in 
    publicKey: string
    // signature generated
    signature: string
}

export enum AvEventsMode {
    Browse = 'browse',
    Create = 'create',
    Usher = 'usher',
    Guest = 'guest',
}