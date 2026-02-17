import React, { SVGProps } from "react";

type SolarLoginBoldDuotoneProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function SolarLoginBoldDuotone(props: SolarLoginBoldDuotoneProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
      <path
        fill={props.color}
        fillRule="evenodd"
        d="M10.47 8.47a.75.75 0 0 0 0 1.06l1.72 1.72H4a.75.75 0 0 0 0 1.5h8.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0"
        clipRule="evenodd"
      />
      <path fill={props.color} d="M12 20a8 8 0 1 0 0-16z" opacity=".5" />
    </svg>
  );
}
export default SolarLoginBoldDuotone;
