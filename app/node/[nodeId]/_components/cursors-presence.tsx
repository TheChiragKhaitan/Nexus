'use client'

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { memo } from "react";
import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import Path from "./path";
import { colorToCss } from "@/lib/utils";

const Cursors = () => {

    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor key={connectionId} connectionId={connectionId} />
            ))}
        </>
    )
}

const Drafts = () => {

    const others = useOthersMapped((other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColor: other.presence.penColor,
    }), shallow)

    return (
        <>
            {others.map(([key, other]) => {
                if (other.pencilDraft) {
                    return (
                        <Path 
                            x={0} 
                            y={0} 
                            key={key}
                            fill={other.penColor ? colorToCss(other.penColor) : "#000"} 
                            points={other.pencilDraft} 
                        />
                    )
                }
            })}
        </>
    )
}

export const CursorsPresence = memo(() => {
    return ( 
        <>
            <Drafts />
            <Cursors />
        </>
    );
})

CursorsPresence.displayName = "CursorsPresence"