"use client"

import { useContext, useEffect, useState } from "react"
import ResourceCards from "@/components/ResourceCards";
import { usePathname } from "next/navigation";
import { Resource } from "../../home/page";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { CategoryContext } from "@/context/CategoryContext";

export default function page() {
    const pathname = usePathname();
    const [resources,setResources] = useState<Resource[]>();
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const {collectionCategoryName} = useContext(CategoryContext);

    const filteredResources = resources?.filter(item => {
      if(collectionCategoryName === "All") return true;
      else{
        if(item.category === collectionCategoryName) return true;
      }
    })
    
    useEffect(() => {
      const fetchResources = async () => {
        setIsLoading(true);
        try{
          const collectionId = pathname.substring(pathname.lastIndexOf("/")+1);
          const response = await axios.get("/api/packs/"+collectionId+'/resources');
          setResources(response.data.resourcesData[0].resources);

        }
        
        catch(err){
          console.log(err);
        }
        finally{
          setIsLoading(false);
        }
      }
      fetchResources();
    },[])

  return (
    <div className="grid grid-rows-12 row-span-11 md:col-start-3 md:col-end-13 col-span-full">
      {
        isLoading
        ?
        <div className="row-span-12 flex justify-center items-center">
          <Loader2Icon className="animate-spin text-gray-500 h-12 w-12" />
        </div>
        :
        filteredResources && filteredResources.length > 0
        ?
        <div className="row-span-12 flex flex-col gap-5">
          <ResourceCards resources={filteredResources} />
        </div>
        :
        <div className="text-3xl text-gray-600 font-semibold row-span-12 flex justify-center items-center">
          No Resources found
        </div>
      }
              
    </div>
  )
}
