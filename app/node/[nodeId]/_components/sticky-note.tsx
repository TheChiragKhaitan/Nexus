import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { NoteLayer } from "@/types/canvas";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})


interface StickyNoteProps {
    id: string,
    layer: NoteLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColour?: string;
}

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.15;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;
  
    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
}

const StickyNote = ({id, layer, onPointerDown, selectionColour}: StickyNoteProps) => {

    const {x, y, width, height, fill, value} = layer;

    const updateValue = useMutation(( { storage }, newValue: string ) => {
        
        const liveLayers = storage.get("layers")
        liveLayers.get(id)?.set("value", newValue)

    },[])

    const handleContentChange = ( e: ContentEditableEvent ) => {
        updateValue(e.target.value)
    }

    return ( 
        <foreignObject 
            onPointerDown={(e) => onPointerDown(e, id)}
            className="shadow-md drop-shadow-xl"
            style={{ outline: selectionColour ? `1px solid ${selectionColour}` : "none", backgroundColor: fill ? colorToCss(fill) : "#000" }}
            x={x}
            y={y}
            width={width}
            height={height}
        >
            <ContentEditable 
                className={cn("h-full w-full flex items-center justify-center text-center outline-none", font.className)} 
                html={value || "Text"} 
                style={{color: fill ? getContrastingTextColor(fill) : "#000", fontSize: calculateFontSize(width, height)}}
                onChange={handleContentChange} 
            />
        </foreignObject>
    );
}
 
export default StickyNote;