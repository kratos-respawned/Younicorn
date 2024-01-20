import getFormattedDate from "@/lib/getFormattedDate"
import Link from "next/link"
import path from "path"
import { readFileSync } from "fs"
import matter from "gray-matter"
import { remark } from "remark"
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'docs')
export default async function Post() {

        const fullPath = path.join(postsDirectory, `dummy.md`);
        const fileContents = readFileSync(fullPath, 'utf8');
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
    
        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
    
        const contentHtml = processedContent.toString();
    
        const blogPostWithHTML: BlogPost & { contentHtml: string } = {
            id: matterResult.data.id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            contentHtml,
        }
    

    const pubDate = getFormattedDate(blogPostWithHTML.date)

    return (
        <main className="prose prose-xl prose-slate dark:prose-invert mx-auto pt-28 pb-28">
            <h1 className="text-3xl mt-4 mb-0">{blogPostWithHTML.title}</h1>
            <p className="mt-0">
                {pubDate}
            </p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: blogPostWithHTML.contentHtml }} />
                <p>
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main>
    )
}