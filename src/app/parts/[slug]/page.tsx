import { redirect } from "next/navigation";

export default async function ProductPage(props: PageProps<"/parts/[slug]">) {
  await props.params;
  redirect("/parts");
}
