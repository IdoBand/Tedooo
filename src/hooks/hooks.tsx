export function convertDateString(dateString: string) {
    const date = +(new Date(dateString));
    const now = +(new Date());
    const secondsElapsed = Math.floor((now - date) / 1000);

    let result;
    if (secondsElapsed < 60) {
    result = `${secondsElapsed} seconds ago`;
    } else if (secondsElapsed < 3600) {
    const minutes = Math.floor(secondsElapsed / 60);
    result = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (secondsElapsed < 86400) {
    const hours = Math.floor(secondsElapsed / 3600);
    result = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
    const days = Math.floor(secondsElapsed / 86400);
    result = `${days} day${days > 1 ? 's' : ''} ago`;
    }
    return result
}

export async function reportIntersection(postId: string) {
    try {
        console.log('reporting intersection');
        const response = await fetch(`https://www.tedooo.com/?itemId=${postId}`)
        const result = await response.text()
    } catch (err) {
        console.log('There was a problem reporting', err);
    }
}
