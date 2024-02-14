import Link from "next/link";
import { Tag } from "../types/questions";
import { Badge } from "./ui/badge";

type TagPillProps = {
  tag: Tag;
  showCount?: boolean;
};

export const TagPill = ({ tag: { _id: id, name, totalQuestions }, showCount }: TagPillProps) => (
  <Link href={`/tags/${id}`} className="flex justify-between gap-2">
    <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase ">
      {name}
    </Badge>

    {showCount && <p className="small-medium text-dark500_light700">{totalQuestions}</p>}
  </Link>
);
