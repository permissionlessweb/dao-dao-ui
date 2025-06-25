## DAO DAO UI

## HEADSTASH TODO

## DDNAS TODO

- using dnas: improve file upload response ux
- handle custom mint msgs (snails contract) in form for new collection
- scrt-dnas: implmement new client side logic to support TEE stored private keys

<!-- - make use of existing logic to form and use form with file blobs (NextApiRequest?) -->
<!-- - never save used values to form for reuse, in order to prevent keeping api key values in local memory. -->
<!-- - check for all dnas key info registered by wallet -->
<!-- - handle successful & error upload making use of dnas api key -->
<!-- - ensure key is selected to use before displaying first file (cover image) upload form. -->
<!-- - when registering a key, if dao address in form already has key registered, display modal communicating we are updating existing key -->
<!-- - check if default profile, meaning need to first register a profile in manage section (still can use consume) -->
<!-- - check if default public key has a profile registered  (  via `useDnas()`) -->
<!-- - display modal to select keys, and upon key select, display mbutton to swap/change key use -->
<!-- -  query current dao registered keys to use for list, modal for custom dao addr input -->
<!-- -  must always be a member of the custom dao, display error if not default to expect 3 files to be uploaded (cover image, video, and metadata json) -->
<!-- - default to display DAO addr lookup for registered keys (defaults to current dao if dao proposal or entity is DAO) -->
<!-- - check if wallet has profile in dnas api, display modal to create one if not  -->
<!-- - upon select dao, query for all registered dnas keys  -->
<!-- - clear all form values on dao change -->
<!-- - refresh query and display new key reigstered in manage keys modal -->
<!-- - prompt popup to update values (api key will not be present, display current sha256 hash of saved key, along with new sha256 key) -->
<!-- - also refresh query and display new key reigstered in manage keys modal -->
<!-- - ensure first file is in form before display second file (video) upload form -->
<!-- - ensure second file is in form  before display third file (metadata) upload form. -->
<!-- - display list where button to edit metadata and update value is -->
<!-- - default to modal to register key -->
<!-- - base64 key prior to upload -->
<!-- - initial implementation  -->
<!-- - create hook that communicates with custom api, rendering information regarding specific headstash instance -->
<!-- - create stateless component displaying headstash information  -->
<!-- - craete form to sign & broadcast claim for account -->
<!-- - scrt-dnas: implement iframe logic passing into uploaded filed metadata -->
<!-- ```ts
/// snails custom iframe for social app
window.addEventListener('message', (event) => {
  // Verify the origin for security
  if (event.origin !== 'https://your-dao-dao-ui-domain.com') return;

  if (event.data.type === 'SDA_FILE_UPLOAD') {
    const { cid, metadata } = event.data.data;
    console.log('Received file upload:', { cid, metadata });
    // Process the data (e.g., store in parent app state or database)
  }
});
``` -->

# goals

1. upload dnas key thorugh ui
2. display upload keys in ui
3. update dnas keys in ui

## INFUSIONS TODO

- create: select infusion bundle type and its parameters
- indexer formulae

<!-- - infusion action: include approval msg for each nft in bundle that does not have infusion minter approved. -->

## SHITSTRAP TODO

- indexer formulae
- check if entity has ibc version of expected token if none exist on shitstraps chain
- ibc deposit modal (check if balance of token on another chain,find best route)
- improved conversion ratio view
- filters:
  - by chain
  - by shitstrap recipient
- validate minimum shit rates and cutoffs with each other
- shitstrap-lines: complete fund shitstrap if does not have shit balance
  - create proposal if dao or otherwise immediately fund from connected wallet otherwise
  - Display if funded or not

---

---

---

---

---

