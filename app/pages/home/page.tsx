"use client"

import ResourceCards from "@/components/ResourceCards";
import SearchBox from "@/components/SearchBox";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "@/context/CategoryContext";
import { Loader2Icon } from "lucide-react";

export type Resource = {
    name: string,
    url: string,
    description: string,
    _id :string,
    category : string,
    likes : number,
    likedBy : string[]
}

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const {category} = useContext(CategoryContext);
  const [resourceSearchValue,setResourceSearchValue] = useState<string>("");
  const [isLoading,setIsLoading] = useState<Boolean>(false);

  const filteredResources = resources.filter((resource) => resource.name.toLowerCase().includes(resourceSearchValue.toLowerCase()));

  useEffect(() => {
      const fetchResources = async () => {
        setIsLoading(true);
        try{
          const response = await axios.get("../api/resources/"+ (category === "All" ? "" : category));
          console.log(response);
          setIsLoading(false);
          setResources(response.data.resources)
        }
        catch(err){
          console.error(err);
        }
      }
      fetchResources();
    },[category])

  return (
    <section className="grid grid-rows-12 row-span-11 md:col-start-3 md:col-end-13 col-span-12 ">
      <div className="row-span-12 flex flex-col gap-5 ">
        <div className="">
          <h1 className="text-3xl mt-5 font-extrabold text-center text-primaryDark">
              Discover & Share 
            <br className="md:hidden" />
            <span className="text-primaryLight ml-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
            >
              Developer Resources
            </span>
          </h1>
          <p className="text-center m2-3 px-2 text-gray-400">DevTresure is a platform where you can discover and share developer resources.</p>
        </div>
        <SearchBox resourceSearchValue={resourceSearchValue} setResourceSearchValue={setResourceSearchValue} />
        {
          isLoading ? <div className="h-full flex justify-center items-center">
          <Loader2Icon className="animate-spin text-gray-500 h-12 w-12" />
        </div> : <ResourceCards resources={filteredResources} />
        }
      </div>

    </section>
  );
}