import { useState, useEffect, useRef, useCallback } from 'react'

export interface responsePost  {
    id: string
    userId: string
    username: string
    avatar: string
    shopName: string
    shopId: string
    images: string[]
    comments: number
    date: string
    text: string
    likes: number
    didLike: boolean
    premium: boolean
}

const BASIC_URL = 'https://dev.tedooo.com'

export default function useFetchPosts(postsCount: number){
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [posts, setPosts] = useState<responsePost[]>([])
    const [hasMore, setHasMore] = useState<boolean>(true)

    async function fetchPosts(postsCount: number){
        try {
            setIsFetching(true)
            const response = await fetch(`${BASIC_URL}/hw/feed.json?skip=${postsCount}`)
            const jsonObject = await response.json()
            setPosts(prev => {return prev.concat(jsonObject.data)})
            setHasMore(jsonObject.hasMore)
        } catch (err) {
            const errorMessage: string = 'There was an error fetching the posts'
            console.log(`${errorMessage}: ` + err);
            setErrorMessage(errorMessage)
        } finally {
            setIsFetching(false)
        }
    }
    useEffect(() => {
        fetchPosts(postsCount)
    }, [postsCount])

    return { isFetching, errorMessage, posts, hasMore}
}   


