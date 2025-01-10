"use client"

import { Resource } from '@/app/pages/home/page';
import { CategoryContext } from '@/app/pages/layout';
import axios from 'axios';
import { PanelLeftClose,Search } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { usePathname } from "next/navigation";


export const categoryValues = ["Icons", "Pictures", "Animation","AI Models","Website Generators","Image Generators","Video Generators"] as const;

export default function Sidebar() {
    const context = useContext(CategoryContext);
    const {category, handleCategory,sideBarItemsType,handleCollectionName,collectionName,collections} = context;
    const pathName = usePathname();

  return (
    <div className='col-span-2 row-span-12 bg-slate-50 pt-5 px-3 text-gray-700 grid grid-rows-12'>
        <div className='flex justify-between row-span-1'>
            <PanelLeftClose />
            <Search />
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
                    <button onClick={() => handleCollectionName("All")} className={`p-2 rounded-lg text-left ${collectionName === "All" && 'bg-gray-300'}`}>All</button>
                    {
                        collections.map((item,index) => {
                            return (
                                <button key={index} onClick={() => handleCollectionName(item.name)} className={`p-2 rounded-lg text-left ${collectionName === item.name && 'bg-gray-300'}`}>{item.name}</button>
                            )
                        })
                    }
                </>
            }

                {/* <button onClick={() => handleCategory("Icons")} className={`p-2 rounded-lg text-left ${category === "Pictures" && 'bg-gray-300'}`}>Pictures</button>
                <button onClick={() => handleCategory("Icons")} className={`p-2 rounded-lg text-left ${category === "AI" && 'bg-gray-300'}`}>AI</button>
                <button onClick={() => handleCategory("Icons")} className={`p-2 rounded-lg text-left ${category === "Animation" && 'bg-gray-300'}`}>Animation</button> */}
            </div>
        </div>
    </div>
  )
}
