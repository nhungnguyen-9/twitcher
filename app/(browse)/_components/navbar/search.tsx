'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import qs from 'query-string'
import { getSearch } from '@/lib/search-service'
import { SearchSuggestions } from '../../search/_components/search-suggestions'

interface Suggestion {
    id: string,
    title: string,
    updated_at: Date,
    thumbnail_url: string | null,
    is_live: boolean,
    user: {
        id: string,
        bio: string | null,
        role_id: bigint,
        email: string,
        username: string,
        image_url: string,
        external_user_id: string,
        created_at: Date,
        updated_at: Date,
    };
}

export const Search = () => {
    const router = useRouter()
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const suggestionsRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!value) return
        const url = qs.stringifyUrl({
            url: '/search',
            query: { term: value }
        }, { skipEmptyString: true })
        router.push(url)
    }

    const onClear = () => {
        setValue('')
        setSuggestions([])
        setShowSuggestions(false)
    }

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
            inputRef.current && !inputRef.current.contains(event.target as Node)
        ) {
            setShowSuggestions(false)
        }
    }, [])

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (value.length > 1) {
                const data = await getSearch(value)
                const formattedData: Suggestion[] = data.map(item => ({
                    ...item,
                    id: item.id.toString(),
                    user: {
                        ...item.user,
                        id: item.user.id.toString(),
                    }
                }))
                setSuggestions(formattedData)
                setShowSuggestions(formattedData.length > 0)
            } else {
                setSuggestions([])
                setShowSuggestions(false)
            }
        }

        const debounceFetch = setTimeout(fetchSuggestions, 100)
        return () => {
            clearTimeout(debounceFetch)
        }
    }, [value])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [handleClickOutside])

    const handleInputFocus = () => {
        if (value.length > 0) {
            setShowSuggestions(true)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        setShowSuggestions(newValue.length > 0)
        if (newValue.length === 0) setSuggestions([])
    }

    return (
        <form
            onSubmit={onSubmit}
            className="relative w-full lg:w-[400px] flex items-center text-white"
        >
            <Input
                ref={inputRef}
                value={value}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder='Search'
                className="rounded-xl bg-[#14161b] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
            {value && (
                <X
                    onClick={onClear}
                    className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                />
            )}
            <Button
                type='submit'
                size='sm'
                variant='secondary'
                className='rounded-l-none'
            >
                <SearchIcon className='h-5 w-5 text-muted-foreground' />
            </Button>

            {showSuggestions && suggestions.length > 0 && (
                <div ref={suggestionsRef}>
                    <SearchSuggestions suggestions={suggestions} />
                </div>
            )}
        </form>
    )
}
