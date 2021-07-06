import { SearchIcon } from '@heroicons/react/solid'
import urlBuilder from 'lib/imageUrl'
import Link from 'next/link'
import React, {useState} from 'react'
import { motion, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

  export default function Blogs(props) {
    const posts = props.posts
    const [siteBlogs, setBlogs] = useState(posts)
    function handleBlogSearch(e){
      const filteredBlogs= posts.filter(
          post => post.title.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
      setBlogs(filteredBlogs)
    }
    const [ref, inView] = useInView({
      threshold: 0
    });
    const stagger = {
      animate: {
        transition: {
          staggerChildren: 0.6,
        },
      },
    };
    const fadeIn = {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 1,
        },
      },
    };
    return (
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Don't miss these awesome posts with some of the best tricks and hacks you'll find on the Internet!            
            </p>
          </div>
          <div className="flex-1 flex justify-center px-2 pt-4 lg:ml-6 lg:justify-center">
                <div className="w-full lg:max-w-4xl">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-gray-100 text-gray-900 placeholder-gray-400 focus:placeholder-gray-200 focus:outline-none focus:bg-gray-800 focus:border-gray-400 focus:ring-white focus:text-gray-100 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      onChange={handleBlogSearch}

                    />
                  </div>
                </div>
          </div>
          <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} variants={stagger} className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {siteBlogs.map((post) => (
              <Link key={post.id} href={`/blogs/${post.slug}`}>
                <a>
                  <motion.div variants={fadeIn} key={post.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-shrink-0">
                      <Image width={600} height={350} className="h-48 w-full object-cover" src={urlBuilder(post.image[0].url)} alt={post.title} />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a href={post.href} className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                          <p className="mt-3 text-base text-gray-500">{post.description}</p>
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                          <span className="sr-only">{post.author.name}</span>
                          <Image width={50} height={50} className="h-10 w-10 rounded-full" src={urlBuilder(post.author.photo[0].url)} alt={post.title} />
                      </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                              {post.author.name}
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={post.published}>{post.published}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    )
  }
  