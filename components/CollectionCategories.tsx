import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { CategoryContext, Collection } from "@/context/CategoryContext"
import {useRouter} from "next/navigation"
import { useContext } from "react";


export default function CollectionCategories({collection}:{collection : Collection}) {
    const {handleCollectionName,collectionName,collectionCategoryName,handlCollectioncategoryName} = useContext(CategoryContext);
    const router = useRouter();

    const handleCollectionClick = () => {
        handleCollectionName(collection.name);
        router.push("/pages/collections/"+collection._id)
    }

    const handleCategoryClick = (category : string) => {
        if(collection.name !== collectionName){
            handleCollectionName(collection.name);
            router.push("/pages/collections/"+collection._id)
        }
        handlCollectioncategoryName(category);

    }

  return (
    <div>
        {
            collection.categories.length <= 0
            ?
            <button onClick={() => handleCollectionClick()} className={`p-2 rounded-lg text-left w-full ${collectionName === collection.name && 'bg-gray-300'}`}>{collection.name}</button>
            :
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger onClick={() => handleCollectionClick()} className={`p-2 rounded-lg ${collectionName === collection.name && 'bg-gray-300'}`}>
                        {collection.name}
                    </AccordionTrigger>
                    <AccordionContent>
                        {
                            collection.categories.map((item,index) => (
                                <div key={index} onClick={() => handleCategoryClick(item)} className="rounded-md pl-5 mt-2 text-sm">
                                    <div className={` p-2 rounded-lg ${collectionName+collectionCategoryName === (collection.name+item) && 'bg-gray-200'}`}>{item}</div>
                                </div>
                            ))
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        }
    </div>
  )
}
  