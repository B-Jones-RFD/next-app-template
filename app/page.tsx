import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Image
        className='dark:invert'
        src='/vercel.svg'
        alt='Vercel logomark'
        width={20}
        height={20}
      />
    </div>
  )
}
