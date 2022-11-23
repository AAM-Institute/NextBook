// TODO: Re-render on route change
import { useEffect, useState } from 'react';
import router from 'next/router';
import Scrollspy from 'components/scrollspy'
import Text from './text'
import { Link } from './svg-icons';

function InPageTocElement(props) {
  // Indent headings based on their level
  const level = props.levels[props.slug] >= 1 ? props.levels[props.slug] : 1
  const style = { paddingLeft: `${level/2}em` }
  return (
    <li style={style} className={props.className} onClick={props.onClick}>
      {props.children}
    </li>
  )
}

function InPageToc({ tocRaw }) {
  const [tocIds, setTocIds] = useState([])
  const [levels, setLevels] = useState({})

  useEffect(() => {
    let tmpIds = []
    let tmpLevels = {}
    tocRaw.forEach((row) => {
      // populate dictionary of heading slugs
      tmpIds.push(row.slug)
      // populate dictionary of headings and their levels
      tmpLevels[row.slug] = row.lvl
    })
    setTocIds(tmpIds)
    setLevels(tmpLevels)
  }, [tocRaw])

  // Update current "copy link" button when the user scrolls
  const [url, setUrl] = useState('')

  useEffect(()=>{
    setUrl(router.asPath)

    const onHashChangeStart = (url) => {
        setUrl(url)
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
        router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, []);


  if (tocIds.length) {
    return (
      <div className='px-4 max-w-xs'>
        <a
          className='m-4 text-sm text-gray-400 hover:text-gray-500 dark:text-gray-400  dark:hover:text-gray-300 text-center block'
          href={url}
        >
          <Link />
          <Text tid='Permalink' className="px-4" />
        </a>

        <div className='py-2 text-gray-400 dark:text-gray-300 uppercase text-sm font-bold'>
          <Text tid='Page Contents' />
        </div>
        <Scrollspy
          ids={tocIds}
          itemElement={<InPageTocElement levels={levels} />}
          itemContainerClassName='tracking-wide mt-4 text-gray-600 dark:text-gray-400 text-sm 2xl:text-base border-0 border-l border-gray-200 dark:border-gray-600 leading-6 cursor-pointer'
          itemClassName="text-gray-500 truncate py-1 hover:text-gray-700 dark:hover:text-gray-300"
          activeItemClassName='active text-gray-700 dark:text-gray-200 border-l-2 border-gray-900 dark:border-gray-200'
          includeParentClasses={false}
        />
        
      </div>
    )
  } else {
    return null
  }
}

export default InPageToc
