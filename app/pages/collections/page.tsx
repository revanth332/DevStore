"use client"

import { useContext } from 'react'
import { CategoryContext } from '../layout'
import { FolderClosedIcon } from 'lucide-react';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ResourceCard from '@/components/ResourceCard';
import Link from 'next/link';

export default function page() {
    const {collections} = useContext(CategoryContext);
  return (
    <div className='border grid grid-rows-12 row-span-11 col-start-3 col-end-13 '>
        {/* <div className="row-span-12 flex flex-col gap-5 ">
            {collections.map((collection, index) => (
                <div key={index} className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">{collection.name}</h2>
                </div>
            ))}

        </div> */}
            <div className="row-span-12 overflow-y-auto p-3">
                <div className='grid grid-cols-5 mx-auto gap-y-5'>
                    {collections.map((collection, index) => (
                        <Link href={"/pages/collections/"+collection._id} className="flex flex-col gap-2 items-center hover:bg-gray-200 cursor-pointer rounded-lg">
                            <FolderClosedIcon className='h-24 w-24'/>
                            <h2 className="text-2xl font-bold">{collection.name}</h2>
                        </Link>
                    ))}
                </div>
        </div>
    </div>
  )
}
