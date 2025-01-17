import { createContext, useState, useEffect } from "react";
import { Resource } from "@/app/pages/home/page";
import axios from "axios";
import { usePathname } from "next/navigation";

export type CategoryContextType = {
  category: string;
  handleCategory: (category: string) => void;
  collectionName: string;
  handleCollectionName: (newCollectionName: string) => void;
  sideBarItemsType: string;
  setSideBarItemsType: (type: string) => void;
  collections: Collection[];
  handleCollections : (newCollection : Collection) => void;
  collectionCategoryName : string;
  handlCollectioncategoryName : (newCollectionCategoryName : string) => void;
  openCreateCollectionDialogue : boolean;
  handleOpenCreateCollectionDialogue : () => void;
};

export type Collection = {
  _id: string;
  name: string;
  users: string[];
  resources: Resource[];
  categories : string[];
};

export const CategoryContext = createContext<CategoryContextType>({
  category: "",
  handleCategory: () => {},
  collectionName: "",
  handleCollectionName: () => {},
  sideBarItemsType: "",
  setSideBarItemsType: () => {},
  collections: [],
  handleCollections : () => {},
  collectionCategoryName : "",
  handlCollectioncategoryName : () => {},
  openCreateCollectionDialogue : false,
  handleOpenCreateCollectionDialogue : () => {}
});

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState<string>("All");
  const [collectionName, setCollectionName] = useState<string>("All");
  const [sideBarItemsType, setSideBarItemsType] = useState<string>("Category");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [collectionCategoryName,setCollectionCategoryName] = useState<string>("All");
  const [openCreateCollectionDialogue,setOpenCreateCollectionDialogue] = useState<boolean>(false);
  const pathName = usePathname();

  const handleCategory = (category: string) => {
    if (window.innerWidth <= 768) setIsSidebarOpen(false);
    setCategory(category);
  };

  const handleCollectionName = (collection: string) => {
    setCollectionName(collection);
  };

  const handleCollections = (collection : Collection) => {
    setCollections(prevCollections => [...prevCollections, collection]);
  }

  const handlCollectioncategoryName = (newCollectionCategoryName : string) => {
    setCollectionCategoryName(newCollectionCategoryName)
  }

  const handleOpenCreateCollectionDialogue = () => {
    setOpenCreateCollectionDialogue(prev => !prev)
  }

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!pathName.includes("home")) {
      setSideBarItemsType("Collections");
    }
    if (user) {
      const fetchCollections = async () => {
        const userId = user;
        try {
          const response = await axios.get(`/api/user/${userId}/packs`);
          setCollections(response.data.packs);
        } catch (err) {
          console.log(err);
        }
      };
      fetchCollections();
    }
  }, [sideBarItemsType]);

  return (
    <CategoryContext.Provider
      value={{
        category,
        handleCategory,
        collectionName,
        handleCollectionName,
        sideBarItemsType,
        setSideBarItemsType,
        collections,
        handleCollections,
        handlCollectioncategoryName,
        collectionCategoryName,
        openCreateCollectionDialogue,
        handleOpenCreateCollectionDialogue
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
