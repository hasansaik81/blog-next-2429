import { getBlogs } from "@/actions/blog.actions";
import { useEffect, useState } from "react";

export default function AboutPage(){
  const [data,setData]=useState();
  const [error,setError]=useState<{message:string}|null>(null);

}

useEffect(()=>{
  (async()=>{
    const {data,error}=await getBlogs()
  })
})