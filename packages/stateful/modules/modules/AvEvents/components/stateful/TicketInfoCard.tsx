import { useRecoilValue } from 'recoil'

import { mountedInBrowserAtom } from '@dao-dao/state/recoil'

import { Coin, DaoSource, GenericToken, GenericTokenBalance } from '@dao-dao/types'
import {
  AvEventPurchaseTicketsActionData,
  FollowEventState,
  StatefulGuestCardProps,
} from '@dao-dao/types/components/TicketInfoCard'
import { useDaoClient, useFollowingDaos, useMembership } from '../../../../../hooks'
import { TicketInfoCard as StatelessEventGuestTypeCard } from '../stateless/TicketInfoCard'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
// import { HomiesTicketModal } from './HomiesTicketModal'





export const TicketInfoCard = (props: StatefulGuestCardProps) => {
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)

  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()

  const [showHomiesTicketModal, setShowHomiesTicketModal] = useState(false)

  // create forms
  const {
    register,
    watch,
    setValue,
    getValues,
  } = useFormContext<AvEventPurchaseTicketsActionData>()

  const watchTicketsToPurchase = watch('tickets_to_purchase')
  useEffect(() => {
    console.log("watchTicketsToPurchase", watchTicketsToPurchase)
  }, [setValue]);


  // const { dao } = useDaoClient({
  //   dao: props.info,
  // })
  // const { isMember } = useMembership({
  //   dao: props.info,
  // })
  // const lazyData = useLoadingPromise({
  //   promise: () => dao.getDaoCardLazyData(),
  //   // Refresh if DAO changes.
  //   deps: [dao],
  // })

  // const followedDao: DaoSource = {
  //   chainId: props.info.chainId,
  //   coreAddress: props.info.coreAddress,
  // }
  // const follow: FollowEventState = {
  //   following: isFollowing(followedDao),
  //   updatingFollowing,
  //   onFollow: () =>
  //     isFollowing(followedDao)
  //       ? setUnfollowing(followedDao)
  //       : setFollowing(followedDao),
  // }

  const follow: FollowEventState = {
    following: false,
    updatingFollowing,
    onFollow: () =>
    // isFollowing(followedDao)
    //   ? setUnfollowing(followedDao)
    //   : setFollowing(followedDao),
    { }
  }

  return (
    <>
      <StatelessEventGuestTypeCard
        {...props}
        // register={register}
        // watch={watch}
        // setValue={setValue}
        // getValues={getValues}
        // LinkWrapper={LinkWrapper}
        // onSettingHomiesTicket={() => setShowHomiesTicketModal(true)}
        follow={follow}
        // isMember={isMember}
        // lazyData={lazyData}
        showParentDao={
          /*
           * H`ide the parent DAO until the app is mounted in the browser since
           * rendering it on the server causes a hydration error for some horrible
           * reason. I think it has something to do with the fact that you're not
           * supposed to nest an A tag inside of another A tag, and maybe the
           * Next.js server is sanitizing it or something. Anyways, rip.
           */
          mountedInBrowser} />

 
    </>


  )
}
