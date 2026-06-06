# Av Events

This is the event ticketing module for the [cw-ave
contract](https://github.com/permissionlessweb/cw-ave).

## Layout

| Location                   | Summary                                                 |
| -------------------------- | ------------------------------------------------------- |
| [actions](./actions)       | Actions to manage vesting payments.                     |
| [components](./components) | React components used in both the actions and Renderer. |
| [Renderer](./Renderer)     | Component and state that renders the module.            |
| [index.ts](./index.ts)     | Module definition.                                      |
| [types.ts](./types.ts)     | Local module type definitions.                          |


## Actions 

### Event Creation 

### Ticket Purchase

### Ticket Consumption

## Features
- censorship resistant event ticket instances & distribution
- ephemeral tickets: single time use private keys. associated with authentication forms setup during ticket purchase 
    - tamperproof ticket claiming
    - multi-ticket support
    - key rotation
-  adimin checkin: 
-  manage admins & ticket checkin status
- event messaging & forums:
