"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleGoogleLogin = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/dashboard`,
      });
      console.log("Google Login Response:", res);
      if (res?.error) {
        console.error("Google Login Backend Error:", res.error);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const session = authClient.useSession();

  console.log("Current session:", session);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button
                  onClick={(e) => handleGoogleLogin(e)}
                  variant="outline"
                  type="button"
                >
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register" className="underline underline-offset-4">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}





// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const handleGoogleLogin = async () => {
//     try {
//       await authClient.signIn.social({
//         provider: "google",
//         callbackURL: "http://localhost:3000",
//       });
//     } catch (error) {
//       console.error("Google Login Error:", error);
//     }
//   };

//   const session = authClient.useSession();

//   console.log("Current session:", session);

//   return (
//     <div
//       className={cn("flex flex-col gap-6", className)}
//       {...props}
//     >
//       <Card>
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>

//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={(e) => e.preventDefault()}>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="email">
//                   Email
//                 </FieldLabel>

//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </Field>

//               <Field>
//                 <div className="flex items-center">
//                   <FieldLabel htmlFor="password">
//                     Password
//                   </FieldLabel>

//                   <Link
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </Link>
//                 </div>

//                 <Input
//                   id="password"
//                   type="password"
//                   required
//                 />
//               </Field>

//               <Field>
//                 <Button type="submit">
//                   Login
//                 </Button>

//                 <Button
//                   onClick={handleGoogleLogin}
//                   variant="outline"
//                   type="button"
//                 >
//                   Login with Google
//                 </Button>

//                 <FieldDescription className="text-center">
//                   Don&apos;t have an account?{" "}
//                   <Link
//                     href="/register"
//                     className="underline underline-offset-4"
//                   >
//                     Sign up
//                   </Link>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
