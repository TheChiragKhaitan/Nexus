import Image from "next/image";

const Loading = () => {
    return ( 
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image alt="logo" src='/logo.svg' width={120} height={120} className="animate-pulse duration-700"/>
        </div> 
    );
}
 
export default Loading;