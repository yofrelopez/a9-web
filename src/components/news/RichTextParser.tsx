import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface Props {
    content: SerializedEditorState
    className?: string
}

export default function RichTextParser({ content, className = '' }: Props) {
    if (!content) return null

    return (
        <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
            <RichText
                data={content as SerializedEditorState}
            />
        </div>
    )
}
