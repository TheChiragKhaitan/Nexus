'use client'

import { UseRenameModal } from "@/store/use-rename-modal";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const RenameModal = () => {

    const { mutate, pending } = useApiMutation(api.board.update);

    const { initialValues, isOpen, onClose } = UseRenameModal()

    const [title, setTitle] = useState(initialValues.title)

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutate({ id: initialValues.id, title })
            .then((id) => {
                toast.success("Node Renamed");
                onClose();
            })
            .catch(() => toast.error("Failed to rename node"))

    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit node title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this node
                </DialogDescription>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <Input
                        disabled={pending}
                        aria-disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        placeholder="Node Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant='outline'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} aria-disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RenameModal;