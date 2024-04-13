import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import './App.css'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Checkbox } from "@/components/ui/checkbox"
 
const formSchema = z.object({
    username: z.string().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    remember: z.boolean().default(false).optional(),
    confirmPwd: z.string(),
    email: z.string().email({ message: "Invalid email address" })
  })

function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
          remember: true,
          confirmPwd: "",
          email: "",
        },
      })
     
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <>
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <Tabs className="w-[700px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>       
            </TabsList>

            <TabsContent value="login">
              <Card className="w-[700px]">
                <CardHeader>
                  <CardTitle>Log In</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type="username" placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    Remember Me
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                            />                             
                            <Button type="submit">Login</Button>
                        </form>
                      </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup">
                <Card className="w-[700px]">
                  <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                              <FormItem>
                              <FormControl>
                                  <Input type="username" placeholder="Username" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                              <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                              <FormItem>
                              <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <FormField
                          control={form.control}
                          name="confirmPwd"
                          render={({ field }) => (
                              <FormItem>
                              <FormControl>
                                <Input type="password" placeholder="Confirm Password" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                                                    
                          <Button type="submit">Sign Up</Button>
                        </form>
                      </Form>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
        </div>
        </>
    )
}

export default Login