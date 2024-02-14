import { cn } from "@/shared/lib/utils";
import { Option } from "@/shared/types/filters";
import Image from "next/image";

type IconInfoProps = {
  href?: string;
  iconUrl: string;
  content: Option;
};

const IconInfo = ({ iconUrl, href, content }: IconInfoProps) => {
  return (
    <div className="flex gap-1">
      <Image
        src={iconUrl}
        alt=""
        width={12}
        height={12}
        className={cn("invert-colors object-contain", href && "rounded-full")}
      />

      <p className="small-medium text-dark400_light800">{content.name}</p>

      <p className="small-medium text-dark400_light800">{content.value}</p>
    </div>
  );
};

export default IconInfo;
