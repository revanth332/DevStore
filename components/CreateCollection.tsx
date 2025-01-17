"use client";

import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";
import { CategoryContext } from "@/context/CategoryContext";

export default function CreateCollection() {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsloading] = useState(false);
  const {handleCollections} = useContext(CategoryContext)


  const handleCollectionCreation = async () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userId = user;
    //   console.log(userId)
      setIsloading(true);
      try {
        const response = await axios.post("../api/packs/create", {
          name,
          userId,
        });
        console.log(response);
        handleCollections(response.data.newCollection)
        toast({
            title:"Collection created successfully"
        })
        setName("");
      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    } else {
      toast({
        title: "User not available",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex">
      <Input
        onChange={(e) => setName(e.target.value)}
        className="mr-2"
        name="name"
        type="text"
        value={name}
      />
      <Button onClick={handleCollectionCreation}>
        {
           isLoading ? <Loader2Icon className="animate-spin" /> : "Submit"
        }
      </Button>
    </div>
  );
}
