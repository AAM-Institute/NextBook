import config from '@/config/config.json'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ColorModeToggler from './colormode-toggler'
import LoginBtn from './login-btn'
import SideBarToggler from './sidebar-toggler'

function NavBar() {
	const { branding, navbarItems } = config
	const router = useRouter()

	return (
		<div className='flex text-xs lg:text-sm max-h-full max-w-screen-2xl mx-auto'>
			<SideBarToggler />
			<nav className='text-left text-xs lg:text-sm pl-4 flex flex-auto space-x-1 text-gray-900 dark:text-[#FFFFFF]'>
				<div className='inline-flex max-h-full shrink max-w-xs'>
					{branding && (
						(<Link href={branding.href || '/'} aria-label={branding.title} className="">

							{branding.img && (
								<img
									src={branding.img}
									alt={branding.alt || branding.title || 'logo'}
									className='h-full hidden md:inline-block mr-4'
								/>
							)}
							{branding.initials && (
								<span
									className='border border-gray-300 rounded-sm mr-4 text-lg text-center font-bold mt-1 w-6 h-6 md:mt-0 md:w-8 md:h-8 inline-flex justify-center items-center'
									title={branding.title}
								>
									{branding.initials}
								</span>
							)}
							{branding.title && (
								<span
									className='hidden text-center md:inline-block font-semibold mr-4'
									title={branding.title}
								>
									{branding.title}
								</span>
							)}

						</Link>)
					)}
				</div>
				<div className='inline-flex max-h-full shrink mx-0 pl-0 xl:pl-5 items-center'>
					{navbarItems.map((item) => {
						// Highlight current page
						return (
							(<Link
								href={item.path}
								key={item.path}
								className={`border border-transparent hover:bg-gray-300 hover:text-gray-700 dark:hover:bg-gray-600
                dark:hover:text-gray-50 px-2 py-2 rounded-md font-medium hidden md:inline-block ${router.query.page && item.path.includes(router.query.page)
										? 'dark:bg-gray-700 dark:text-gray-50 bg-gray-300 text-gray-700'
										: 'dark:text-gray-300 text-gray-600'
									}`}>

								{item.title}

							</Link>)
						);
					}
					)}
				</div>
			</nav>
			<div className='inline-flex items-center'>
				<LoginBtn />
			</div>
			<ColorModeToggler />
		</div>
	);
}

export default NavBar
