import { CategoryContext } from "@/context/CategoryContext";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateCollection from "./CreateCollection";
import { PlusIcon } from "lucide-react";

export default function SaveResource({resourceId,resourceCategory,handleCollectionDialogue}:{resourceId : string,resourceCategory:string,handleCollectionDialogue:() => void}) {
  const {collections} = useContext(CategoryContext);

  const handleSavingResource = async (e : React.MouseEvent<HTMLButtonElement>) => {
      try{
        await axios.post("/api/packs/add-resource",{resourceId,resourceCategory,collectionId : e.currentTarget.id});
        toast({
          title:"Resource added successfully"
        })
      }
      catch(err){
        console.log(err);
      }
  }

  return (
    <div className="h-full rounded-lg">
        <h2 className="text-lg px-2 font-bold">Collections</h2>
        <div className="max-h-[150px] overflow-auto">
        {
          collections.map(collection => <button onClick={handleSavingResource} key={collection._id} id={collection._id} className="p-2 w-full text-left hover:bg-gray-200">{collection.name}</button>)
        }
        </div>

        <button onClick={handleCollectionDialogue} className="border flex items-center bg-gray-100 text-black rounded-full py-1 px-3 text-sm mx-auto mt-2 mb-1"> <PlusIcon className="h-5 w-5 mr-1" /> Add Collection</button>
    </div>
  )
}
