import { Input } from "./ui/input"

export default function SearchBox({resourceSearchValue,setResourceSearchValue}:{resourceSearchValue : string,setResourceSearchValue : (value : string) => void}) {
    return (
    <div className="">
        <div className="max-w-md sm:mx-auto mx-2 flex gap-2 ">
            <Input onChange={(e) => setResourceSearchValue(e.target.value)} value={resourceSearchValue} type="text" />
            {/* <Button onClick={() => handleResourceFiltering()}>Search</Button> */}
        </div>
    </div>
  )
}
