'use client'

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EmptyBoards = () => {

    const router = useRouter()
    const { organization } = useOrganization()
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {

        if(!organization) return;

        mutate ({
            orgId: organization.id,
            title: "Untitled",
        })
            .then((id) => {
                toast.success("Node Created");
                router.push(`/node/${id}`)
            })
            .catch(() => toast.error("Failed to create node"))
    }

    return ( 
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src='/empty-data.svg'
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create Your First Node!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a node for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size='lg'>
                    Create Node
                </Button>
            </div>
        </div>
    );
}
 
export default EmptyBoards;