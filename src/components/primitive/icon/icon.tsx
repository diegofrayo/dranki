import { Icons, type IconName } from "./icons";

type Props = {
	name: IconName;
	size?: number;
	className?: string;
};

function Icon({ name, size = 20, className }: Props) {
	const Component = Icons[name];

	if (!Component) return null;

	return (
		<Component
			size={size}
			className={className}
		/>
	);
}

export default Icon;
