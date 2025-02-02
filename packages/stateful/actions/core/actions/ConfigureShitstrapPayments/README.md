# ConfigureShitstrapPayments

Enable or configure shitstrap payments.

## Bulk import format

This is relevant when bulk importing actions, as described in [this
guide](https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions).

### Key

`configureShitstrapPayments`

### Data format

```json
{
  "factories": Map<"<CHAIN ID>", "<SHITSTRAP FACTORY ADDRESS>">
}
```

The shitstsrap payment factories must be instantiated before using this action.
Maps chain ID to shitstrap payment factory address.
