import { useRouter } from 'next/router'

export default function Banner(props) {
    const router = useRouter()
    const slug = router.query.slug
    const previewMode = props.previewMode
  return (
    <div className="relative bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
          {previewMode === "live" ?
            <>
                <span className="md:hidden">To check the draft mode click here</span>
                <span className="hidden md:inline">To check the draft mode click here</span>
                <span className="block sm:ml-2 sm:inline-block">

                    <a href={`/api/preview?secret=GwpRUnwb7otnm2InuPeWGYiUNn0TJ8PK&slug=${slug}`} className="text-white font-bold underline">
                        {' '}
                        Preview <span aria-hidden="true">&rarr;</span>
                    </a>
                </span>
            </>
                :
                <>
                <span className="md:hidden">To exit preview mode click here</span>
                <span className="hidden md:inline">To exit preview mode click here</span>
                <span className="block sm:ml-2 sm:inline-block">

                    <a href="/api/exit-preview" className="text-white font-bold underline">
                        {' '}
                        Exit Preview <span aria-hidden="true">&rarr;</span>
                    </a>
                </span>
            </>
                
                }
          </p>
        </div>
      </div>
    </div>
  )
}
