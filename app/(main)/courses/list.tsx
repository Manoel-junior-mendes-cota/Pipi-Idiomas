"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { type InferSelectModel } from "drizzle-orm";

import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";

import { Card } from "./card";

type CourseType = InferSelectModel<typeof courses>;
type UserProgressType = InferSelectModel<typeof userProgress>;

type Props = {
  courses: CourseType[];
  activeCourseId?: UserProgressType["activeCourseId"];
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(async () => {
      try {
        await upsertUserProgress(id);
      } catch (error) {
        // Ignora o erro do redirecionamento interno do Next.js
        if ((error as Error)?.message === "NEXT_REDIRECT") return;
        toast.error("Algo deu errado. Tente novamente.");
      }
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
