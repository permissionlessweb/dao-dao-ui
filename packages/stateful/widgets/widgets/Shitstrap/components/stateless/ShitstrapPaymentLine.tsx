import { ShitStrapPaymentLineProps } from "@dao-dao/types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import {
    ChainProvider,
    TokenAmountDisplay,
    Tooltip,
} from '@dao-dao/stateless'
import { HugeDecimal } from "@dao-dao/math";

export const ShitstrapPaymentLine = ({
    shitstrapInfo,
    onClick,
    transparentBackground,
    EntityDisplay,
}: ShitStrapPaymentLineProps) => {

    const { t } = useTranslation()

    const { chainId, eligibleAssets, shit, full, shitstrapContractAddr, owner } = shitstrapInfo

    return (
        <ChainProvider chainId={chainId}>
            <div
                className={clsx(
                    'box-content grid h-8 cursor-pointer grid-cols-5 items-center gap-3 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed md:grid-cols-[1fr_2fr_0fr_1fr_1fr] md:gap-4 md:py-3 md:px-4',
                    !transparentBackground && 'bg-background-tertiary'
                )}
                onClick={onClick}
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
                    {eligibleAssets && eligibleAssets.length > 0 ? (
                        eligibleAssets.map((asset, index) => (
                            <div className={clsx(
                                'b h-8 cursor-pointer grid-cols-2 items-center gap-3 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
                                !transparentBackground && 'bg-background-tertiary'
                            )} key={index}>

                                <TokenAmountDisplay
                                    amount={HugeDecimal.from(asset.shit_rate)}
                                    className="body-text truncate font-mono"
                                    decimals={0}
                                    symbol={typeof asset.token === 'object'
                                        ? ('native' in asset.token ? asset.token.native : asset.token.cw20)
                                        : asset.token}
                                />
                            </div>
                        ))
                    ) : (
                        <p>{t('info.unknown')}</p>
                    )}

                </>)}
                <div className="hidden md:block">
                    {/* Show Cutoff Token */}
                    total to shit:
                    <TokenAmountDisplay
                        amount={HugeDecimal.from(shitstrapInfo.cutoff)}
                        className="body-text truncate font-mono"
                        decimals={shit.decimals}
                        symbol={shit.denomOrAddress}
                    />

                </div>
            </div>

        </ChainProvider>)
}