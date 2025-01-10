import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export default function SaveResource() {
  return (
    <div className="h-full rounded-lg">
        <h2 className="text-lg px-2 font-bold">Collections</h2>
        <div className="p-2 hover:bg-gray-200 cursor-pointer">My Pack</div>
        <div className="p-2 hover:bg-gray-200">My Pack</div>
        <div className="p-2 hover:bg-gray-200">My Pack</div>
        <div className="p-2 hover:bg-gray-200">My Pack</div>
    </div>
  )
}
