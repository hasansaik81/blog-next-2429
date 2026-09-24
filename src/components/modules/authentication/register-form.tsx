// "use client";

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

// export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
//   const handleGoogleLogin = async (e?: React.MouseEvent) => {
//     if (e) e.preventDefault();
//     try {
//       const res = await authClient.signIn.social({
//         provider: "google",
//         callbackURL: `${window.location.origin}/dashboard`,
//       });
//       console.log("Google Login Response:", res);
//       if (res?.error) {
//         console.error("Google Login Backend Error:", res.error);
//       }
//     } catch (error) {
//       console.error("Google Login Error:", error);
//     }
//   };
//   return (
//     <Card {...props}>
//       <CardHeader>
//         <CardTitle>Create an account</CardTitle>
//         <CardDescription>
//           Enter your information below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <FieldGroup>
//             <Field>
//               <FieldLabel htmlFor="name">Full Name</FieldLabel>
//               <Input id="name" type="text" placeholder="John Doe" required />
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="email">Email</FieldLabel>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//               />
//               <FieldDescription>
//                 We&apos;ll use this to contact you. We will not share your email
//                 with anyone else.
//               </FieldDescription>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="password">Password</FieldLabel>
//               <Input id="password" type="password" required />
//               <FieldDescription>
//                 Must be at least 8 characters long.
//               </FieldDescription>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="confirm-password">
//                 Confirm Password
//               </FieldLabel>
//               <Input id="confirm-password" type="password" required />
//               <FieldDescription>Please confirm your password.</FieldDescription>
//             </Field>
//             <FieldGroup>
//               <Field>
//                 <Button type="submit">Create Account</Button>
//                 <Button
//                   variant="outline"
//                   type="button"
//                   onClick={(e) => handleGoogleLogin(e)}
//                 >
//                   Sign up with Google
//                 </Button>
//                 <FieldDescription className="px-6 text-center">
//                   Already have an account? <Link href="/login" className="underline underline-offset-4">Sign in</Link>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </FieldGroup>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }







"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Created Successfully", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button form="login-form" type="submit" className="w-full">
          Register
        </Button>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
