"use client"
import React from "react"
import { Plus, Minus, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import './App.css'
import muscleLogo from './assets/MuscleLogo.png'
import { Menubar } from "@/components/ui/menubar"



const exercises = [
    {
        value: "pushup",
        label: "Pushup",
    },
    {
        value: "squat",
        label: "Sqaut",
    },
    {
        value: "deadlift",
        label: "Deadlift",
    },
]


function Workout() {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")


    return (
    <>
            {/* top bar components */}
      <div className="flex items-center justify-between p-8 lg:px-8">
        <img src={muscleLogo} width={200} height={200}/>
        <div className="mt-5 flex lg:ml-4 gap-20">
          <Input placeholder="Search" className="w-[200px] "/>
          <Menubar />
        </div>
      </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '360px' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '800px' }}>
                        <div className="flex flex-col items-start justify-between p-6 lg:px-8">
                            <Card className="w-[200px] h-[600px] m-4 bg-gray-200">
                                <CardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CardTitle><h1>Create Workout</h1></CardTitle>
                                    <CardDescription></CardDescription>
                                </CardHeader>
                                <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Dialog>
                                        <DialogTrigger><Button variant="ghost" size="icon">
                                            <Plus className="h-20 w-20" />
                                        </Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Input Workout Name</DialogTitle>
                                                <DialogDescription>
                                                    Enter the name of the workout.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex w-full max-w-sm items-center space-x-2">
                                                <Input type="Name" placeholder="Name" />
                                                <Button type="submit">Submit</Button>
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
                                </CardContent>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Dialog >
                                    <DialogTrigger >
                                        <Button variant="link" size="icon">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Choose Exercise</DialogTitle>
                                            <DialogDescription>
                                                Select the exercise you would like to add to the workout.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={open}
                                                        className="w-[200px] justify-between"
                                                    >
                                                        {value
                                                            ? exercises.find((exercise) => exercise.value === value)?.label
                                                            : "Select exercise..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search exercise..." />
                                                        <CommandList>
                                                            <CommandEmpty>No exercise found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {exercises.map((exercise) => (
                                                                    <CommandItem
                                                                        key={exercise.value}
                                                                        value={exercise.value}
                                                                        onSelect={(currentValue) => {
                                                                            setValue(currentValue === value ? "" : currentValue)
                                                                            setOpen(false)
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                value === exercise.value ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {exercise.label}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <Button type="submit">Submit</Button>
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
                                <h1>Workout 1   </h1>
                                <Button variant="link" size="icon">
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </div>
                            <Card className="w-[200px] m-4">
                                <CardHeader>
                                    <CardTitle>Exercise 1</CardTitle>
                                    <CardDescription>Trends For You</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="link" size="icon">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button variant="link" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                                <h1>Workout 2</h1>
                                <Button variant="link" size="icon">
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </div>
                            <Card className="w-[200px] m-4">
                                <CardHeader>
                                    <CardTitle>Exercise 1</CardTitle>
                                    <CardDescription>Trends For You</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="link" size="icon">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button variant="link" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                                <h1>Workout 3</h1>
                                <Button variant="link" size="icon">
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </div>
                            <Card className="w-[200px] m-4">
                                <CardHeader>
                                    <CardTitle>Exercise 1</CardTitle>
                                    <CardDescription>Trends For You</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="link" size="icon">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card className="w-[200px] m-4">
                                <CardHeader>
                                    <CardTitle>Exercise 2</CardTitle>
                                    <CardDescription>Trends For You</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="link" size="icon">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Workout
