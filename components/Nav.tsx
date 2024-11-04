'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const items = [
    {
      id: 1,
      href: '/',
      label: 'Home',
      icon: (
        <Image
          src='./home.svg'
          className='dark:invert'
          alt='Home Icon'
          width={15}
          height={15}
        />
      ),
    },
    {
      id: 2,
      href: '/about',
      label: 'About',
      icon: (
        <Image
          src='./about.svg'
          className='dark:invert'
          alt='Home Icon'
          width={15}
          height={15}
        />
      ),
    },
  ]

  const path = usePathname()
  return (
    <nav>
      <ul className='p-2'>
        {items.map(({ id, href, label, icon }) => (
          <li key={id}>
            <Link
              className={`m-1 flex items-center space-x-2 rounded-xl px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${path === href ? 'bg-slate-50 dark:bg-slate-900' : ''}`}
              href={href}
            >
              {icon}
              <span className='min-w-20 text-sm'>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
