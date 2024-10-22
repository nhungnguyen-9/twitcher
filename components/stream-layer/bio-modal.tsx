'use client'

import { ElementRef, useEffect, useRef, useState, useTransition } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"
import { updateUser } from "@/actions/user"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Link2, Plus, Trash2 } from "lucide-react"

interface Social {
    id: string,
    name: string,
    link: string,
}

interface BioModalProps {
    initialValue: string | null,
    socials: Social[],
    onUpdateSocials: (newSocials: Social[]) => void,
}

export const BioModal = ({
    initialValue,
    socials,
    onUpdateSocials
}: BioModalProps) => {
    const [isPending, startTransition] = useTransition()

    const closeRef = useRef<ElementRef<'button'>>(null)

    const [value, setValue] = useState(initialValue || '')

    const [socialLinks, setSocialLinks] = useState<Social[]>([])

    useEffect(() => {
        setSocialLinks(socials)
    }, [socials])

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const handleSocialChange = (index: number, field: 'name' | 'link', value: string) => {
        const updatedSocials = [...socialLinks]
        updatedSocials[index] = { ...updatedSocials[index], [field]: value }
        setSocialLinks(updatedSocials)
    }

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { id: Date.now().toString(), name: '', link: '' }])
    }

    const removeSocialLink = (index: number) => {
        const updatedSocials = socialLinks.filter((_, i) => i !== index)
        setSocialLinks(updatedSocials)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            const updatedSocials = [...socials, ...socialLinks.filter(newSocial =>
                !socials.some(existingSocial => existingSocial.id === newSocial.id)
            )];

            updateUser({
                bio: value,
                socials: updatedSocials
            })
                .then(() => {
                    toast.success('User updated')
                    onUpdateSocials(updatedSocials)
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
                    <DialogTitle>Edit user bio</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        placeholder="User bio"
                        onChange={onChange}
                        value={value}
                        disabled={isPending}
                        className="resize-none"
                    />
                    <h2 className="font-bold flex items-center gap-2 my-2">Social links <Link2 className="h-5 w-5" /></h2>
                    {socialLinks.map((social, index) => (
                        <div key={social.id.toString()} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Link {index + 1}</Label>
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeSocialLink(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <Input
                                placeholder="Link Title"
                                value={social.name}
                                onChange={(e) => handleSocialChange(index, 'name', e.target.value)}
                                disabled={isPending}
                            />
                            <Input
                                placeholder="Link URL"
                                value={social.link}
                                onChange={(e) => handleSocialChange(index, 'link', e.target.value)}
                                disabled={isPending}
                            />
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addSocialLink} disabled={isPending}>
                        <Plus className="h-4 w-4 mr-2" /> Add Social Link
                    </Button>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant='ghost'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            ref={closeRef}
                            variant='primary'
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
