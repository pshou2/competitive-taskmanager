import { Schema, model, Types } from "mongoose"; 

///create and export interface
interface IMember {
    userId: Types.ObjectId;
    role: string;
    points: number;
}

interface IInvitation {
    userId: Types.ObjectId;
    invitedAt: Date; //The mongoose Date schema type, is this right?
}

export interface IGroup {
    groupName: string;
    groupGoal: string;
    members: IMember[]; //whats the type of an object like this? {"userId": ObjectId("..."), "role": "leader", "points": 12 }
    invitations: IInvitation[]; //similar question to members
}

const memberSchema = new Schema<IMember>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["leader", "member"]
    },
    points: {
        type: Number,
        default: 0
    }
});

const invitationSchema = new Schema<IInvitation>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    invitedAt: {
        type: Date,
        default: Date.now
    }
});

///create schema
//remove curly brackets around memberSchema, creating an object literal
const groupSchema = new Schema<IGroup> ({
    groupName: {
        type: String,
        required: [true, "Group name is required"]
    },
    groupGoal: {
        type: String,
        default: ""
    },
    members: [memberSchema],
    invitations: [invitationSchema]
}, {
    timestamps: true
});

//define schema type for members field - list of Members

///export model
export const Group = model<IGroup>("Group", groupSchema);