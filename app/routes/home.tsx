import { IndexPage } from "../index";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Humbly Read" }];
}

export default function Home() {
  return <IndexPage />;
}
