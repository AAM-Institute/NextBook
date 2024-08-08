import SideBarContext from '@/components/store/sidebar-context'
import config from '@/config/config.json'
import Link from 'next/link'
import { useContext, useEffect, useRef } from 'react'
import { useClickAway, useMedia } from 'react-use'
import SideBarSection from './sidebar-section'

function SideBar() {
	const { branding, toc, projectTitle } = config
	const sideBarCtx = useContext(SideBarContext)
	const isWide = useMedia('(min-width: 770px)', false)
	const ref = useRef(null)

	useEffect(() => {
		if (isWide) {
			sideBarCtx.hideSideBar()
		}
	}, [isWide, sideBarCtx])

	useClickAway(ref, () => {
		if (!isWide) {
			sideBarCtx.hideSideBar()
		}
	})

	const sideBarStyle = sideBarCtx.sideBar
		? 'sidebar w-2/3 z-50 h-full overflow-y-auto bg-[#ffffff] dark:bg-gray-800 border-t border-r border-gray-300 dark:border-gray-800 fixed pl-4 pr-2 pb-12 text-lg top-10 md:hidden'
		: 'sidebar z-50 shrink h-full fixed top-10 md:top-14 hidden md:block pl-4 pr-4 pb-12 border-r dark:border-gray-600 w-72 overflow-y-auto bg-[#ffffff] dark:bg-gray-800'

	return (
		<aside className={sideBarStyle} ref={ref}>
			<div className='w-full'>
				<div className='flex flex-col py-2 md:py-4'>
					{branding?.sidebarTitle && (
						(<Link href='/' aria-label={branding.sidebarTitle} className="py-8">

							<div className='flex flex-col items-center'>
								{process.env.NEXT_PUBLIC_USE_LOGO && (
									<img
										src={`/${process.env.NEXT_PUBLIC_USE_LOGO}`}
										alt={branding.sidebarTitle}
										className='w-24 hidden md:inline-block'
									/>
								)}
								<span
									className='hidden px-4 text-center md:inline-block font-semibold'
									title={branding.sidebarTitle}
								>
									{branding.sidebarTitle}
								</span>
							</div>

						</Link>)
					)}

					<div className='leading-loose tracking-wide'>
						{toc.map((toc, id) => (
							<SideBarSection toc={toc} key={id} />
						))}
					</div>
				</div>
			</div>
		</aside>
	);
}

export default SideBar
