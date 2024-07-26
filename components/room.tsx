'use client'

import { ReactNode } from "react"
import { RoomProvider } from "@/liveblocks.config"
import { ClientSideSuspense } from "@liveblocks/react"
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client"
import { Layer } from "@/types/canvas"

interface RoomProps {
    children: ReactNode  
    roomId: string
    fallback: NonNullable<ReactNode> | null
}

const Room = ({children, roomId, fallback} : RoomProps) => {
    return ( 
        <RoomProvider id={roomId} initialStorage={{layers: new LiveMap<string, LiveObject<Layer>>(), layerIds: new LiveList()}} initialPresence={{cursor: null, selection: [], pencilDraft: null, penColor: null}}>
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
 
export default Room;