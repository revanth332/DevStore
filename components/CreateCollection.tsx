"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import axios from 'axios';

export default function CreateCollection() {
    const [name, setName] = useState<string>('');

    const handleCollectionCreation = async () => {
        const user = localStorage.getItem("user")
        if(user){
            const userId = JSON.parse(user)._id;
            try{
                const response = await axios.post("../api/packs/create",{name,userId});
                console.log(response);
                setName("");
            }
            catch(err){
                console.log(err);
            }
        }
    }
  return (
    <div className='flex'>
        <Input onChange={(e) => setName(e.target.value)} className='mr-2' name="name" type="text" />
        <Button onClick={handleCollectionCreation}>Submit</Button>
    </div>
  )
}
