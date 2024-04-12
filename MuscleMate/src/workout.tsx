import React from "react"
import { Plus } from "lucide-react"
import { Minus } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Toast } from "@/components/ui/toast"




import './App.css'
import muscleLogo from './assets/MuscleLogo.png'
import ReactDOMServer from 'react-dom/server';




const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
] as const


const FormSchema = z.object({
    language: z.string({
        required_error: "Please select a workout.",
    }),
})




function Workout() {


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    function onSubmit(data: z.infer<typeof FormSchema>) {
        Toast({
            title: "You submitted the following values:",
            content: ReactDOMServer.renderToString(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }


    return (
        <>
            <div className="flex items-center justify-between p-6 lg:px-8">
                <img src={muscleLogo} width={200} height={200} />
                <h1>My Workouts</h1>
                <div className="mt-5 flex lg:ml-4 gap-20">
                    <Input placeholder="Search" className="w-[200px] " />
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Add Workout</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Choose Workout</DialogTitle>
                                    <DialogDescription>
                                        Choose the workout to be add.
                                    </DialogDescription>
                                </DialogHeader>
                                <div><Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="language"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Workout</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-[200px] justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? languages.find(
                                                                            (language) => language.value === field.value
                                                                        )?.label
                                                                        : "Select workout"}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search workout..." />
                                                                <CommandEmpty>No workout found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {languages.map((language) => (
                                                                        <CommandItem
                                                                            value={language.label}
                                                                            key={language.value}
                                                                            onSelect={() => {
                                                                                form.setValue("language", language.value)
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    language.value === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {language.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription>
                                                        This is the workout that will be added.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                                </div>
                                <DialogFooter className="flex justify-between">
                                    <DialogClose>
                                        <Button variant="outline">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="text-sm font-semibold leading-6 text-gray-900">Dashboard</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                This is where we will have the buttons.
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '360px' }}>
                <div>
                    <div><h1>Workout 1</h1>
                        <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                        </Button></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px' }}>
                        <Card className="w-[200px]">
                            <CardHeader>
                                <CardTitle>Exercise 1</CardTitle>
                                <CardDescription>Trends For You</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>
                        <Button variant="outline" size="icon">
                            <Minus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Workout
