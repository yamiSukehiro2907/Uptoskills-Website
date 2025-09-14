import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, User, Plus } from "lucide-react";

function MentorReview() {
  const [mentorReviews, setMentorReviews] = useState([
    {
      id: 1,
      mentor: "Dr. Reddy",
      feedback: "Excellent guidance for AI projects.",
      rating: 5,
    },
    {
      id: 2,
      mentor: "Ms. Sharma",
      feedback: "Resume Builder students had strong engagement.",
      rating: 4.8,
    },
    {
      id: 3,
      mentor: "Dr. Singh",
      feedback: "Provided insightful feedback on data projects.",
      rating: 4.5,
    },

    // Additional sample data
    {
      id: 4,
      mentor: "Mr. Patel",
      feedback: "Great mentorship on React and frontend best practices.",
      rating: 4.6,
    },
    {
      id: 5,
      mentor: "Ms. Kapoor",
      feedback: "Very patient and thorough during code reviews.",
      rating: 4.9,
    },
    {
      id: 6,
      mentor: "Dr. Verma",
      feedback: "Helped students optimize ML models effectively.",
      rating: 4.7,
    },
    {
      id: 7,
      mentor: "Prof. Iyer",
      feedback: "Excellent conceptual explanations and project direction.",
      rating: 4.4,
    },
    {
      id: 8,
      mentor: "Ms. Fernandes",
      feedback: "Strong domain expertise and practical assignment feedback.",
      rating: 4.3,
    },
  ]);

  const [newReviewMentor, setNewReviewMentor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState("");

  const addMentorReview = () => {
    if (newReviewMentor && newReviewText && newReviewRating !== "") {
      const newId =
        mentorReviews.length > 0
          ? Math.max(...mentorReviews.map((r) => r.id)) + 1
          : 1;
      const review = {
        id: newId,
        mentor: newReviewMentor,
        feedback: newReviewText,
        rating: parseFloat(newReviewRating),
      };
      setMentorReviews([...mentorReviews, review]);
      setNewReviewMentor("");
      setNewReviewText("");
      setNewReviewRating("");
    }
  };

  const renderStars = (rating) => {
    // rating may be float; mark star active if star <= Math.round(rating)
    const rounded = Math.round(rating);
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rounded ? "text-warning fill-warning" : "text-muted-foreground"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-foreground">{rating}</span>
      </div>
    );
  };

  return (
    <main className="p-4 sm:p-6 flex flex-col gap-6">
      <motion.h2
        className="text-2xl font-bold text-foreground mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Mentor Reviews
      </motion.h2>

      {/* Add Review Form */}
      <motion.div
        className="stat-card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold text-foreground mb-4">Add New Review</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Mentor Name
            </label>
            <input
              type="text"
              placeholder="Mentor Name"
              value={newReviewMentor}
              onChange={(e) => setNewReviewMentor(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Review Text
            </label>
            <input
              type="text"
              placeholder="Review Text"
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Rating (0-5)
            </label>
            <input
              type="number"
              placeholder="Rating (0-5)"
              value={newReviewRating}
              onChange={(e) => setNewReviewRating(e.target.value)}
              min="0"
              max="5"
              step="0.1"
              className="input-field"
            />
          </div>
        </div>
        <motion.button
          onClick={addMentorReview}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Add Review
        </motion.button>
      </motion.div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentorReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="stat-card p-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-accent">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground">{review.mentor}</h4>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-muted-foreground mt-1" />
              <p className="text-muted-foreground italic leading-relaxed">
                "{review.feedback}"
              </p>
            </div>

            <div className="flex items-center justify-between">
              {renderStars(review.rating)}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

export default MentorReview;
