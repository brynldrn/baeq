import classNames from 'classnames';
import { forwardRef } from 'react'

const PageComponent = ({ children, className }, ref) => {

  return (
    <div ref={ref} className={classNames('page w-full text-3xl', className)}>
      <div className="content">
        {children}
      </div>
    </div>
  )
}

const Page = forwardRef(PageComponent)

export default Page;