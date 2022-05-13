import { PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export const EmptyContractCard = ({
  title,
  description,
  backgroundUrl,
  href,
}: {
  title: string
  description: string
  backgroundUrl: string
  href: string
}) => {
  return (
    <Link href={href} passHref>
      <a className="overflow-hidden max-w-[400px] rounded-md border border-inactive hover:border-brand transition md:w-max">
        <div
          className={'h-72 bg-no-repeat bg-cover opacity-75'}
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
        <div className="py-4 px-6">
          <div className="flex gap-2 items-center mb-2 primary-text">
            <PlusIcon className="w-4" />
            {title}
          </div>
          <div className="body-text">{description}</div>
        </div>
      </a>
    </Link>
  )
}
