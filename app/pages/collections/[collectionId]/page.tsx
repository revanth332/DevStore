"use client"

import { useContext } from "react"
import { CategoryContext } from "../../layout"
import ResourceCards from "@/components/ResourceCards";
import { usePathname } from "next/navigation";

export default function page() {
    const {collections} = useContext(CategoryContext);
    const pathname = usePathname();
    const collectionId = pathname.substring(pathname.lastIndexOf("/")+1);
    
    const collection = collections.find(collection => collection._id === collectionId)

  return (
    <div className="grid grid-rows-12 row-span-11 col-start-3 col-end-13">
              <div className="row-span-12 flex flex-col gap-5 ">
                <ResourceCards resources={collection?.resources} />
              </div>
    </div>
  )
}
