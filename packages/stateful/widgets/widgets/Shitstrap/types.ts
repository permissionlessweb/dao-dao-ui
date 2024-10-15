export type ShitstrapPaymentWidgetData = {
  /**
   * A map of chain ID to current contract on that chain. This replaces the
   * single `shitstrap` and allows for multiple chains.
   */
  factories: Record<
    string,
    {
      address: string
      version: 1
    }
  >
  /**
   * Versioning was created after the widget was created, so it may be
   * undefined. If undefined, assume it supports none of the versioned features.
   * This is part of the old single factory, before the factories map which
   * allows for multiple chains.
   */
  version?: 1
  // description: string
  // // Mint NFT button.
  // performShitStrap: {
  //   contract: string
  //   // JSON-encoded message to send to the contract. {{wallet}} is replaced with
  //   // the user's wallet address.
  //   msg: string
  //   buttonLabel: string
  // }
  // optional default factory on home chain as dao or connected wallet to fallback to
  factory?: string
}
