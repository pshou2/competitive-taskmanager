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
            const mockedUsers: any = [
                { _id: '123', googleId: '123', username: 'phil', email: 'philtest@gmail.com', groups: [] },
                { _id: '456', googleId: '456', username: 'test', email: 'testtest@gmail.com', groups: [] }
            ];
            
            vi.mocked(User.find).mockResolvedValue(mockedUsers);

            const result = await userService.getAllUsers();
            
            expect(result).toEqual(mockedUsers);
            expect(User.find).calledOnceWith({});
            expect(User.find).toHaveBeenCalledTimes(1);
        });

        it('Should throw an error on failure', async () => {
            const error: any = new Error('DB connection failed');
            vi.mocked(User.find).mockRejectedValue(error);
            await expect(userService.getAllUsers()).rejects.toThrow("Failed to query database for getAllUsers()");

            //this fails for some reason?
            // const result = await userService.getAllUsers();
            // await expect(result).rejects.toThrow("Failed to query database for getAllUsers()");
        });
    })
});

