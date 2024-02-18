import { Button } from "@/shared/ui/button";
import Link from "next/link";

type NoResultProps = {
  text?: string;
  backButtonHref?: string;
  backButtonText?: string;
};

const NoResult = ({
  text,
  backButtonHref = "/",
  backButtonText = "Back to main page",
}: NoResultProps) => (
  <div className="mt-10 flex w-full flex-col items-center">
    {text && <h2 className="h2-semibold text-dark200_light900">{text}</h2>}

    <Link href={backButtonHref}>
      <Button className="paragraph-medium mt-5 min-h-[46px] bg-primary-500 px-4 py-3 text-primary-100">
        {backButtonText}
      </Button>
    </Link>
  </div>
);

export default NoResult;
