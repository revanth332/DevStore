"use client"

import { CategoryContext } from '@/context/CategoryContext';
import { PanelLeftClose,Search } from 'lucide-react';
import { useContext, useState } from 'react';
import { usePathname,useRouter } from "next/navigation";
import CollectionCategories from './CollectionCategories';

export const categoryValues = ["Icons", "Pictures", "Animation","AI Models","Website Generators","Image Generators","Video Generators"] as const;

export default function Sidebar({isSidebarOpen,handleSidebarOpen}:{isSidebarOpen : Boolean,handleSidebarOpen : () => void}) {
    const context = useContext(CategoryContext);
    const {category, handleCategory,handleCollectionName,collectionName,collections} = context;
    const pathName = usePathname();
    const router = useRouter();

  return (
    <div className={`md:col-span-2 row-span-12 bg-slate-50  pt-5 px-3 text-gray-700 absolute md:static z-50 w-[250px] md:w-full h-full md:grid grid-rows-12 transition-all duration-300 ${!isSidebarOpen ? '-translate-x-full' : ''}`}>
        <div className='flex mb-5 md:mb-0 justify-between row-span-1 md:hidden'>
            <PanelLeftClose  onClick={() => handleSidebarOpen()} />
            {/* <Search /> */}
        </div>
        <div className='row-span-11'>
            <h3 className='font-semibold mb-3'>{pathName.includes("home") ? "Categories" : "Collections" }</h3>
            <div className='flex flex-col gap-1 text-sm'>
            {
                pathName.includes("home")
                ?
                <>
                    <button onClick={() => handleCategory("All")} className={`p-2 rounded-lg text-left ${category === "All" && 'bg-gray-300'}`}>All</button>
                    {
                        categoryValues.map((item,index) => {
                            return (
                                <button key={index} onClick={() => handleCategory(item)} className={`p-2 rounded-lg text-left ${category === item && 'bg-gray-300'}`}>{item}</button>
                            )
                        })
                    }
                </>
                :
                <>
                    <button onClick={() => {
                        handleCollectionName("All");
                        router.push("/pages/collections")
                    }} className={`p-2 rounded-lg text-left ${collectionName === "All" && 'bg-gray-300'}`}>All</button>
                    {
                        collections.map((item,index) => {
                            return (
                                <CollectionCategories key={index} collection={item} />
                            )
                        })
                    }
                </>
            }
            </div>
        </div>
    </div>
  )
}
