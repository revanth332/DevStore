import { CategoryContext } from "@/context/CategoryContext";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useContext } from "react"

export default function SaveResource({resourceId}:{resourceId : string}) {
  const {collections} = useContext(CategoryContext);

  const handleSavingResource = async (e : React.MouseEvent<HTMLButtonElement>) => {
      try{
        await axios.post("/api/packs/add-resource",{resourceId,collectionId : e.currentTarget.id});
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
        {
          collections.map(collection => <button onClick={handleSavingResource} id={collection._id} className="p-2 w-full text-left hover:bg-gray-200">{collection.name}</button>)
        }
    </div>
  )
}
