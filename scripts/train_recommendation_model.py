import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle
import json

print("[v0] Training course recommendation model...")

# Load training data
courses_df = pd.read_csv('training_data/courses.csv')
users_df = pd.read_csv('training_data/users.csv')
interactions_df = pd.read_csv('training_data/interactions.csv')

print(f"[v0] Loaded {len(courses_df)} courses, {len(users_df)} users, {len(interactions_df)} interactions")

# Prepare course features for content-based filtering
courses_df['skills_taught_str'] = courses_df['skills_taught'].apply(lambda x: ' '.join(eval(x)) if pd.notna(x) else '')
courses_df['category_difficulty'] = courses_df['category'] + '_' + courses_df['difficulty']

# Create TF-IDF vectors for course content
tfidf = TfidfVectorizer(max_features=100, stop_words='english')
course_features = tfidf.fit_transform(courses_df['skills_taught_str'] + ' ' + courses_df['category'])

# Calculate course similarity matrix
course_similarity = cosine_similarity(course_features)

# Prepare data for collaborative filtering
# Create user-course rating matrix
user_course_matrix = interactions_df.pivot_table(
    index='user_id', 
    columns='course_id', 
    values='rating', 
    fill_value=0
)

print(f"[v0] Created user-course matrix: {user_course_matrix.shape}")

# Train a model to predict course ratings
# Prepare features for rating prediction
rating_data = interactions_df.dropna(subset=['rating']).copy()

# Encode categorical variables
le_user = LabelEncoder()
le_course = LabelEncoder()
le_difficulty = LabelEncoder()
le_category = LabelEncoder()

# Merge with course data to get features
rating_data = rating_data.merge(courses_df[['course_id', 'category', 'difficulty', 'duration_hours', 'popularity_score']], on='course_id')
rating_data = rating_data.merge(users_df[['user_id', 'age', 'experience_level', 'time_available_per_week']], on='user_id')

# Encode features
rating_data['user_encoded'] = le_user.fit_transform(rating_data['user_id'])
rating_data['course_encoded'] = le_course.fit_transform(rating_data['course_id'])
rating_data['difficulty_encoded'] = le_difficulty.fit_transform(rating_data['difficulty'])
rating_data['category_encoded'] = le_category.fit_transform(rating_data['category'])
rating_data['experience_encoded'] = le_difficulty.fit_transform(rating_data['experience_level'])

# Prepare features and target
features = ['user_encoded', 'course_encoded', 'difficulty_encoded', 'category_encoded', 
           'duration_hours', 'popularity_score', 'age', 'experience_encoded', 'time_available_per_week']
X = rating_data[features]
y = rating_data['rating']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Evaluate model
train_score = rf_model.score(X_train, y_train)
test_score = rf_model.score(X_test, y_test)

print(f"[v0] Rating prediction model - Train R²: {train_score:.3f}, Test R²: {test_score:.3f}")

# Save models and encoders
models = {
    'rf_model': rf_model,
    'tfidf': tfidf,
    'course_similarity': course_similarity,
    'user_course_matrix': user_course_matrix,
    'le_user': le_user,
    'le_course': le_course,
    'le_difficulty': le_difficulty,
    'le_category': le_category,
    'courses_df': courses_df,
    'users_df': users_df
}

with open('models/recommendation_model.pkl', 'wb') as f:
    pickle.dump(models, f)

print("[v0] Recommendation model saved successfully!")

# Test the model with sample predictions
sample_user = rating_data.iloc[0]
sample_features = sample_user[features].values.reshape(1, -1)
predicted_rating = rf_model.predict(sample_features)[0]
actual_rating = sample_user['rating']

print(f"[v0] Sample prediction - Actual: {actual_rating}, Predicted: {predicted_rating:.2f}")
