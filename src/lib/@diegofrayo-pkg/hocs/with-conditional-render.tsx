import type ReactTypes from "../types/react";

type ConditionalRenderComponent<ComponentProps> = (
	callback: () => boolean,
) => ReactTypes.FunctionComponent<ComponentProps>;

function withConditionalRender<ComponentProps extends object>(
	WrappedComponent: ReactTypes.FunctionComponent<ComponentProps>,
): ConditionalRenderComponent<ComponentProps> {
	const ConditionalRenderComponent: ConditionalRenderComponent<ComponentProps> =
		function withConditionalRenderReturn(callback) {
			function RenderIfComponent(props: ComponentProps): ReactTypes.JSXElementNullable {
				const shouldRender = callback();

				if (!shouldRender) return null;

				return <WrappedComponent {...props} />;
			}

			RenderIfComponent.displayName = `withConditionalRender(${
				WrappedComponent.displayName || WrappedComponent.name || "Component"
			})`;

			return RenderIfComponent;
		};

	return ConditionalRenderComponent;
}

export default withConditionalRender;
