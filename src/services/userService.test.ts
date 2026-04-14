import { describe, it, expect, beforeEach, vi } from "vitest";
import { User } from "../models/User";
import * as userService from "../services/userService";

//mock user?
//do it in a function? mock methods in the object?

vi.mock('../models/User', () => ({
    User: {
        find: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        findByIdAndUpdate: vi.fn(),
        findByIdAndDelete: vi.fn()
    }
}));

describe('userService tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllUsers tests', async () => {
        it('Should return an array of users', async () => {
            //needed to add _id
            const mockedUsers: any = [
                { _id: 'abc', googleId: '123', username: 'phil', email: 'philtest@gmail.com', groups: [] },
                { _id: 'def', googleId: '456', username: 'test', email: 'testtest@gmail.com', groups: [] }
            ];
            //User should be User.find, because we're mocking the user.find call
            //mocked user had a type error with Document
            //typeerror mockResolvedValue is not a function
                //solution: vi.mock('../models/user') had the wrong module - vi.mock('../models/User') is correct
            vi.mocked(User.find).mockResolvedValue(mockedUsers);

            //act
            const result = await userService.getAllUsers();
            
            expect(result).toEqual(mockedUsers);
            expect(User.find).calledOnceWith({});
            expect(User.find).toHaveBeenCalledTimes(1);
        });

        it('Should throw an error on failure', async () => {
            //arange
                //user.find needs to throw an error
                //mock what db error mongodb throws back
            const error: any = new Error('DB connection failed');
            vi.mocked(User.find).mockRejectedValue(error);
            
            //act
            //assert
            //verify the error is thrown
            await expect(userService.getAllUsers()).rejects.toThrow("Failed to query database for getAllUsers()");

            //this fails for some reason?
            // const result = await userService.getAllUsers();
            // await expect(result).rejects.toThrow("Failed to query database for getAllUsers()");
        });
    })
});

