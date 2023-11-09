/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import { cn } from '@/lib/utils'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export function MainNav ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname()
  const params = useParams()
  const ROUTES = [
    {
      href: `/${params.storeId}`,
      label: 'Dashboard',
      active: pathName === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings`
    }
  ]
  return (
        <nav
        className={cn('flex items-center space-x-4 lg:space-x-6', className)}
        >
            {
                ROUTES.map(({ href, label, active }) => (
                    <Link
                    key={href}
                    href={href}
                    className={cn('text-sm font-medium transition-colors hover:text-primary',
                      active ? 'text-black dark:text-white' : 'text-muted-foreground'
                    )}
                    {...props}
                    >
                        {label}
                    </Link>
                ))
            }
        </nav>
  )
}
