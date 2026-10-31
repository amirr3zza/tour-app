import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTourById, getAllTours } from "@/app/data/tours";
import TourDetailClient from "./tour-detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const tours = getAllTours();
  const paramsList: { id: string }[] = [];

  for (const tour of tours) {
    paramsList.push({ id: tour.id });
    if (tour.aliases) {
      for (const alias of tour.aliases) {
        paramsList.push({ id: alias });
      }
    }
  }

  return paramsList;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tour = getTourById(id);

  if (!tour) {
    return {
      title: "تور پیدا نشد | تور گیلان",
    };
  }

  return {
    title: `${tour.title} | رزرو آنلاین تور گیلان`,
    description: tour.highlight,
    openGraph: {
      title: tour.title,
      description: tour.highlight,
      images: [tour.imageUrl],
    },
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { id } = await params;
  const tour = getTourById(id);

  if (!tour) {
    notFound();
  }

  const relatedTours = getAllTours()
    .filter(
      (t) =>
        t.id !== tour.id &&
        (!tour.aliases || !tour.aliases.includes(t.id))
    )
    .slice(0, 3);

  return <TourDetailClient tour={tour} relatedTours={relatedTours} />;
}
