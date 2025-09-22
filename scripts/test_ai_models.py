import pickle
import pandas as pd
import numpy as np
import json

print("[v0] Testing AI models...")

# Load trained models
try:
    with open('models/recommendation_model.pkl', 'rb') as f:
        rec_models = pickle.load(f)
    print("[v0] ✓ Recommendation model loaded successfully")
except:
    print("[v0] ✗ Failed to load recommendation model")
    exit(1)

try:
    with open('models/skill_assessment_model.pkl', 'rb') as f:
        skill_models = pickle.load(f)
    print("[v0] ✓ Skill assessment model loaded successfully")
except:
    print("[v0] ✗ Failed to load skill assessment model")
    exit(1)

# Test recommendation system
def get_course_recommendations(user_id, top_n=5):
    """Get course recommendations for a user"""
    courses_df = rec_models['courses_df']
    rf_model = rec_models['rf_model']
    le_user = rec_models['le_user']
    le_course = rec_models['le_course']
    le_difficulty = rec_models['le_difficulty']
    le_category = rec_models['le_category']
    
    recommendations = []
    
    # Get user info
    users_df = rec_models['users_df']
    user_info = users_df[users_df['user_id'] == user_id]
    
    if user_info.empty:
        return []
    
    user_info = user_info.iloc[0]
    
    # Predict ratings for all courses
    for _, course in courses_df.iterrows():
        try:
            # Prepare features
            features = [
                le_user.transform([user_id])[0] if user_id in le_user.classes_ else 0,
                le_course.transform([course['course_id']])[0] if course['course_id'] in le_course.classes_ else 0,
                le_difficulty.transform([course['difficulty']])[0],
                le_category.transform([course['category']])[0],
                course['duration_hours'],
                course['popularity_score'],
                user_info['age'],
                le_difficulty.transform([user_info['experience_level']])[0],
                user_info['time_available_per_week']
            ]
            
            predicted_rating = rf_model.predict([features])[0]
            
            recommendations.append({
                'course_id': course['course_id'],
                'title': course['title'],
                'category': course['category'],
                'difficulty': course['difficulty'],
                'predicted_rating': predicted_rating
            })
        except:
            continue
    
    # Sort by predicted rating and return top N
    recommendations.sort(key=lambda x: x['predicted_rating'], reverse=True)
    return recommendations[:top_n]

# Test skill assessment
def assess_user_skill(user_metrics):
    """Assess user skill level based on learning metrics"""
    skill_model = skill_models['skill_model']
    feature_names = skill_models['feature_names']
    
    # Prepare features
    features = [user_metrics.get(feature, 0) for feature in feature_names]
    
    # Predict skill level
    predicted_skill = skill_model.predict([features])[0]
    probabilities = skill_model.predict_proba([features])[0]
    
    return {
        'predicted_skill': predicted_skill,
        'confidence': dict(zip(skill_model.classes_, probabilities))
    }

# Run tests
print("\n[v0] Testing recommendation system...")
sample_recommendations = get_course_recommendations('user_1', top_n=3)
print(f"Top 3 recommendations for user_1:")
for i, rec in enumerate(sample_recommendations, 1):
    print(f"{i}. {rec['title']} (Rating: {rec['predicted_rating']:.2f})")

print("\n[v0] Testing skill assessment...")
sample_metrics = {
    'age': 28,
    'time_available_per_week': 10,
    'avg_completion_rate': 0.85,
    'courses_completed': 5,
    'total_time_spent': 120,
    'avg_rating_given': 4.2,
    'beginner_courses': 2,
    'intermediate_courses': 3,
    'advanced_courses': 0
}

skill_assessment = assess_user_skill(sample_metrics)
print(f"Predicted skill level: {skill_assessment['predicted_skill']}")
print(f"Confidence scores: {skill_assessment['confidence']}")

print("\n[v0] AI models testing completed successfully! 🎉")
