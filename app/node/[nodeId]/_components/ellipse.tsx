import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps {
    id: string,
    layer: EllipseLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColour?: string;
}

const Ellipse = ({id, layer, onPointerDown, selectionColour}: EllipseProps) => {

    return ( 
        <ellipse 
            className="drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{ transform: `translate(${layer.x}px, ${layer.y}px)`}}
            cx={layer.width / 2}
            cy={layer.height / 2}
            rx={layer.width / 2}
            ry={layer.height / 2}
            strokeWidth={1}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColour || "transparent"}
        />
    );
}
 
export default Ellipse;