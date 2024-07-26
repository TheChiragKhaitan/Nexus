import { mutation, query } from './_generated/server'
import { v } from "convex/values"

const images = [
    '/placeholders/1.svg',
    '/placeholders/2.svg',
    '/placeholders/3.svg',
    '/placeholders/4.svg',
    '/placeholders/5.svg',
    '/placeholders/6.svg',
    '/placeholders/7.svg',
    '/placeholders/8.svg',
    '/placeholders/9.svg',
    '/placeholders/10.svg',
]

/*In programming, especially in the context of server-side code, 
    the term context often refers to an object that holds information about the environment in which a function is being executed. 
    This information can include things like user authentication details, database connections, 
    and other utilities that the function might need to do its job.
 */

export const create = mutation ({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (context, args) => {
        // Get the user's identity
        const identity = await context.auth.getUserIdentity();

        // Check if the user is authenticated
        if(!identity) {
            throw new Error("Unauthorized")
        }

        // Select a random image URL
        const randomImage = images[Math.floor(Math.random() * images.length)];

        // Insert a new board into the database
        const board = await context.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        });

        // Return the newly created board
        return board;
    }
})

export const remove = mutation({
    args: {id: v.id("boards") },
    handler: async (context, args) => {
        // Get the user's identity
        const identity = await context.auth.getUserIdentity();

        // Check if the user is authenticated
        if(!identity) {
            throw new Error("Unauthorized")
        }

        const userId = identity.subject

        const existingFavourite = await context.db.query("userFavourites").withIndex("by_user_board", (q) => 
                                                                                                    q
                                                                                                        .eq("userId", userId)
                                                                                                        .eq("boardId", args.id)
                                                                                                ).unique();

        if(existingFavourite) {
            await context.db.delete(existingFavourite._id)
        }

        //Delete the board
        await context.db.delete(args.id);
    }
})

export const update = mutation ({
    args: {
        id: v.id("boards"),
        title: v.string(),
    },
    handler: async (context, args) => {
        // Get the user's identity
        const identity = await context.auth.getUserIdentity();

        // Check if the user is authenticated
        if(!identity) {
            throw new Error("Unauthorized")
        }

        const title = args.title.trim();

        if(!title) {
            throw new Error("Title is required");
        }

        if(title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters");
        }

        const board = await context.db.patch( args.id, { title: args.title })

        return board;

    }
})

export const favourite = mutation ({
    args: {
        id: v.id("boards"),
        orgId: v.string(),
    },
    handler: async (context, args) => {
        // Get the user's identity
        const identity = await context.auth.getUserIdentity();

        // Check if the user is authenticated
        if(!identity) {
            throw new Error("Unauthorized")
        }

        const board = await context.db.get( args.id)

        if(!board) {
            throw new Error("Node not found")
        }

        const userId = identity.subject

        const existingFavourite = await context.db
                                            .query("userFavourites")
                                            .withIndex("by_user_board", 
                                                (q) => (q
                                                            .eq("userId", userId)
                                                            .eq("boardId",board._id)
                                                        )
                                                )
                                            .unique();

        if(existingFavourite) {
            throw new Error("Node already in favourites")
        }

        await context.db.insert("userFavourites", {
            userId,
            boardId: board._id,
            orgId: args.orgId   
        })

        return board;

    }
})

export const unfavourite = mutation ({
    args: {
        id: v.id("boards"),
    },
    handler: async (context, args) => {
        // Get the user's identity
        const identity = await context.auth.getUserIdentity();

        // Check if the user is authenticated
        if(!identity) {
            throw new Error("Unauthorized")
        }

        const board = await context.db.get( args.id)

        if(!board) {
            throw new Error("Node not found")
        }

        const userId = identity.subject

        // Query the user's favourites to find the board
        const existingFavourite = await context.db
                                            .query("userFavourites")
                                            .withIndex("by_user_board", 
                                                (q) => (q
                                                            .eq("userId", userId)
                                                            .eq("boardId",board._id)
                                                        )
                                                )
                                            .unique();

        // Check if the board is already favourited by the user
        if(!existingFavourite) {
            throw new Error("Favourited Node not found")
        }

        // Delete the favourite record
        await context.db.delete(existingFavourite._id)

        return board;

    }
})

export const get = query({
    args: { id: v.id("boards") },
    handler: async (context, args) => {

        const board = context.db.get(args.id)

        return board;

    }
})