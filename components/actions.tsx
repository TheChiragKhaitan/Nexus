'use client'

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { UseRenameModal } from "@/store/use-rename-modal";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface ActionProps {
    children: React.ReactNode
    side?: DropdownMenuContentProps["side"];
    sideOffSet?: DropdownMenuContentProps["sideOffset"]
    id: string
    title: string 
}

const Actions = ({children, side, sideOffSet, id, title}: ActionProps) => {

    const { onOpen } = UseRenameModal()
    const router = useRouter();

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/node/${id}`,
        )
        .then(() => toast.success("Link copied"))
        .catch(() => toast.error("Failed to copy link"))
    }

    const { mutate, pending } = useApiMutation(api.board.remove);

    const onDelete = () => {

        mutate ({ id })
            .then((id) => {
                toast.success("Node Deleted");
                router.push('/')
            })
            .catch(() => toast.error("Failed to delete node"))
    }

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} onClick={(e) => e.stopPropagation()} sideOffset={sideOffSet} className="w-60" >
                <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy Node link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpen(id, title)} className="p-3 cursor-pointer">
                    <Pencil className="h-4 w-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal 
                    header = "Delete Node?" 
                    description = "This will delete the node and all of its content."
                    onConfirm = {onDelete}
                    disabled = {pending}
                >
                    <Button variant='ghost' className="p-3 text-sm w-full justify-start font-normal cursor-pointer">
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default Actions;