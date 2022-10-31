import Link from 'next/link';

export default function ButtonLink({ url = '', label = 'Open Link', target = '_blank', buttonFace = 'A', internal = false }) {
  return (
    internal ? (
      <Link href={url} >
        <a className='inline-flex items-center'>
          <span className='text-black bg-white rounded-full font-semibold w-6 inline-block text-center mr-3'>{buttonFace}</span> <span>{label}</span>
        </a>
      </Link>
    ) : (
      <a href={url} target={target} className='inline-flex items-center'>
        <span className='text-black bg-white rounded-full font-semibold w-6 inline-block text-center mr-3'>{buttonFace}</span> <span>{label}</span>
      </a>
    )
  )
}
