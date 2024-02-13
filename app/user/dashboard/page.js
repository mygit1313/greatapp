"use client"

import { useState, useEffect } from 'react'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import Modal from '@/components/modal';
import { getUserDashboard } from "@/redux/action/frontend/dashboard";
import { useDispatch } from 'react-redux'
import Loader from '@/components/layouts/Loader'
export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const dispatch = useDispatch();
  const [quickLinks, setQuickLinks] = useState([{ title: '', redirectionLink: '' }]);
  const [videos, setVideos] = useState([{ link: '' }]);
  const [blogPosts, setBlogPosts] = useState([{ title: '', link: '' }]);
  const [quickLinksOnOff, setQuickLinksOnOff] = useState(false);
  const [videoOnOff, setVideoOnOff] = useState(false);
  const [blogPostOnOff, setBlogPostOnOff] = useState(false);
  const [sideButton, setSideButton] = useState({
    text: '',
    link: ''
  })
  const [querySection, setQuerySection] = useState({
    title: '',
    email: ''
  })
  const [sectionTitle, setSectionTitle] = useState({
    quick_link: '',
    videos: '',
    blog: ''
  });
  const [apiHit, setApiHit] = useState(false);
  useEffect(() => {
    dispatch(getUserDashboard()).then(res => {
      if (res.success && res.result.length > 0) {
        var getFormData = JSON.parse(res.result[0].form_data);
        if (getFormData.length > 0) {
          setQuickLinks(getFormData[0].quickLinks);
          setVideos(getFormData[0].videos);
          setBlogPosts(getFormData[0].blogPosts);
          setQuickLinksOnOff(!getFormData[0].quickLinksOnOff ? false : getFormData[0].quickLinksOnOff);
          setVideoOnOff(!getFormData[0].videoOnOff ? false : getFormData[0].videoOnOff);
          setBlogPostOnOff(!getFormData[0].blogPostOnOff ? false : getFormData[0].blogPostOnOff);
          setSideButton(!getFormData[0].sideButton ? {
            text: '',
            link: ''
          } : getFormData[0].sideButton);
          setQuerySection(!getFormData[0].querySection ? {
            title: '',
            email: ''
          } : getFormData[0].querySection)
          setSectionTitle(!getFormData[0].sectionTitle ? {
            quick_link:'',
            videos:'',
            blog:''
        } : getFormData[0].sectionTitle)
        }
        setApiHit(true);
      }
    })
  }, [])
  return (
    <main className="container mx-auto gap-3 px-5 md:px-20 md:pt-12 mt-5">
      {apiHit ? <>
        <Modal setOpen={setOpen} open={open} videoLink={videoLink}/>
        {quickLinksOnOff &&
          <div className="shadow-2xl">
            <div className='bg-black flex items-center p-5 mt-5'>
              <h2 className="text-[#f9bc60] text-lg font-medium">{sectionTitle.quick_link}</h2>
            </div>
            <div className='bg-white flex flex-col lg:flex-row p-5 justify-between'>
              <ul className="space-y-4 text-left text-black dark:text-gray-400 text-base">
                {quickLinks.map((quick, index) => (
                  <li className="flex items-center space-x-3 hover:text-blue-700" key={index}>
                    <CheckBadgeIcon className='h-8 w-8' />
                    <Link href={!quick.redirectionLink ? '#' : quick.redirectionLink}>
                      <span>{quick.title}</span>
                    </Link>
                  </li>
                ))}

              </ul>
              <ul className="space-y-4 text-left text-black dark:text-gray-400 justify-end">
                <li className="flex items-center space-x-3">
                  <Link href={sideButton.link} className="nc-Button relative h-auto inline-flex items-center justify-center rounded-lg text-lg px-4 py-3 sm:px-6 mt-5 lg:mt-0 ttnc-ButtonPrimary text-black bg-[rgb(249,188,96)]">
                    <h3 className="text-base font-medium"> {sideButton.text}</h3>
                  </Link>
                </li>

              </ul>
            </div>
          </div>}
        {videoOnOff &&
          <div className="shadow-2xl mt-5">
            <div className='bg-black flex items-center p-5'>
              <h2 className="text-[#f9bc60] text-lg font-medium">{sectionTitle.videos}</h2>
            </div>
            <div className='bg-white flex items-center p-5 justify-between'>
              <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-auto'>
                {videos.map((video, index) => (
                  <div className="w-full flex items-center justify-center rounded-md cursor-pointer" key={index}>
                    <Image src={`https://i.ytimg.com/vi/${((video.link).split("/"))[(video.link).split("/").length - 1]}/sddefault.jpg`} width={304} height={228} alt={'video'} onClick={() => {setOpen(true);setVideoLink(video.link)}} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        {blogPostOnOff &&
          <div className="shadow-2xl mt-5">
            <div className='bg-black flex items-center p-5'>
              <h2 className="text-[#f9bc60] text-lg font-medium">{sectionTitle.blog}</h2>
            </div>
            <div className='bg-white flex flex-col lg:flex-row p-5 justify-between'>
              <ul className="space-y-4 text-left text-black dark:text-gray-400 list-disc">
                {blogPosts.map((blog, index) => (
                  <li className="flex items-center space-x-3 text-black hover:text-blue-700 text-base" key={index}>
                    <Link href={blog.link}>
                      <span>{index + 1}. {blog.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center space-x-4">
                <div className="px-6 py-4 sm:py-1 mt-5 border border-[#f9bc60] border-dashed h-fit">
                  <div className="font-bold text-base mb-2 flex justify-center">{querySection.title}</div>
                  <div className="text-base mb-2 "><Link href={"mailto:"+querySection.email} >{querySection.email}</Link></div>
                </div>
              </div>
            </div>
          </div>
        }
      </> : <Loader />}
    </main>
  )
}
