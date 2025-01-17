"use client";

import Image from "next/image";
import { Link2Icon, HeartIcon, BookMarkedIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Resource } from "@/app/pages/home/page";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import SaveResource from "./SaveResource";
import { CategoryContext } from "@/context/CategoryContext";
  

export default function ResourceCard({ resource }: { resource: Resource }) {
  const [isLiked, setIsLiked] = useState<Boolean>(false);
  const [likedCount,setLikedCount] = useState<number>(resource.likedBy.length)
  const [openCollectionsDialogue,setOpenCollectionDialogue] = useState<boolean>(false);
  const {handleOpenCreateCollectionDialogue} = useContext(CategoryContext)

  const handleCollectionDialogue = () => {
    handleOpenCreateCollectionDialogue();
    setOpenCollectionDialogue(prev => !prev);
  }

  const handleLike = async () => {
    const userId = localStorage.getItem("user");
    if(!isLiked){
      try {
        const response = await axios.post("/api/resources/like/"+resource._id,{userId : userId});
        setIsLiked(true);
        setLikedCount(response.data.likes)
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if(userId){
      setIsLiked(resource.likedBy.includes(userId));
    }
  },[])

  return (
    <div className="flex flex-col">
      <Dialog open={openCollectionsDialogue} onOpenChange={setOpenCollectionDialogue}>
        <DialogTrigger asChild>
          <Image
            className="mx-auto w-1/2"
            width={100}
            height={100}
            alt="resource_image"
            src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${resource.url}&size=128`}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Resource</DialogTitle>
          <DialogDescription className="flex gap-5">
            <Image
              className="mx-auto"
              width={100}
              height={100}
              alt="resource_image"
              src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${resource.url}&size=128`}
            />
            <div className="w-1/2 flex flex-col gap-2 flex-1">
              <h3 className="font-bold">{resource.name}</h3>
              <p className="text-sm">{resource.description}</p>
              <p className="flex gap-2">
                <a
                  className="px-2 py-1 bg-blue-100 text-blue-500  w-[70px] rounded-full flex justify-center items-center"
                  href={resource.url}
                >
                  <Link2Icon className="inline mr-1 w-5 h-5" />{" "}
                  Visit{" "}
                </a>{" "}
                <button
                  onClick={handleLike}
                  className="bg-red-100 text-red-500 w-[65px] px-2 py-1 flex justify-start items-center rounded-full"
                >
                  {
                    isLiked ? <HeartIcon className="fill-red-500 h-4 w-4 mr-1" /> : <HeartIcon className="h-4 w-4 mr-1" />
                  }
                  {likedCount}
                </button>
                <Popover>
                    <PopoverTrigger>
                        <button
                        className="bg-gray-100 text-gray-500 w-[70px] px-2 py-1 flex justify-start items-center rounded-full"
                        > 
                            <BookMarkedIcon className="h-5 w-5 mr-1" />
                            Save
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="py-1 px-0 w-[150px] bg-white border">
                        <SaveResource handleCollectionDialogue={handleCollectionDialogue} resourceCategory={resource.category} resourceId={resource._id} />
                    </PopoverContent>
                </Popover>
              </p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <div>
        <h3 className="font-bold text-center mt-2">
          {resource.name}{" "}
          <a className="hidden md:inline" href={resource.url}>
            <Link2Icon className="inline ml-2 text-blue-600" />
          </a>{" "}
        </h3>
      </div>
    </div>
  );
}
