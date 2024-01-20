import getFormattedDate from "@/lib/getFormattedDate"
import { getSortedPostsData, getPostData } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"

export function generateStaticParams() {
    const blogs = getSortedPostsData()

    return blogs.map((post) => ({
        blogsId: post.id
    }))
}

export function generateMetadata({ params }: { params: { blogsId: string } }) {

    const blogs = getSortedPostsData()
    const { blogsId } = params
    const post = blogs.find(post => post.id === blogsId)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title,
    }
}

export default async function Post({ params }: { params: { blogsId: string } }) {

    const blogs = getSortedPostsData()
    console.log(blogs)
    const { blogsId } = params


    if (!blogs.find(post => post.id === blogsId)) notFound()

    const { title, date, contentHtml } = await getPostData(blogsId)

    const pubDate = getFormattedDate(date)

    return (
        <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto pt-24 pb-24">
            <h1 className="text-3xl mt-4 mb-0">{title}</h1>
            <p className="mt-0">
                {pubDate}
            </p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <p>
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main>
    )
}