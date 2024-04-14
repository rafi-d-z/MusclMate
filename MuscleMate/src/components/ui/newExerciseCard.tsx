import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Label } from "./label";
import { Input } from "./input";

export const NewExerciseCard: React.FC = () => {
    return (
      <>
      <Card className="w-[210px]">
        <CardContent>
          <Popover>
          <PopoverTrigger asChild>
            <button style={{ width: '170px', height: '190', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>+</button>
          </PopoverTrigger>
          
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Create Exercise</h4>
                <p className="text-sm text-muted-foreground">
                  Add exercise details here
                </p>
                </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Name: </Label>
                  <Input
                    id="maxWidth"
                    defaultValue="Pull ups"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Target Muscles: </Label>
                  <Input
                    id="maxWidth"
                    defaultValue="none"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Reps: </Label>
                  <Input
                    id="height"
                    defaultValue="12"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Sets: </Label>
                  <Input
                    id="height"
                    defaultValue="3"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">Weight: </Label>
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
      </Card>
      </>
    );
}