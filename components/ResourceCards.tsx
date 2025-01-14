import { Resource } from "@/app/pages/home/page"
import ResourceCard from "./ResourceCard"

export default function ResourceCards({resources}:{resources : Resource[] | undefined}) {

  return (
    <div className="h-full overflow-y-auto p-3">
        <div className='grid md:grid-cols-5 grid-cols-3 max-w-5xl mx-auto gap-y-5'>
            {
                resources?.map((resource,index) => <ResourceCard key={index} resource={resource} />)
            }
        </div>
    </div>

  )
}