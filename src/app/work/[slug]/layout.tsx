import { Metadata } from "next";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // Await the params
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return {
      title: "Project Not Found | ZEYNO",
    };
  }

  return {
    title: `${project.title} | Case Study | ZEYNO`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | ZEYNO Case Study`,
      description: project.tagline,
      type: "article",
      url: `https://zeyno.my/work/${slug}`,
      images: [
        {
          url: "/icon.jpeg",
          width: 800,
          height: 600,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ZEYNO Case Study`,
      description: project.tagline,
      images: ["/icon.jpeg"],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
