import React, { SVGProps } from "react";

type StreamlineLogosFacebookGamingLogoSolidProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function StreamlineLogosFacebookGamingLogoSolid(
  props: StreamlineLogosFacebookGamingLogoSolidProps,
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
      <path
        fill={props.color}
        fillRule="evenodd"
        d="M23 1v6.5H8v9h7.5V23H1V1zM9.5 9v6H17v8h6V9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default StreamlineLogosFacebookGamingLogoSolid;
