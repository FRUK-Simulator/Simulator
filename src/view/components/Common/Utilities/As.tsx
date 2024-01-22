import { FunctionComponent } from "react";

export type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Utility component to render children under a specific html tag.
 *
 * @param props props
 * @param props.className the className for the node
 * @param props.as the element to render the children under
 */
export const As: FunctionComponent<{
  className?: string;
  as: Headings;
}> = ({ children, as, className = "" }) => {
  const renderMap: Record<typeof as, FunctionComponent> = {
    h1: () => <h1 className={className}>{children}</h1>,
    h2: () => <h2 className={className}>{children}</h2>,
    h3: () => <h3 className={className}>{children}</h3>,
    h4: () => <h4 className={className}>{children}</h4>,
    h5: () => <h5 className={className}>{children}</h5>,
    h6: () => <h6 className={className}>{children}</h6>,
  };

  const Component = renderMap[as];

  return <Component />;
};
