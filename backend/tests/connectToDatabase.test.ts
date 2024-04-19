import activate_db from "../server/db"
import {Client} from 'pg';


describe('Connects to database', () => {
    test("should connect to database", async () => {
        const client = await activate_db();
        expect(typeof(client)).toBe("object"); 
    })
});