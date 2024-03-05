import { OfflineAminoSigner, makeSignDoc } from '@cosmjs/amino'

import {
  getChainForChainId,
  getNativeTokenForChainId,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

export type SignatureOptions<
  Data extends Record<string, unknown> | undefined = Record<string, any>
> = {
  type: string
  nonce: number
  chainId: string
  hexPublicKey: string
  data: Data
  offlineSignerAmino: OfflineAminoSigner
  /**
   * If true, don't sign the message and leave the signature field blank.
   * Defaults to false.
   */
  generateOnly?: boolean
}

export type Auth = {
  type: string
  nonce: number
  chainId: string
  chainFeeDenom: string
  chainBech32Prefix: string
  publicKey: string
}

export type SignedBody<
  Data extends Record<string, unknown> | undefined = Record<string, any>
> = {
  data: {
    auth: Auth
  } & Data
  signature: string
}

/**
 * Function to sign a message as a wallet in the format expected by our various
 * off-chain services.
 */
export const signOffChainAuth = async <
  Data extends Record<string, unknown> | undefined = Record<string, any>
>({
  type,
  nonce,
  chainId,
  hexPublicKey,
  data,
  offlineSignerAmino,
  generateOnly = false,
}: SignatureOptions<Data>): Promise<SignedBody<Data>> => {
  const chain = getChainForChainId(chainId)

  const dataWithAuth: SignedBody<Data>['data'] = {
    ...data,
    auth: {
      type,
      nonce,
      chainId,
      chainFeeDenom: getNativeTokenForChainId(chainId).denomOrAddress,
      chainBech32Prefix: chain.bech32_prefix,
      publicKey: hexPublicKey,
    },
  }

  const signer = await secp256k1PublicKeyToBech32Address(
    hexPublicKey,
    chain.bech32_prefix
  )

  // Generate data to sign.
  const signDocAmino = makeSignDoc(
    [
      {
        type: dataWithAuth.auth.type,
        value: {
          signer,
          data: JSON.stringify(dataWithAuth, undefined, 2),
        },
      },
    ],
    {
      gas: '0',
      amount: [
        {
          denom: dataWithAuth.auth.chainFeeDenom,
          amount: '0',
        },
      ],
    },
    chain.chain_id,
    '',
    0,
    0
  )

  let signature = ''
  // Sign data.
  if (!generateOnly) {
    signature = (await offlineSignerAmino.signAmino(signer, signDocAmino))
      .signature.signature
  }

  const signedBody: SignedBody<Data> = {
    data: dataWithAuth,
    signature,
  }

  return signedBody
}
