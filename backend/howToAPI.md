# General
- public server URL: [http://api-muscleman.com/](http://api-muscleman.com/)
- all available endpoints: `get_exercise`, `create_exercise`, `delete`, `edit_exercise`, `get_mock_exercise`, `get_workouts`, `create_workouts`, `edit_workout`, `delete_workout`
- [axios doc](https://axios-http.com/docs/api_intro)

## PS 👀
- you can view this `markdown` file in better quality by hitting
    - `mac`: <kbd>&#8984;</kbd> + <kbd>Shift</kbd> + <kbd>v</kbd>
    - `windows`: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>v</kbd>

# How To Use APIs
- for this server, all APIs have three parameters 
    - **base URL**
        - see public server URL above
    - **endpoints** 
        - this is how you direct your request to the right logic 
        - is added at the end of the base URL
    - **parameters/body**
        - has the body of data you wish to request/add/delete
        - parameters appear in the url 
        - body is sent as metadata
- we have three types of requests in this server, `get`, `post`, and `delete`
    - `get` corresponds to a request that simply requests information
    - `post` corresponds to a request that tries to change information
    - `delete` corresponds to a request that deletes information

- the base URL is the hub that contains all endpoints and functions
- you want to attach an endpoint to the base URL to send and receive data to your use case
- you will also need to attach some sort of parameter or body to your request in order to filter your request
    - in most cases it will reject if you don't have a parameter

- as you'll see, almost all of the APIs avaliable will take in an object coresponding to the respective action
    - workout endpoints take in workout objects, exercise objects take in exercise objects
    - these object's schemas are represented in `backend/server/DAO`
    - I would copy and paste these over the UI directory so it's easy to use

## Example
- I want to query the `create_workout` endpoint
- I will send a post request to base URL + `create_workout`
    - `http://api-muscleman.com/create_workout`
    - using axios, I will attach a workout object in the body
    - ```typescript
        axios({
            method: "post",
            url: "http://api-muscleman.com/create_workout",
            data: {
                newWorkout
            }
            }).then((res) => {
                // do something with the reponse (omit .then if not needed)
                console.log(res); // will log the UID of the new workout
            }).catch((err) => {
                // error handling
                console.error(err);
            })
        ```
- API calls are asynchronus in nature - so make sure to await then in an asynchronus function
- workout object 
    - ```typescript
        const newWorkout: workout = {
            uid: "any",
            workout_name: "unit_test",
            exercise_arr: ["5442fc3c-bcb0-4ba0-87a3-a05e3186b298", "6d481883-a599-44d5-9c45-8e4f57e6d917"],
            keywords: ["test", "test", "test"],
        }
        ```