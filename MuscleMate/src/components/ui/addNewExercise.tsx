  const handleAddNewExercise = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 

    // eslint-disable-next-line prefer-const
    let cardToAdd: exercise = {
      uid: "",
      exercise_name: exerciseName,
      exercise_target: exerciseTarget,
      image_url: image_url,
      n_reps: parseInt(reps),
      n_sets: parseInt(sets),
      weight: parseInt(weight),
      arr_keywords: [],
      description: '', // TODO: add functionality to add this
      difficulity: '', // TODO: add functionality to add this
      creator: uid
    }

    axios.post("https://api-muscleman.com/create_exercise", {
      uid: "",
      exercise_name: exerciseName,
      exercise_target: exerciseTarget,
      image_url: image_url,
      n_reps: reps,
      n_sets: sets,
      weight: weight,
      // add functionality to add desc, difficulity 
      creator: uid
    })
      .then(function (response) {
        cardToAdd.uid = response.data.uid;
        setSelectedCardData([cardToAdd, ...selectedCardData]);
        console.log(cardToAdd);
        console.log("Data: ", response.data);
      })
      .catch((res) => {
        console.error("Error connecting to server,", res.response.data);
      });

    setIsPopoverOpen(false);
  };

function AddNewExerciseCard(){
    return (
        <>
        <Card className="w-[210px]">
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <button style={{ width: '170px', height: '190px', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setIsPopoverOpen(true)}>+</button>
                </PopoverTrigger>
                {isPopoverOpen && (
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Create Exercise</h4>
                        <p className="text-sm text-muted-foreground">Add exercise details here</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="exerciseName">Name: </Label>
                          <Input id="exerciseName" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="targetMuscles">Target Muscles:</Label>
                          <Select onValueChange={setExerciseTarget}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Arms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="arms">Arms</SelectItem>
                              <SelectItem value="legs">Legs</SelectItem>
                              <SelectItem value="chest">Chest</SelectItem>
                              <SelectItem value="back">Back</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="reps">Reps:</Label>
                          <Input id="reps" value={reps} onChange={handleRepsChange} className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="sets">Sets:</Label>
                          <Input id="sets" value={sets} onChange={handleSetsChange} className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="weight">Weight:</Label>
                          <Input id="weight" value={weight} onChange={handleWeightChange} className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="img_url">Image URL:</Label>
                          <Input id="img_url" value={image_url} onChange={(e) => setImageUrl(e.target.value)} className="col-span-2 h-8" />
                        </div>

                        <Button onClick={handleAddNewExercise}>Submit</Button>
                      </div>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            </CardContent>
          </Card>
        </>
    )
}