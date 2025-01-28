/**
 * Plausible events.
 */
export type PlausibleEvents = {
  /**
   * Wallet login event.
   */
  login: {
    wallet: string
  }
  /**
   * DAO create event.
   */
  daoCreate: {
    chainId: string
    dao: string
    daoType: string
    walletAddress: string
  }
  /**
   * DAO proposal create event.
   */
  daoProposalCreate: {
    chainId: string
    dao: string
    walletAddress: string
    proposalModule: string
    proposalModuleType: string
    proposalNumber: number
    proposalId: string
    approval: boolean
  }
  /**
   * DAO proposal vote event.
   */
  daoProposalVote: {
    chainId: string
    dao: string
    walletAddress: string
    proposalModule: string
    proposalModuleType: string
    proposalNumber: number
  }
  /**
   * DAO proposal execute event.
   */
  daoProposalExecute: {
    chainId: string
    dao: string
    walletAddress: string
    proposalModule: string
    proposalModuleType: string
    proposalNumber: number
  }
  /**
   * DAO proposal close event.
   */
  daoProposalClose: {
    chainId: string
    dao: string
    walletAddress: string
    proposalModule: string
    proposalModuleType: string
    proposalNumber: number
  }
  /**
   * Stake event.
   */
  daoVotingStake: {
    chainId: string
    dao: string
    walletAddress: string
    votingModule: string
    votingModuleType: string
  }
  /**
   * Unstake event.
   */
  daoVotingUnstake: {
    chainId: string
    dao: string
    walletAddress: string
    votingModule: string
    votingModuleType: string
  }
  /**
   * Claim event.
   */
  daoVotingClaim: {
    chainId: string
    dao: string
    walletAddress: string
    votingModule: string
    votingModuleType: string
  }
}
