'use client'

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";
import Rectangle from "./rectangle";
import Ellipse from "./ellipse";
import Text from "./text";
import StickyNote from "./sticky-note";
import Path from "./path";
import { colorToCss } from "@/lib/utils";

interface LayerPreviewProps {
    id: string,
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColour?: string
}

export const LayerPreview = memo(({id, onLayerPointerDown, selectionColour}: LayerPreviewProps) => {

    const layer = useStorage((root) => root.layers.get(id))

    if(!layer) {
        return null;
    }

    switch (layer.type) {
        case LayerType.Path:
            return (
                <Path x={layer.x} y={layer.y} fill={layer.fill ? colorToCss(layer.fill) : "#000"} key={id} points={layer.points} onPointerDown={(e) => onLayerPointerDown(e, id)} stroke={selectionColour} />
            );
        case LayerType.Note:
            return (
                <StickyNote id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColour={selectionColour} />
            );
        case LayerType.Text:
            return (
                <Text id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColour={selectionColour} />
            );
        case LayerType.Ellipse:
            return (
                <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColour={selectionColour} />
            );
        case LayerType.Rectangle:
            return (
                <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColour={selectionColour} />
            );
        default: 
            console.warn("Unknown layer type")
            return null;
    }
})
 
LayerPreview.displayName = "LayerPreview";