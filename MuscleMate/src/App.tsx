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

import './App.css'
import muscleLogo from './assets/MuscleLogo.png'
import { MenuBar } from "./components/ui/menuBar"

function MainMenu() {

  return (
    <>
      <div className="flex items-center justify-between p-8 lg:px-8">
        <img src={muscleLogo} width={200} height={200}/>
        <div className="mt-5 flex lg:ml-4 gap-20">
          <Input placeholder="Search" className="w-[200px] "/>
          <MenuBar />
        </div>
      </div>

      <Tabs defaultValue="exercises" className="w-[1200px]">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="abs">Abs</TabsTrigger>
          <TabsTrigger value="swimming">Swimming</TabsTrigger>
          <TabsTrigger value="running">Running</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="grid grid-cols-5 gap-10">
          <Card>
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
          <Card>
            <CardHeader>
              <CardTitle>Exercise 2</CardTitle>
              <CardDescription>Trends For You</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>   
        </TabsContent>

          <TabsContent value="abs" className="grid grid-cols-5 gap-10">
            <Card>
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </TabsContent>
            
          <TabsContent value="swimming" className="grid grid-cols-5 gap-10">
            <Card>
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>

          </TabsContent>

          <TabsContent value="running" className="grid grid-cols-5 gap-10">
            <Card>
              <CardHeader>
                <CardTitle>Trending</CardTitle>
                <CardDescription>Trends For You</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
    </>
  )
}

export default MainMenu
