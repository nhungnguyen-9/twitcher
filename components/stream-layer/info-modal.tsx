'use client'

import { updateStream } from "@/actions/stream"
import { useRouter } from "next/navigation"
import { ElementRef, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Hint } from "../hint"
import { Trash } from "lucide-react"
import Image from "next/image"
import { Label } from "../ui/label"
import { UploadDropzone } from "@/lib/uploadthing"

interface InfoModalProps {
    initialName: string,
    initialThumbnail: string | null
}

export const InfoModal = ({
    initialName,
    initialThumbnail
}: InfoModalProps) => {
    const router = useRouter()
    const closeRef = useRef<ElementRef<'button'>>(null)

    const [name, setName] = useState(initialName)
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnail)

    const [isPending, startTransition] = useTransition()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            updateStream({ title: name })
                .then(() => {
                    toast.success('Stream updated')
                    closeRef?.current?.click()
                })
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const onRemoveThumbnail = () => {
        startTransition(() => {
            updateStream({ thumbnail_url: null })
                .then(() => {
                    toast.success('Stream updated')
                    setThumbnailUrl('')
                    closeRef?.current?.click()
                })
                .catch(() => toast.error('Something went wrong'))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='link' size='sm' className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Title
                        </Label>
                        <Input
                            placeholder="Stream title"
                            onChange={onChange}
                            value={name}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint asChild label="Remove thumbnail" side="left">
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemoveThumbnail}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className='h-4 w-4' />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    alt='Thumbnail'
                                    src={thumbnailUrl}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    endpoint="thumbnailUploader"
                                    appearance={{
                                        label: {
                                            color: '#FFFFFF'
                                        },
                                        allowedContent: {
                                            color: '#FFFFFF'
                                        }
                                    }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnailUrl(res?.[0]?.url)
                                        router.refresh()
                                        closeRef?.current?.click()
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant='ghost'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            variant='primary'
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
