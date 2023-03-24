import { useState, useRef, useCallback } from 'react'
import Spinner from '../Spinner/Spinner'
import Post from '../Post/Post'
import useFetchPosts, { responsePost } from '../../hooks/useFetchPosts'
export default function Feed() {
    const [postsCount, setPostsCount] = useState<number>(0)
    const { isFetching, errorMessage, posts, hasMore } = useFetchPosts(postsCount)

    const lastPostObserver = useRef<IntersectionObserver | null>(null)
    const lastPostRef = useCallback((node: HTMLElement) => {
        if (isFetching) return   // avoid infinite loop
        if (lastPostObserver.current) lastPostObserver.current.disconnect()   // if exists disconnect current
        lastPostObserver.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPostsCount(postsCount => postsCount + 6)
            }
        })
        if (node) lastPostObserver.current.observe(node)

    },[isFetching, hasMore])

    return (
        <>
            <div className="feed-container">
                {posts.map((post: responsePost, idx: number) => {
                        return <Post key={post.id}
                        postId={post.id}
                        userId={post.userId}
                        userName={post.username}
                        avatar={post.avatar}
                        shopName={post.shopName}
                        shopId={post.shopId}
                        images={post.images}
                        comments={post.comments}
                        date={post.date}
                        text={post.text}
                        likes={post.likes}
                        didLike={post.didLike}
                        premium={post.premium}
                        lastPostRef={(posts.length === idx + 1) ? lastPostRef : undefined}
                        />
                }
                    )}
            </div>
           {isFetching && <Spinner />}
           {errorMessage && <div className="loading-container">
                    {errorMessage}
                </div>}
        </>
    )
}