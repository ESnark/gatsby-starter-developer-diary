import React from "react"

import TechTag from "../tags/TechTag"

interface TechTagsProps {
    labels: {
        tag: string;
        tech: string;
        name: string;
        size: number;
        color: string;
    }[]
    posts: {
        node: {
            frontmatter: {
                tags: string[];
            }
        }
    }[]
}

const TechTags: React.FC<TechTagsProps> = (props) => {
    const labels = props.labels
    const posts = props.posts

    const labelCount: [string, number][] = labels.map(label => {
        let count = 0;
        posts.forEach(post => {
            if (post.node.frontmatter.tags.includes(label.tag)) {
                count = count + 1
            }
        })
        return [label.tag, count]
    })

    const categories = labelCount.filter(label => {
        return label[1] > 0
    })

    const tags = categories.map(category => {
        return category[0]
    })



    const getTechTags = (tags: string[]) => {
        const techTags: React.JSX.Element[] = []
        tags.forEach((tag, i) => {
            labels.forEach((label) => {
                if (tag === label.tag) {
                    techTags.push(<TechTag key={i} tag={label.tag} tech={label.tech} name={label.name} size={label.size} color={label.color} />)
                }
            })
        })
        return techTags
    }


    return (
        <>
            <h4>Tech Topics</h4>
            <div className="d-block">
                {getTechTags(tags)}
            </div>
        </>
    )
}


export default TechTags