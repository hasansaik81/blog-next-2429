// import BlogCard from "@/components/modules/homepage/BlogCard";

import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types/blog.types";

// import { blogService } from "@/services/blog.service";
// import { BlogPost } from "@/types/blog.types";
// // import { BlogPost } from "@/types";

// export default async function Home() {
//   const { data } = await blogService.getBlogPosts(
//     {
//       isFeatured: false,
//     },
//     {
//       cache: "no-store",
//     }
//   );

//   console.log(data);

//   return (
//     <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
//       {data?.data?.map((post: BlogPost) => (
//         <BlogCard key={post.id} post={post} />
//       ))}
//     </div>
//   );
// }





export default async function Home() {
  const { data, error } = await blogService.getBlogPosts(
    undefined,
    {
      cache: "no-store",
    }
  );

  console.log("HOME DATA:", data);
  console.log("HOME ERROR:", error);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}