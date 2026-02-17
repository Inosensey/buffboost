import React, { SVGProps } from "react";

type MakiFireStation11Props = SVGProps<SVGSVGElement> & {
  color: string;
  width?: string;
  height?: string;
};

export function MakiFireStation11(props: MakiFireStation11Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "1em"}
      height={props.height ? props.height : "1em"}
      viewBox="0 0 11 11"
      {...props}
    >
      {/* Icon from Maki by Mapbox - https://creativecommons.org/publicdomain/zero/1.0/ */}
      <path
        d="M5.5 0l-2 4L2 2c-.405.712-2 2.167-2 4c0 2.7 2.8 5 5.5 5S11 8.7 11 6c0-1.833-1.595-3.288-2-4L7.5 4l-2-4zm0 5.5s2 1.585 2 3c0 .611-.778 1.278-2 1.278s-2-.667-2-1.278c0-1.366 2-3 2-3z"
        fill={props.color}
      />
    </svg>
  );
}
export default MakiFireStation11;
