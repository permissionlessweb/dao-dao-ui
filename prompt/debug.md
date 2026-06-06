# Adding AveSupport

## Goals
- finishing ui/ux support for guest and event ushers once a specific event is selected `@dao-dao/stateful/modules/AvEvents`

## Requirements
- displaying general information about the event
- displaying information about available tickets to purchase for specific event
    - if connected address has purchased ticket, display info about checkin status
        - display button to promt checkin workflwo via qur code display & scan
- implement button to purchase ticket(s), if possible
- if connected entity is an admin for specific event, display modal to checkin guest 

## Logic implementation
types for cw ave: `@dao-dao/types/cw-ave`, `@dao-dao/types/contracts/cwAve && cwAveFactory`
queries for cw ave: `@dao-dao/state/query/queries/contracts/CwAve`, `@dao-dao/state/query/queries/contracts/CwAveFactory`
client for cw ave:  `@dao-dao/state/query/state/contractsCwAve`, `@dao-dao/state/query/state/contractsCwAveFactory`

## Existing components i want to reuse but specifically for cw-ave
- displaying ticket options (event guest) component: custom implementation of `DaoCard`
    - logic location of `DaoCard` to build new component `TicketCard`:  `@dao-dao/stateful/components/dao/DaoCard, @dao-dao/stateless/components/dao/DaoCard,  @dao-dao/types/components/DaoCard`
    - buttons to purchase 


## Components that are new and need to be finished updating 
- QR Code scanner:`@dao-dao/stateful/modules/AvEvents/components/stateful/QRCodeScanner`
    implement workflow for checking in guest:
        - 1. guest scans event usher QR code, contains:`usherAddress, eventContractAddress` (guest needs camera, usher needs to encode data)
        - 2. guest generates offline signature of: `usherAddress,eventContractAddress,eventSegmentId being checked in`
        - 3. usher scanns guest qr code, contains: `guestTicketAddress, eventSegmentId being checked in, signature generated of `
        - 4. usher broadcasts msg to event contract to checkin guest:
- queries: 
     

## Event Guest card
 - highlight selected event segments for event guest
 - fix flex to keep descripotion of segment in button 
- set event segments selected into form properly (doesnt display on parent compnoent form when it should)
- prevent guest type weight collision automatically
- defualt to 1 token payment


 ## CreateEvent Component
 - default names for new stage descriptions
 - enforce required values*We dance through the crystal winds toward moonlit meadows*
 - correct token denomination 
 - 

 ## ManageEvent Component
 - add/remove event admin action
 - update ticket prices 

 ## Event Module Display
 - event timeline display: bar graph displaying all segments of events.
   - semi-transparent for presale start/ colorless when timelist is in past, dotted vertical line to track current time
- purchase ticket options:
   - display how many tickets are left to be purchased
   - transform formdata into wallet action to pay for ticket
      - handle display successful ticket:
         - email ticket to guest (set evcent curator address in )
   
 - replace use of modal with dedicated page for an event instance
    - include button to go back and browse all events for dao


## Infusion
- url link to infusion minter + infusion id
- review & broadcast infusion: 
   - display preview of infused nft (? if random, nft image if sequential)
   
- successful infusion: 
   - reload infused collection gallery on successful infusion
   - display infused nft on successful infusion

- anyone create infusion via dao widget modal
- hide infuse button on no eligible nfts found 
- display button in eligble nft component to browse nfts to purcase or to navigate to ibc.fun. swap for fee substitute
    - get balance from all chains, prep largest balance with. path to fee sub on dest chain as. route to. display in url 
- a popup modal component for displaying info to purchase/create bids on nfts
   - query lowest offers of nfts, form bids by % increment from floor, broadcast tx workflow ux
- display fee substitute & static fee destinations
- add infusion genetics burn values on creation 
- bubble map server for event ushers & checkin guests

## Final check
- ensure creation modal sets accurate numbers for coin values 
- ensure selecting/deselecting nfts works
- ensure setting pay substitute from eligible card works
- ensure. infusing modal setes accurate numbers for coin. values.  
- 

## EventTimelineCard
- form does not set values in parent component accurate

prediction of problem: not swetting form with prefix correctly


## GustDetailCard

- form collected in parent component is not updated accurately when setting values in this component
    - event_timeline values
    - does not retrieve event_timeline propery to make use if using specificSegmentAccessTypeVisible 

prediction of problem: not swetting form with prefix correctly

Debugging values:
- clicking eligibleEventSegments customizer: 
    - event segments in form are undefined 
    - data from props passed into component looks like expected defaults, but not any of the cusdtom values we are setting

## CreateEventComponent 
- adding another guest type value to form button does not work correctly
prediction of problem: 
    - related to form 

    debugging values:
    - title gets passed correcty to form 

## UsherDetailCards
- does not display component on first load
prediction of problem: default value is not collected in form for component and is empty


## Infusion Cleanup
-  allof infusion fee subsitute hotkey: set form correctly when eligible collection is using fee replacement:
    - stack on existing or append to coins in form
    - remove this nft from any bundle in action
- always keep generic fee if infusion requires
- always print debug logic in bundles to help comment on & off
- maintain current components symmetry
- selecting nfts & forming bundles: ensure when selecting they are included in the form that respects the bounds of the collection paramters for a bundle.
    - the current logic attempts at this but during refactor it broke and needs reintegration

- ensure we wire in display of bundles and fee substitution in the dropdown 
- if we are still running into errors , i suspect it has something to do with th. fieldprefix format of the forms