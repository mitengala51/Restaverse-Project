import { reviewsType } from "@/type";
import { Star } from "lucide-react";
import Image from "next/image";
import { BsGoogle } from "react-icons/bs";
import { useMemo } from "react";

// Helper function to map rating strings to numbers
const getStarCount = (rating: string) => {
  const ratingMap: { [key: string]: number } = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
  };

  return ratingMap[rating.toLowerCase()] || 0;
};

interface ReviewCardProps {
  review: reviewsType;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const starCount = useMemo(() => getStarCount(review.starRating), [review.starRating]);
  const maxStars = 5;

  // Check if the review or reviewer data is missing
  if (!review || !review.reviewer || !review.reviewer.displayName) {
    return (
      <div className="w-full p-4 bg-gray-100 text-center text-gray-500">
        Error: Missing review data
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-gradient-to-r from-white to-gray-100 p-6 rounded-lg shadow-xl transition-all hover:shadow-2xl hover:scale-105 transform">
      {/* Reviewer Info */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/placeholder.jpg"
          alt={review.reviewer.displayName}
          width={80}
          height={80}
          className="rounded-full border-4 border-gray-200"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{review.reviewer.displayName}</h3>
          <p className="text-sm text-gray-500">{review.creatTime}</p>
        </div>
        <BsGoogle size={24} className="text-blue-500" />
      </div>

      {/* Review Content */}
      <p className="text-gray-600 text-base mb-4">{review.comment}</p>

      {/* Star Rating */}
      <div className="flex items-center justify-start gap-2">
        {[...Array(starCount)].map((_, index) => (
          <Star key={`filled-${index}`} className="text-yellow-500 animate-pulse" size={20} />
        ))}
        {[...Array(maxStars - starCount)].map((_, index) => (
          <Star key={`empty-${index}`} className="text-gray-300" size={20} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
