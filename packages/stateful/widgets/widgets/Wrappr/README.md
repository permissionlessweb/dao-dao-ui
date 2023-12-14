# Wrappr

Legal wrappers for your digital assets.

## What is it?

This widget helps dao's interact with the [Wrappr.wtf](https://docs.wrappr.wtf/get-started/what/) contracts, via ibc calls to the contracts on evmos, or another evm compatible network.

A DAO's core contract may call the [WrapprMinter](https://github.com/permissionlessweb/wrappr-launchpad) contract, which will handle the instantiation of the Wrappr. 

## workflow
### CreateWrappr 
to mint a wrappr:
- who is to pay the fee must be specified  (dao? address?)
- a PDF agreement must be uploaded to IPFS, including form data needed for WrapprPDF like name and intent into the PDF upon IPFs pin.
- call the wrappr_minter
### UpdateWrappr
to update a wrappr, a proposal must pass to:
- create a new wrappr agreement, via CreateWrappr
- burn the previous wrappr_contract, via DeleteWrappr.
### DeleteWrappr
to delete a wrappr, a proposal must pass to:
- send wrappr contract in community pool treasury to be burnt.


## Layout

| Location                   | Summary                                                 |
| -------------------------- | ------------------------------------------------------- |
| [actions](./actions)       | Actions to manage wrappr.                   |
| [components](./components) | React components used in both the actions and Renderer. |
| [Renderer](./Renderer)     | Component and state that renders the Widget.            |
| [index.ts](./index.ts)     | Widget definition.                                      |
| [state.ts](./state.ts)     | State for the press to retrieve posts.                  |
| [types.ts](./types.ts)     | Local adapter type definitions.                         |
