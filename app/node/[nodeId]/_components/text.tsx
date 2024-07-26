import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { TextLayer } from "@/types/canvas";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})


interface TextProps {
    id: string,
    layer: TextLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColour?: string;
}

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.35;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;
  
    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
}

const Text = ({id, layer, onPointerDown, selectionColour}: TextProps) => {

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
            style={{ outline: selectionColour ? `1px solid ${selectionColour}` : "none" }}
            x={x}
            y={y}
            width={width}
            height={height}
        >
            <ContentEditable 
                className={cn("h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none", font.className)} 
                html={value || "Text"} 
                style={{color: fill ? colorToCss(fill) : "#000", fontSize: calculateFontSize(width, height)}}
                onChange={handleContentChange} 
            />
        </foreignObject>
    );
}
 
export default Text;