import { describe, it, expect, beforeEach, vi } from "vitest";
import { User } from "../models/User";
import * as userService from "../services/userService";

//mock user?
//do it in a function? mock methods in the object?

vi.mock("../models/User", () => ({
    User: {
        find: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        findByIdAndUpdate: vi.fn(),
        findByIdAndDelete: vi.fn()
    }
}));

describe("userService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Test getAllUsers()", () => {
        it("Should return an array of users", async () => {
            const mockedUsers: any = [
                { _id: "123", googleId: "123", username: "phil", email: "philtest@gmail.com", groups: [] },
                { _id: "456", googleId: "456", username: "test", email: "testtest@gmail.com", groups: [] }
            ];
            
            vi.mocked(User.find).mockResolvedValue(mockedUsers);

            const result = await userService.getAllUsers();
            
            expect(result).toEqual(mockedUsers);
            expect(User.find).calledOnceWith({});
            expect(User.find).toHaveBeenCalledTimes(1);
        });

        it("Should throw an error on failure", async () => {
            const error: any = new Error("DB connection failed");
            vi.mocked(User.find).mockRejectedValue(error);
            await expect(userService.getAllUsers()).rejects.toThrow("Failed to query database for getAllUsers()");

            //this fails for some reason?
            // const result = await userService.getAllUsers();
            // await expect(result).rejects.toThrow("Failed to query database for getAllUsers()");
        });
    });

    describe("Test getUserById()", () => {
        it("Should return a single user with id", async () => {
            const id = "123";
            const mockUser = { 
                _id: "123", 
                googleId: "123", 
                username: "phil", 
                email: "philtest@gmail.com", 
                groups: [] 
            };

            vi.mocked(User.findById).mockResolvedValue(mockUser);

            const result = await userService.getUserById(id);

            expect(result).toEqual(mockUser);
        });

        it("Should return null user if no user found", async () => {
            const id = "123";
            vi.mocked(User.findById).mockResolvedValue(null);
            
            const result = await userService.getUserById(id);
            expect(result).toBeNull();
        });

        it("Should throw an error on failure", async () => {
            const id = "123";
            const error = new Error(`Failed to query database for getUserById() : ${id}`);

            vi.mocked(User.findById).mockRejectedValue(error);

            await expect(userService.getUserById(id)).rejects.toThrow(`Failed to query database for getUserById() : ${id}`);
        });
    });

    describe("Test createUser()", () => {
        it("Should create a user", async () => {
            const input = { 
                _id: "123", 
                googleId: "123", 
                username: "phil", 
                email: "philtest@gmail.com",
            };

            const mockUser: any = { 
                _id: "123", 
                googleId: "123", 
                username: "phil", 
                email: "philtest@gmail.com",
                groups: [] 
            };

            vi.mocked(User.create).mockResolvedValue(mockUser);
            const result = await userService.createUser(input);

            expect(result).toEqual(mockUser);
        });

        it("Should throw an error on failure", async () => {
            const input = { 
                _id: "123"
            };

            const error = new Error("Failed to create a user in the database");

            vi.mocked(User.create).mockRejectedValue(error);

            await expect(userService.createUser(input)).rejects.toThrow("Failed to create a user in the database");
        });
    });
});

