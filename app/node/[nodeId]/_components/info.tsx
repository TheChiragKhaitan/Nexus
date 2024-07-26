'use client'

import Actions from "@/components/actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { UseRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
    boardId : string
}

const font = Poppins ({
    subsets: ['latin'],
    weight: ['600'],
})

const TabSeparater = () => {
    return (
        <div className="text-neutral-500 px-1.5">
            |
        </div>
    )
}

const Info = ({boardId}: InfoProps) => {

    const { onOpen } = UseRenameModal()

    const data = useQuery(api.board.get, {id: boardId as Id<"boards">})

    if(!data) {
        return <InfoSkeleton />
    }

    return ( 
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to Home" side="bottom" sideOffSet={10}>
                <Button asChild variant='board' className="px-2">
                    <Link href='/'>
                        <Image 
                            src='/logo.svg'
                            alt="Logo"
                            height={40}
                            width={40}
                        />
                        <span className={cn("font-semibold text-xl ml-2 text-black", font.className)}>
                            Nexus
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparater />
            <Hint label="Edit Title" side="bottom" sideOffSet={10}>
                <Button variant='board' onClick={() => onOpen(data._id, data.title)} className="text-base font-normal px-2">
                    {data.title}
                </Button>
            </Hint>
            <TabSeparater />
            <Actions id={data._id} title={data.title} side="bottom" sideOffSet={10} >
                <div>
                    <Hint label="Main Menu" side="bottom" sideOffSet={10} >
                        <Button size='icon' variant='board'>
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    );
}

export const InfoSkeleton = () => {
    return (
        <div className="animate-pulse absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px] " />
            
    )
}
 
export default Info;