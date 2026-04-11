import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import styles from "./markdown-renderer.module.css";

type MarkdownRendererProps = {
	children: string;
};

function MarkdownRenderer({ children }: MarkdownRendererProps) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				table: ({ children: c }) => (
					<div className={styles["table-wrapper"]}>
						<table className={styles["table"]}>{c}</table>
					</div>
				),
				thead: ({ children: c }) => <thead className={styles["thead"]}>{c}</thead>,
				tbody: ({ children: c }) => <tbody>{c}</tbody>,
				tr: ({ children: c }) => <tr className={styles["tr"]}>{c}</tr>,
				th: ({ children: c }) => <th className={styles["th"]}>{c}</th>,
				td: ({ children: c }) => <td className={styles["td"]}>{c}</td>,
				p: ({ children: c }) => <p className={styles["paragraph"]}>{c}</p>,
				h1: ({ children: c }) => <h1 className={styles["heading1"]}>{c}</h1>,
				h2: ({ children: c }) => <h2 className={styles["heading2"]}>{c}</h2>,
				h3: ({ children: c }) => <h3 className={styles["heading3"]}>{c}</h3>,
				strong: ({ children: c }) => <strong className={styles["strong"]}>{c}</strong>,
				em: ({ children: c }) => <em className={styles["em"]}>{c}</em>,
				blockquote: ({ children: c }) => (
					<blockquote className={styles["blockquote"]}>{c}</blockquote>
				),
				ul: ({ children: c }) => <ul className={styles["ul"]}>{c}</ul>,
				ol: ({ children: c }) => <ol className={styles["ol"]}>{c}</ol>,
				li: ({ children: c }) => <li className={styles["li"]}>{c}</li>,
				code: ({ children: c }) => <code className={styles["code"]}>{c}</code>,
				pre: ({ children: c }) => <pre className={styles["pre"]}>{c}</pre>,
			}}
		>
			{children}
		</ReactMarkdown>
	);
}

export default MarkdownRenderer;
