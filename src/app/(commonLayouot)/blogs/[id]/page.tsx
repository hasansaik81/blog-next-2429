






// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { blogService } from "@/services/blog.service";
// import { BlogPost } from "@/types/blog.types";




// export async function generateStaticParams() {
//   const { data } = await blogService.getBlogPosts();

//   return data?.data?.map((blog: BlogPost) => ({ id: blog.id })).splice(0, 3);
// }

// export default async function BlogPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const { data: blog } = await blogService.getBlogById(id);

//   const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Estimate reading time (average 200 words per minute)
//   const wordCount = blog.content.split(/\s+/).length;
//   const readingTime = Math.max(1, Math.ceil(wordCount / 200));

//   return (
//     <article className="container mx-auto px-4 py-12 max-w-2xl">
//       {/* Header */}
//       <header className="mb-8">
//         <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
//           {blog.title}
//         </h1>

//         <div className="flex items-center gap-3 text-muted-foreground text-sm">
//           <span>{formattedDate}</span>
//           <span>·</span>
//           <span>{readingTime} min read</span>
//           <span>·</span>
//           <span>{blog.views} views</span>
//         </div>
//       </header>

//       <Separator className="mb-8" />

//       {/* Content */}
//       <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-foreground">
//         <p className="whitespace-pre-wrap text-lg leading-8">{blog.content}</p>
//       </div>

//       <Separator className="my-8" />

//       {/* Footer */}
//       <footer className="space-y-6">
//         {blog.tags && blog.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2">
//             {blog.tags.map((tag: string) => (
//               <Badge
//                 key={tag}
//                 variant="secondary"
//                 className="px-3 py-1 text-sm font-normal rounded-full"
//               >
//                 {tag}
//               </Badge>
//             ))}
//           </div>
//         )}

//         <div className="flex items-center justify-between text-sm text-muted-foreground">
//           <span>{blog._count?.comments ?? 0} comments</span>
//           {blog.isFeatured && (
//             <Badge variant="outline" className="rounded-full">
//               Featured
//             </Badge>
//           )}
//         </div>
//       </footer>
//     </article>
//   );
// }







import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types/blog.types";

// [ { id: "asdfasdfasd" }, { id: "asdfasdadsfa" }, ... ]
export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();

  return (
    data?.data
      ?.slice(0, 3)
      .map((blog: BlogPost) => ({
        id: blog.id,
      })) ?? []
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: blog, error } = await blogService.getBlogById(id);

  console.log("BLOG ID:", id);
  console.log("BLOG DATA:", blog);
  console.log("BLOG ERROR:", error);

  // Blog not found / API error
  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Blog not found</h1>

        <p className="mt-2 text-muted-foreground">
          The blog post could not be loaded.
        </p>
      </div>
    );
  }

  // Blog content
  const content = blog.content ?? "";

  // Support both possible field names
  const dateValue = blog.createAt ?? blog.createdAt;

  // Format date
  const formattedDate = dateValue
    ? new Date(dateValue).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Calculate reading time
  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="container mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{formattedDate}</span>

          <span>·</span>

          <span>{readingTime} min read</span>

          <span>·</span>

          <span>{blog.views ?? 0} views</span>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-foreground">
        <p className="text-lg leading-8 whitespace-pre-wrap">
          {content}
        </p>
      </div>

      <Separator className="my-8" />

      {/* Footer */}
      <footer className="space-y-6">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full px-3 py-1 text-sm font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Comments & Featured */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{blog._count?.comments ?? 0} comments</span>

          {blog.isFeatured && (
            <Badge variant="outline" className="rounded-full">
              Featured
            </Badge>
          )}
        </div>
      </footer>
    </article>
  );
}


