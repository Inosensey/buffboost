import React, { SVGProps } from "react";

type StreamlineLogosFacebookGamingLogoBlockProps = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function StreamlineLogosFacebookGamingLogoBlock(
  props: StreamlineLogosFacebookGamingLogoBlockProps,
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
        d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm14.5 7.932V4.5h-15v15h9.886v-4.432H9.273V8.932zm-9.205 5.114V9.955H19.5V19.5h-4.091v-5.454z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default StreamlineLogosFacebookGamingLogoBlock;
