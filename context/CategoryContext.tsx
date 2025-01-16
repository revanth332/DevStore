import { createContext, useState, useEffect } from "react";
import { Resource } from "@/app/pages/home/page";
import axios from "axios";
import { usePathname } from "next/navigation";

export type CategoryContextType = {
  category: string;
  handleCategory: (category: string) => void;
  collectionName: string;
  handleCollectionName: (collection: string) => void;
  sideBarItemsType: string;
  setSideBarItemsType: (type: string) => void;
  collections: Collection[];
};

export type Collection = {
  _id: string;
  name: string;
  users: string[];
  resources: Resource[];
};

export const CategoryContext = createContext<CategoryContextType>({
  category: "",
  handleCategory: () => {},
  collectionName: "",
  handleCollectionName: () => {},
  sideBarItemsType: "",
  setSideBarItemsType: () => {},
  collections: [],
});

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState("All");
  const [collectionName, setCollectionName] = useState("All");
  const [sideBarItemsType, setSideBarItemsType] = useState("Category");
  const [collections, setCollecions] = useState<Collection[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathName = usePathname();

  const handleCategory = (category: string) => {
    if (window.innerWidth <= 768) setIsSidebarOpen(false);
    setCategory(category);
  };

  const handleCollectionName = (collection: string) => {
    setCollectionName(collection);
  };

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
          setCollecions(response.data.packs);
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
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
