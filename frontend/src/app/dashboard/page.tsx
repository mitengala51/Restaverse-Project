"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, ServerCrash } from "lucide-react";
import { reviewsType } from "@/type";
import ReviewCard from "@/components/ReviewCard";

const fetchReviews = async (): Promise<reviewsType[]> => {
  const { data } = await axios.get("http://127.0.0.1:8000/reviews/review");
  return data.reviews;
};


const useReviewsQuery = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000, 
    retry: 2, 
  });
};


const Loader = () => (
  <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
    <Loader2 className="animate-spin text-white" size={48} />
  </div>
);

const ErrorState = ({ error }: { error: Error }) => (
  <div className="flex flex-col items-center justify-center w-full h-screen space-y-6 p-6 bg-gradient-to-r from-red-400 to-red-600">
    <ServerCrash className="text-white" size={72} />
    <p className="text-xl text-white font-semibold">Something went wrong!</p>
    <p className="text-lg text-white">{error.message}</p>
  </div>
);

const NoReviews = () => (
  <div className="flex justify-center items-center w-full h-screen bg-gray-100">
    <p className="text-2xl font-semibold text-gray-600">No reviews found at the moment.</p>
  </div>
);

const ReviewsGrid = ({ reviews }: { reviews: reviewsType[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-12">
    {reviews.map((review) => (
      <ReviewCard key={review.reviewId} review={review} />
    ))}
  </div>
);

const DashboardPage = () => {
  const { data: reviews, isLoading, isError, error } = useReviewsQuery();

  if (isLoading) return <Loader />;
  if (isError && error instanceof Error) return <ErrorState error={error} />;
  if (!reviews || reviews.length === 0) return <NoReviews />;

  return <ReviewsGrid reviews={reviews} />;
};

export default DashboardPage;
