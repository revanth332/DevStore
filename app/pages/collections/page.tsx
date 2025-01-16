"use client"

import { useContext } from 'react'
import { CategoryContext } from '@/context/CategoryContext';
import Link from 'next/link';
import Image from 'next/image';

export default function page() {
    const {collections,handleCollectionName} = useContext(CategoryContext);
  return (
    <div className='grid grid-rows-12 row-span-11 md:col-start-3 md:col-end-13 col-span-full'>
        {
        collections.length > 0 ? 
            <div className="row-span-12 overflow-y-auto p-3">
                <div className='grid grid-cols-5 mx-auto gap-y-5'>
                    
                    {collections.map((collection) => (
                        <Link key={collection._id} onClick={() => handleCollectionName(collection.name)} href={"/pages/collections/"+collection._id} className="flex flex-col gap-2 items-center hover:bg-gray-50 cursor-pointer rounded-lg">
                            <Image width={100} height={100} alt="folder icon" src="/folder.png" className='' />
                            <h2 className="text-md text-primaryDark font-bold max-w-[150px] truncate overflow-hidden">{collection.name}</h2>
                        </Link>
                    ))}
                </div>
            </div>
        :
        <div className='row-span-12 flex items-center justify-center text-3xl text-gray-600 font-semibold'> No collections found</div>
        }
    </div>
  )
}
