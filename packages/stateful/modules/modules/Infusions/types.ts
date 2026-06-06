export type InfusionModuleData = {
  // chain infusion is on
  chainId: string
  // form field name
  fieldNamePrefix: string
  // Smart contract address of the infusion collection.
  infusionMinter: string
  infusionId: string
  // the index of the infusion being viewed (each infusionId may have multiple infusion instances)
  // selectedInfusionIndex: string
  // // infusion
  // mint: {
  //   contract: string
  //   // JSON-encoded message to send to the contract. {{wallet}} is replaced with
  //   // the user's wallet address.
  //   msg: string
  //   buttonLabel: string
  // }
}
