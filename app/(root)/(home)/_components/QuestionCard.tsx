import { TagPill } from "@/shared/components/TagPill";
import { Question } from "@/shared/types/questions";
import Image from "next/image";
import Link from "next/link";
import IconInfo from "./IconInfo";

export const QuestionCard = ({ _id, title, tags, author, publishedAt, statistics }: Question) => (
  <div className="card-wrapper light-border flex flex-col gap-4 rounded-lg  border p-8">
    <div>
      <Link href={`/questions/${_id}`}>
        <h3 className="h3-semibold text-dark200_light900 line-clamp-1 flex-1">{title}</h3>
      </Link>

      {/* edit/delete actions */}
    </div>

    <div className="flex flex-wrap gap-4">
      {tags?.map((tag) => <TagPill key={tag._id} tag={tag} />)}
    </div>

    <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p className="body-medium flex gap-1">
        <Link href={`/profile/${author._id}`} className="flex items-center gap-1">
          <Image
            src={author.avatar}
            alt="author avatar"
            width={16}
            height={16}
            className="rounded-full object-contain"
          />
          {author.name}
        </Link>
        <span>•</span>
        <span className="body-medium text-dark400_light700">asked {publishedAt.toISOString()}</span>
      </p>

      <div className="flex gap-3">
        <IconInfo iconUrl="/assets/icons/thumbs-up.svg" content={statistics.views} />
        <IconInfo iconUrl="/assets/icons/thumbs-up.svg" content={statistics.answers} />
        <IconInfo iconUrl="/assets/icons/thumbs-up.svg" content={statistics.votes} />
      </div>
    </div>
  </div>
);
