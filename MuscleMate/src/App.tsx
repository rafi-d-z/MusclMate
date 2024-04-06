import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
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

import './App.css'
import muscleLogo from './assets/MuscleLogo.png'

function MainMenu() {

  return (
    <>
      <div className="flex items-center justify-between p-6 lg:px-8">
        <img src={muscleLogo} width={200} height={200}/>
        <div className="mt-5 flex lg:ml-4 gap-20">
          <Input placeholder="Search" className="w-[200px] "/>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className ="text-sm font-semibold leading-6 text-gray-900">Dashboard</Button>
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

      <div>
        <Tabs defaultValue="trending" className="w-[1200px]">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="abs">Abs</TabsTrigger>
            <TabsTrigger value="swimming">Swimming</TabsTrigger>
            <TabsTrigger value="running">Running</TabsTrigger>
          </TabsList>
          <TabsContent value="trending" className = "grid grid-cols-5">
            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Exercise 1</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
              </CardFooter>
            </Card>

            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Exercise 2</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
              </CardFooter>
            </Card>

            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Exercise 3</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
              </CardFooter>
            </Card>

            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Exercise ..</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Add Exercise</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                     </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Catagory</Label>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">Exercise1</Label>
                        <Input
                          id="maxWidth"
                          defaultValue="300px"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Exercise2</Label>
                        <Input
                          id="height"
                          defaultValue="25px"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxHeight">Exercise3</Label>
                        <Input
                          id="maxHeight"
                          defaultValue="none"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              </CardContent>
              <CardFooter>
                   
              </CardFooter>
            </Card>

          </TabsContent>
          <TabsContent value="abs" className = "grid grid-cols-5">
            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
              </CardFooter>
            </Card>

            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
              </CardFooter>
            </Card>

            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
              </CardFooter>
            </Card>

          </TabsContent>
          <TabsContent value="swimming" className = "grid grid-cols-5">
            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
              </CardFooter>
            </Card>

            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
              </CardFooter>
            </Card>

          </TabsContent>
          <TabsContent value="running" className = "grid grid-cols-5">
            <Card className="w-[200px]">
                <CardHeader>
                  <CardTitle>Trending</CardTitle>
                  <CardDescription>Trends For You</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
                </CardFooter>
              </Card>
              <Card className="w-[200px]">
                <CardHeader>
                  <CardTitle>Trending</CardTitle>
                  <CardDescription>Trends For You</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Add exercise</Label>
                      </div>
                    </div>
                </CardFooter>
              </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default MainMenu
