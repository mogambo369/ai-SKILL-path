import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
import pickle
import json

print("[v0] Training skill assessment model...")

# Load training data
users_df = pd.read_csv('training_data/users.csv')
interactions_df = pd.read_csv('training_data/interactions.csv')
courses_df = pd.read_csv('training_data/courses.csv')

# Create skill assessment data
# For each user, predict their skill level based on course completions
skill_assessment_data = []

for _, user in users_df.iterrows():
    user_interactions = interactions_df[interactions_df['user_id'] == user['user_id']]
    
    if len(user_interactions) > 0:
        # Calculate user metrics
        avg_completion = user_interactions['completion_rate'].mean()
        courses_completed = len(user_interactions[user_interactions['completion_rate'] > 0.8])
        total_time_spent = user_interactions['time_spent_hours'].sum()
        avg_rating_given = user_interactions['rating'].mean() if user_interactions['rating'].notna().any() else 3.0
        
        # Get course difficulties completed
        completed_courses = user_interactions[user_interactions['completion_rate'] > 0.8]['course_id'].tolist()
        course_difficulties = []
        for course_id in completed_courses:
            course_info = courses_df[courses_df['course_id'] == course_id]
            if not course_info.empty:
                course_difficulties.append(course_info.iloc[0]['difficulty'])
        
        # Count difficulty levels
        beginner_count = course_difficulties.count('Beginner')
        intermediate_count = course_difficulties.count('Intermediate')
        advanced_count = course_difficulties.count('Advanced')
        
        # Determine actual skill level (target)
        if advanced_count >= 2 or (intermediate_count >= 3 and advanced_count >= 1):
            skill_level = 'Advanced'
        elif intermediate_count >= 2 or (beginner_count >= 3 and intermediate_count >= 1):
            skill_level = 'Intermediate'
        else:
            skill_level = 'Beginner'
        
        skill_assessment_data.append({
            'user_id': user['user_id'],
            'age': user['age'],
            'time_available_per_week': user['time_available_per_week'],
            'avg_completion_rate': avg_completion,
            'courses_completed': courses_completed,
            'total_time_spent': total_time_spent,
            'avg_rating_given': avg_rating_given,
            'beginner_courses': beginner_count,
            'intermediate_courses': intermediate_count,
            'advanced_courses': advanced_count,
            'predicted_skill_level': skill_level
        })

skill_df = pd.DataFrame(skill_assessment_data)
print(f"[v0] Created skill assessment dataset with {len(skill_df)} samples")

# Prepare features for skill level prediction
features = ['age', 'time_available_per_week', 'avg_completion_rate', 'courses_completed',
           'total_time_spent', 'avg_rating_given', 'beginner_courses', 
           'intermediate_courses', 'advanced_courses']

X = skill_df[features]
y = skill_df['predicted_skill_level']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Train Random Forest classifier
skill_model = RandomForestClassifier(n_estimators=100, random_state=42)
skill_model.fit(X_train, y_train)

# Evaluate model
train_accuracy = skill_model.score(X_train, y_train)
test_accuracy = skill_model.score(X_test, y_test)
y_pred = skill_model.predict(X_test)

print(f"[v0] Skill assessment model - Train Accuracy: {train_accuracy:.3f}, Test Accuracy: {test_accuracy:.3f}")
print("\n[v0] Classification Report:")
print(classification_report(y_test, y_pred))

# Feature importance
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': skill_model.feature_importances_
}).sort_values('importance', ascending=False)

print("\n[v0] Feature Importance:")
print(feature_importance)

# Save skill assessment model
skill_models = {
    'skill_model': skill_model,
    'feature_names': features,
    'skill_df': skill_df
}

with open('models/skill_assessment_model.pkl', 'wb') as f:
    pickle.dump(skill_models, f)

print("[v0] Skill assessment model saved successfully!")

# Test prediction
sample_user_features = X_test.iloc[0].values.reshape(1, -1)
predicted_skill = skill_model.predict(sample_user_features)[0]
predicted_proba = skill_model.predict_proba(sample_user_features)[0]
actual_skill = y_test.iloc[0]

print(f"\n[v0] Sample prediction:")
print(f"Actual: {actual_skill}, Predicted: {predicted_skill}")
print(f"Probabilities: {dict(zip(skill_model.classes_, predicted_proba))}")
