import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import styles from "./markdown-renderer.module.css";

type MarkdownRendererProps = {
	children: string;
};

function MarkdownRenderer({ children }: MarkdownRendererProps): ReactTypes.JSXElement {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={components}
		>
			{children}
		</ReactMarkdown>
	);
}

export default MarkdownRenderer;

// --- CONFIG ---

const components: Components = {
	table: ({ children }) => (
		<div className={styles["table-wrapper"]}>
			<table className={styles["table"]}>{children}</table>
		</div>
	),
	thead: ({ children }) => <thead className={styles["thead"]}>{children}</thead>,
	tbody: ({ children }) => <tbody>{children}</tbody>,
	tr: ({ children }) => <tr className={styles["tr"]}>{children}</tr>,
	th: ({ children }) => <th className={styles["th"]}>{children}</th>,
	td: ({ children }) => <td className={styles["td"]}>{children}</td>,
	p: ({ children }) => <p className={styles["paragraph"]}>{children}</p>,
	h1: ({ children }) => <h1 className={styles["heading1"]}>{children}</h1>,
	h2: ({ children }) => <h2 className={styles["heading2"]}>{children}</h2>,
	h3: ({ children }) => <h3 className={styles["heading3"]}>{children}</h3>,
	strong: ({ children }) => <strong className={styles["strong"]}>{children}</strong>,
	em: ({ children }) => <em className={styles["em"]}>{children}</em>,
	blockquote: ({ children }) => (
		<blockquote className={styles["blockquote"]}>{children}</blockquote>
	),
	ul: ({ children }) => <ul className={styles["ul"]}>{children}</ul>,
	ol: ({ children }) => <ol className={styles["ol"]}>{children}</ol>,
	li: ({ children }) => <li className={styles["li"]}>{children}</li>,
	code: ({ children }) => <code className={styles["code"]}>{children}</code>,
	pre: ({ children }) => <pre className={styles["pre"]}>{children}</pre>,
};
