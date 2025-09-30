"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
  const blogInfo = Object.fromEntries(data.entries());

  const modifiedData = {
  title: blogInfo.title,
  contsnt: blogInfo.contsnt,  
  thumbnail: blogInfo.thumbnail,
  tags: blogInfo.tags
    .toString()
    .split(",")
    .map((tag) => tag.trim()),
  authorId: 1,
  idfeatured: blogInfo.isFeatured === "true",  
};

  console.log("Sending to backend:", modifiedData);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const text = await res.text();
  console.log("Backend response text:", text);

  if (!res.ok) {
    console.error("Failed to create blog:", text);
    throw new Error("Blog creation failed");
  }

  const result = JSON.parse(text);

  if (res.ok) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs");
    redirect("/");
  }

  return result;
};
