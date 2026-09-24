// import { env } from "@/env";

// const API_URL = env.API_URL;

// //* No Dynamic and No { cache: no-store } : SSG -> Static Page
// //* { cache: no-store } : SSR -> Dynamic Page
// //* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

// interface ServiceOptions {
//   cache?: RequestCache;
//   revalidate?: number;
// }

// interface GetBlogsParams {
//   isFeatured?: boolean;
//   search?: string;
// }

// export const blogService = {
//   getBlogPosts: async function (
//     params?: GetBlogsParams,
//     options?: ServiceOptions
//   ) {
//     try {
//       const url = new URL(`${API_URL}/posts`);

//       if (params) {
//         Object.entries(params).forEach(([key, value]) => {
//           if (value !== undefined && value !== null && value !== "") {
//             url.searchParams.append(key, value);
//           }
//         });
//       }

//       const config: RequestInit = {};

//       if (options?.cache) {
//         config.cache = options.cache;
//       }

//       if (options?.revalidate) {
//         config.next = { revalidate: options.revalidate };
//       }

//       const res = await fetch(url.toString(), config);

//       const data = await res.json();

//       // This is an example
//       //   if(data.success) {
//       //     return
//       //   }

//       return { data: data, error: null };
//     } catch (err) {
//       return { data: null, error: { message: "Something Went Wrong" } };
//     }
//   },
// };





import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
}

export interface BlogData{
  title:string;
  content:string;
  tag?:string[];
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions
  ) {
    try {
      // -----------------------------------
      // 1. Create API URL
      // -----------------------------------
      const url = new URL(`${API_URL}/api/posts`);

      // -----------------------------------
      // 2. Add query parameters
      // -----------------------------------
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            value !== ""
          ) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      // -----------------------------------
      // 3. Fetch configuration
      // -----------------------------------
      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate !== undefined) {
        config.next = {
          revalidate: options.revalidate,
        };
      }

      // -----------------------------------
      // 4. DEBUG
      // -----------------------------------
      console.log("=================================");
      console.log("API URL:", API_URL);
      console.log("REQUEST URL:", url.toString());
      console.log("PARAMS:", params);
      console.log("CONFIG:", config);
      console.log("=================================");

      // -----------------------------------
      // 5. API Request
      // -----------------------------------
      const res = await fetch(url.toString(), config);

      // -----------------------------------
      // 6. Response JSON
      // -----------------------------------
      const data = await res.json();

      // -----------------------------------
      // 7. Check HTTP status
      // -----------------------------------
      if (!res.ok) {
        console.error("API ERROR:", {
          status: res.status,
          statusText: res.statusText,
          data,
        });

        return {
          data: null,
          error: {
            message:
              data?.message ||
              `Request failed with status ${res.status}`,
          },
        };
      }

      // -----------------------------------
      // 8. Success
      // -----------------------------------
      console.log("API SUCCESS:", data);

      return {
        data,
        error: null,
      };
    } catch (err) {
      // -----------------------------------
      // 9. Catch unexpected errors
      // -----------------------------------
      console.error("BLOG SERVICE ERROR:", err);

      return {
        data: null,
        error: {
          message: "Something Went Wrong",
        },
      };
    }
  },


    
//   getBlogById:async function(id:string){
//   try{
//     const res = await fetch(`${API_URL}/api/posts${id}`);
//     const data=await res.json();
//     return {data:data,error:null};
//   }catch(err){
//     return {data:null,error:{message:"something went wrong"}};

//   }
// },

   getBlogById: async function (id: string) {
  try {
    const res = await fetch(`${API_URL}/api/posts/${id}`, {
      cache: "no-store",
    });

    const data = await res.json();

    console.log("GET BLOG BY ID:", data);

    if (!res.ok) {
      return {
        data: null,
        error: data,
      };
    }

    return {
      data: data.data ?? data,
      error: null,
    };
  } catch (err) {
    console.error("GET BLOG BY ID ERROR:", err);

    return {
      data: null,
      error: {
        message: "Something went wrong",
      },
    };
  }
},


createBlogPost:async (blogData:BlogData)=>{
  try{
    const cookieStore=await cookies();
    const res=await fetch(`${API_URL}/api/posts`,{
      method:"POST",
      headers:{
        "Content-Type":"aplication/json",
        Cookie:cookieStore.toString(),
      },
      body:JSON.stringify(blogData),
    });
    const data=await res.json();
    if(data.error){
      return{
        data:null,
        error:{message:"Error:Post not created"},
      };
    }
    return {data:data,error:null};

  }catch(err){
    return{data:null,error:{message:"Something went wrong"}}

  }
},


};




