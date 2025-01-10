"use client"

import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import { useState,createContext, useEffect } from "react";
import { Resource } from "./home/page";
import axios from "axios";
import { usePathname } from "next/navigation";

type CategoryContextType = {
    category: string;
    handleCategory : (category : string) => void;
    collectionName : string;
    handleCollectionName : (collection : string) => void;
    sideBarItemsType : string;
    setSideBarItemsType : (type :string) => void;
    collections : Collection[]
}

export type Collection = {
    _id:string;
    name: string;
    users : string[];
    resources : Resource[]
}

export const CategoryContext = createContext<CategoryContextType>({category : "",handleCategory : () => {},collectionName : "",handleCollectionName : () => {},sideBarItemsType : "",setSideBarItemsType : () => {},collections:[]});

export default function PageLayout({children} : {children : React.ReactNode}) {
    const [category,setCategory] = useState("All");
    const [collectionName,setCollectionName] = useState("All");
    const [sideBarItemsType,setSideBarItemsType] = useState("Category");
    const [collections, setCollecions] = useState<Collection[]>([]);
    const pathName = usePathname();

    const handleCategory = (category : string) => {
        setCategory(category);
    }
    const handleCollectionName = (collection : string) => {
        setCollectionName(collection);
    }

    useEffect(() => {

        // const fetchCollections = 
        const user = localStorage.getItem("user");
        if(!pathName.includes("home")){
            setSideBarItemsType("Collections")
        }
        if(user){
            const fetchCollections = async () => {
                const userId = JSON.parse(user)._id;
                try{
                    const response = await axios.get("/api/packs/"+userId);
                    setCollecions(response.data.packs);
                }
                catch(err){
                    console.log(err);
                }
            }
            fetchCollections();
        }
        console.log(sideBarItemsType)
    },[sideBarItemsType])

  return (
    <div className="h-full grid grid-cols-12 grid-rows-12">
        <CategoryContext.Provider value={{category,handleCategory,collectionName,handleCollectionName,sideBarItemsType,setSideBarItemsType,collections}}>
            <Nav />
            <Sidebar />
            {children}
        </CategoryContext.Provider>
    </div>
  )
}
