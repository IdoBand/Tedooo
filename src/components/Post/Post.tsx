import { useState, useCallback, useRef } from "react"
import { convertDateString, reportIntersection } from '../../hooks/hooks'
import { likeSvg, commentSvg } from "../../assets/svgContainer"
interface PostComponentProps {
    postId: string
    userId: string
    userName: string
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
    lastPostRef?: any
}

export default function Post({postId, userId, userName, avatar, shopName, shopId, images, comments, date, text, likes, didLike, premium, lastPostRef}: PostComponentProps) {
    const [totalLikes, setTotalLikes] = useState<number>(likes)
    const [likedByUser, setLikedByUser] = useState<boolean>(didLike)

    function handleLikeClick() {
        setLikedByUser((likedByUser) => !likedByUser)
        setTotalLikes((totalLikes) => (likedByUser? totalLikes - 1 : totalLikes + 1))
    }

    const postRefObserver = useRef<IntersectionObserver | null>(null)
    const postIntersectionRef = useCallback(
      (node: HTMLDivElement) => {
        postRefObserver.current = new IntersectionObserver(
          async (entries) => {
            if (entries[0].isIntersecting) {
                console.log(`${postId} is visible`)
                await reportIntersection(postId)
            }
          },
        )
        if (node) postRefObserver.current.observe(node)
      },
      []
    )
    const buttonClassName = likedByUser ? 'like-comment-buttons-active':'like-comment-buttons'

    return (
        <>
            <div className="post-container" ref={lastPostRef}>
                <div className="post-header">
                    <img className="post-avatar" src={avatar} />
                    <div className="user-shop-time-container">
                        <div className="user-name">{userName}</div>
                        <div className="shop-name-time">
                            <div className="shop-name">{shopName}</div>
                            <div className="time">{convertDateString(date)}</div>
                        </div>
                        </div>
                    </div>
                <div className="post-text-container" ref={postIntersectionRef}>
                    {text}
                </div>
                <div className="images-background">
                        {images.length === 1 &&
                        <div className="single-image-container">
                            <img className="post-image" src={images[0]} />
                        </div>
                        }
                        {images.length === 2 &&
                            <div className="double-image-container">
                                <img className="post-image" src={images[0]} />
                                <img className="post-image" src={images[1]} />
                            </div>
                        }
                </div>
                <div className="total-likes-comments-container">
                    <div className="total-likes">{totalLikes} Likes</div>
                    <div className="total-comments">{comments} Comments</div>
                </div>
                <div className="like-comment-buttons-container">
                    
                    <button className={buttonClassName} 
                            id="like-button" 
                            onClick={handleLikeClick}>{likeSvg(buttonClassName)}Like</button>
                    <button className={buttonClassName}
                            id="comment-button">{commentSvg(buttonClassName)}Comment</button>
                </div>
            </div>
        </>
    )
}