This project creates a web UI for the [DAO DAO smart
contracts](https://github.com/DA0-DA0/dao-contracts), enabling users to:

- create a governance token-based DAO, membership-based DAO (multisig), or other
  type of DAO.
- create and vote on proposals.
- view the treasury and manage it democratically.

All without having to code!

You can find more info in our [documentation](https://docs.daodao.zone). Join
the [DAO DAO Discord](https://discord.daodao.zone) if you're interested in
becoming a contributor.

## Development

### Clone this repo and install dependencies

```bash
git clone https://github.com/DA0-DA0/dao-dao-ui
cd dao-dao-ui
yarn
```

### Setup environment variables

To run the server on mainnet, copy `.env.mainnet` to `.env.local` in the app
folder you care about (likely `apps/dapp`).

Copy `.env.testnet` instead if you want to run testnet.

### Run dev server

If you're here to work on any other part of the app, likely accessing live chain
data, run the `yarn dev` script (equivalent to running `yarn dev` from the
[`./apps/dapp`](./apps/dapp) package) to run the main app in development mode.

```bash
yarn dev
```

### Storybook

If you're here to work on UI components in isolation, you will likely want to
run the [Storybook](https://storybook.js.org/) server to mock up components and
iterate quickly without having to access live chain data. Check out the
[storybook package README](./packages/storybook) for usage
instructions.

To start the Storybook server, run this command from the root of this monorepo:

```bash
yarn storybook start
```

If something is misconfigured, check out the docs for
[Turborepo](https://turborepo.org/docs), the monorepo build system we use.

## Packages

#### `/apps`

| App                   | Summary                                                          |
| --------------------- | ---------------------------------------------------------------- |
| [`dapp`](./apps/dapp) | DAO DAO UI hosted at [https://daodao.zone](https://daodao.zone). |

#### `/packages`

| Package                             | Summary                                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`config`](./packages/config)       | Configurations for various dev tools.                                                                 |
| [`dispatch`](./packages/dispatch)   | DAO DAO Dispatch.                                                                                     |
| [`email`](./packages/email)         | Email template and generator tools.                                                                   |
| [`i18n`](./packages/i18n)           | Internationalization/translation system.                                                              |
| [`math`](./packages/math)           | Math utilities.                                                                                       |
| [`state`](./packages/state)         | State retrieval and management for the DAO DAO UI.                                                    |
| [`stateful`](./packages/stateful)   | Stateful components, hooks, and systems that access and manipulate live data.                         |
| [`stateless`](./packages/stateless) | React components, React hooks, and other stateless rendering utilities which do not access live data. |
| [`storybook`](./packages/storybook) | [Storybook](https://storybook.js.org/) server configuration and story decorators.                     |
| [`types`](./packages/types)         | Types used across packages.                                                                           |
| [`utils`](./packages/utils)         | Utility functions used across packages.                                                               |

### Building Docker Images

To create a dockerized image, simply run the following commands:

#### For DAPP

```sh
DAPP_IMAGE=discoverdefiteam/shitstrap-dao-dapp:v0.1.1 SDA_IMAGE=discoverdefiteam/shitstrap-dao-sda:v0.1.1 docker-compose build dapp --build-arg BUILDPLATFORM=linux/arm64 --build-arg TARGETPLATFORM=linux/amd64
```

#### For SDA

```sh
docker-compose build sda --build-arg BUILDPLATFORM=linux/arm64 --build-arg TARGETPLATFORM=linux/amd64
```

**Note:** Set the `DAPP_IMAGE` and `SDA_IMAGE` environment variables to your desired image names, e.g.:

```bash
# DAPP_IMAGE=da0-da0/dao-app-dapp:v0.0.2
# SDA_IMAGE=da0-da0/dao-app-sda:v0.0.2
DAPP_IMAGE=discoverdefiteam/shitstrap-dao-dapp:v0.1.1 SDA_IMAGE=discoverdefiteam/shitstrap-dao-sda:v0.1.1
```

These commands will build the images for the specified platforms. Just replace `linux/arm64` and `linux/amd64` with your machine's platform and the intended platform for the image, respectively.

**Important:** Please note that building images for cross-platform architectures can take a significant amount of time, as the build process needs to compile and package the image for the target platform. Be patient and let the build process complete. You can grab a cup of coffee or take a short break while you wait!

### Verifiable Build

```sh
--label "git.branch=$(git rev-parse --abbrev-ref HEAD)" .
docker inspect --format='{{.Config.Labels}}' $SDA_IMAGE # $DAPP_IMAGE
branch=$(docker inspect --format='{{.Config.Labels.git.branch}}'  $SDA_IMAGE) # $DAPP_IMAGE
git checkout $branch
git commit -m "Built image with digest $digest"
```

## Contributing

Interested in contributing to DAO DAO? Check out
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Disclaimer

DAO DAO TOOLING IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF
ANY KIND. No developer or entity involved in creating the DAO DAO UI or smart
contracts will be liable for any claims or damages whatsoever associated with
your use, inability to use, or your interaction with other users of DAO DAO
tooling, including any direct, indirect, incidental, special, exemplary,
punitive or consequential damages, or loss of profits, cryptocurrencies, tokens,
or anything else of value.
