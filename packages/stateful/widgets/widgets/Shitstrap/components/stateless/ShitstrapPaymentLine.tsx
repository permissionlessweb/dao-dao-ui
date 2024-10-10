import { ShitStrapPaymentLineProps, TypedOption } from "@dao-dao/types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import {
    ChainProvider,
    Dropdown,
    FilterableItemPopup,
    TokenAmountDisplay,
    Tooltip,
} from '@dao-dao/stateless'
import { HugeDecimal } from "@dao-dao/math";
import { ArrowDropDown } from "@mui/icons-material";
import { PossibleShit } from "@dao-dao/types/contracts/ShitStrap";

export const ShitstrapPaymentLine = ({
    shitstrapInfo,
    onClick,
    transparentBackground,
    EntityDisplay,
}: ShitStrapPaymentLineProps) => {

    const { t } = useTranslation()

    const { chainId, eligibleAssets, shit, full, shitstrapContractAddr, owner } = shitstrapInfo

    
    const eligibleAssetsOptions: TypedOption<PossibleShit>[] = eligibleAssets.map((asset) => {
        const tokenString = typeof asset.token === 'object'
            ? ('native' in asset.token ? asset.token.native : asset.token.cw20)
            : asset.token;

        const displayToken = tokenString.startsWith(`factory/osmo1`)
            ? !tokenString.substring(51).startsWith('/')
                ? tokenString.substring(71)
                : tokenString.substring(52)
            : tokenString;

        return {
            label: `${displayToken}: ${HugeDecimal.from(asset.shit_rate).toInternationalizedHumanReadableString({ decimals: 6, minDecimals: 2 })}`,
            value: asset,
        };
    });



    const options = eligibleAssets.map((asset, index) => ({
        value: asset,
        label: (
            <div className={clsx(
                'b h-8 cursor-pointer grid-cols-2 items-center gap-2 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
                !transparentBackground && 'bg-background-tertiary'
            )}>
                <TokenAmountDisplay
                    amount={HugeDecimal.from(asset.shit_rate)}
                    className="body-text truncate font-mono"
                    decimals={6}
                    symbol={typeof asset.token === 'object'
                        ? ('native' in asset.token ? asset.token.native.substring(0, 15) : asset.token.cw20.substring(0, 15))
                        : asset.token.substring(0, 9)}
                />
            </div>
        ),
    }));

    const handleSelect = (option: typeof eligibleAssets[0], index: number) => {
        // Handle the selection of an option
        console.log(option, index);
    };

    return (
        <ChainProvider chainId={chainId}>
            <div
                className={clsx(
                    'box-content grid h-8 cursor-pointer grid-cols-5 items-center gap-1 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed md:gap-2 md:py-3 md:px-8',
                    !transparentBackground && 'bg-background-tertiary'
                )}
                onClick={(event) => {
                    if (event.target !== document.querySelector('.dropdown-container')) {
                        onClick();
                    }
                }}
            >
                {/* display owner of shitstrao */}
                Shitstrap Owner:
                <EntityDisplay address={owner} noUnderline />

                {/* display shistrap state */}
                {full ? (
                    <div className="hidden md:block">
                        <Tooltip title={"Full of shit!"}>
                            <p className="inline-block"></p>
                        </Tooltip>
                    </div>
                ) : (<>
                    {/* display map of eligible assets & their shit_rates */}
                    {/* todo: click to see map of all possible tokens */}
                    Eligible tokens
                    <div onClick={(event) => event.stopPropagation()}>
                        <Dropdown
                            options={eligibleAssetsOptions}
                            placeholder={t('info.selectEligibleAsset', {
                                number: eligibleAssets.length,
                            })}
                            onSelect={handleSelect}
                            containerClassName="your-container-class-name"
                            labelContainerClassName="your-label-container-class-name"
                            labelClassName="your-label-class-name"
                            iconClassName="your-icon-class-name"
                        />
                    </div>
                </>)}
                <div className="hidden md:block">
                    {/* Show Cutoff Token */}
                    total to shit:
                    <TokenAmountDisplay
                        amount={HugeDecimal.from(shitstrapInfo.cutoff).times(HugeDecimal.from(10).pow(-6))}
                        className="body-text truncate font-mono"
                        decimals={shit.decimals}
                        symbol={shit.denomOrAddress.startsWith(`factory/osmo1`)
                            ? !shit.denomOrAddress.substring(51).startsWith('/')
                                ? shit.denomOrAddress.substring(71)
                                : shit.denomOrAddress.substring(52)
                            : shit.denomOrAddress}
                    />

                </div>
            </div>

        </ChainProvider>)
}