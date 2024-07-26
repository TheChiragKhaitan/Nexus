import Room from "@/components/room";
import Canvas from "./_components/canvas";
import Loading from "./_components/loading";

interface BoardIdPageProps {
    params: {
        nodeId: string
    }
}

const BoardIdPage = ({params}: BoardIdPageProps) => {

    return ( 
            <Room roomId={params.nodeId} fallback={<Loading />} >
                <Canvas boardId={params.nodeId} />
            </Room>
    );
}
 
export default BoardIdPage;