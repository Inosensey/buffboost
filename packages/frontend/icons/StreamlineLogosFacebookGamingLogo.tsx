import React, { SVGProps } from "react";

type StreamlineLogosFacebookGamingLogoProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function StreamlineLogosFacebookGamingLogo(
  props: StreamlineLogosFacebookGamingLogoProps,
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Logos free icons by Streamline - https://creativecommons.org/licenses/by/4.0/ */}
      <g fill="none" stroke={props.color} strokeLinejoin="round">
        <path d="M22.5 1.5h-21v21h13v-5h-8v-11h16z" />
        <path d="M9.5 14.5v-5h13v13h-5v-8z" />
      </g>
    </svg>
  );
}
export default StreamlineLogosFacebookGamingLogo;
