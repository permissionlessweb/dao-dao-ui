
export type HeadstashInstance = {}
export type BloomFunction = {}
export type ClaimHeadstashFunction = {}

export type ClaimHeadstashStatus = 'idle' | 'headstash' | 'claiming'
export type BloomActionStatus = 'idle' | 'bloom' | 'blooming'


export type UseHeadstashOptions = {
    /**
     * chain id headstash is for
     */
    chainId?: string
}

export type UseHeadstashReturn = {
    connected: boolean
    connecting: boolean
    headstash: HeadstashInstance
    claimHeadstash: {
        ready: boolean
        claiming: ClaimHeadstashStatus
        go: ClaimHeadstashFunction
    }
    bloomAction: {
        ready: boolean
        blooming: BloomActionStatus
        go: BloomFunction
    }

}
