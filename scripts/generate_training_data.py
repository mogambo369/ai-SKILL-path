import pandas as pd
import numpy as np
import json
from datetime import datetime, timedelta
import random

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

print("[v0] Generating training data for AI models...")

# Define course categories and skills
course_categories = [
    'Web Development', 'Data Science', 'Machine Learning', 'Mobile Development',
    'DevOps', 'Cybersecurity', 'UI/UX Design', 'Cloud Computing', 'Blockchain',
    'Game Development', 'Database Management', 'Software Engineering'
]

skills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Machine Learning',
    'Data Analysis', 'AWS', 'Docker', 'Git', 'HTML/CSS', 'TypeScript',
    'MongoDB', 'PostgreSQL', 'TensorFlow', 'Pandas', 'NumPy', 'Kubernetes',
    'Linux', 'Java', 'C++', 'Swift', 'Kotlin', 'Vue.js', 'Angular'
]

# Generate dummy courses data
courses_data = []
for i in range(200):
    course = {
        'course_id': f'course_{i+1}',
        'title': f'Course {i+1}: {random.choice(course_categories)} Fundamentals',
        'category': random.choice(course_categories),
        'difficulty': random.choice(['Beginner', 'Intermediate', 'Advanced']),
        'duration_hours': random.randint(5, 50),
        'rating': round(random.uniform(3.5, 5.0), 1),
        'skills_taught': random.sample(skills, random.randint(2, 5)),
        'prerequisites': random.sample(skills, random.randint(0, 3)),
        'popularity_score': random.randint(1, 100)
    }
    courses_data.append(course)

# Generate dummy users data
users_data = []
for i in range(1000):
    user = {
        'user_id': f'user_{i+1}',
        'age': random.randint(18, 65),
        'experience_level': random.choice(['Beginner', 'Intermediate', 'Advanced']),
        'current_skills': random.sample(skills, random.randint(1, 8)),
        'learning_goals': random.sample(course_categories, random.randint(1, 3)),
        'time_available_per_week': random.randint(2, 20),
        'preferred_difficulty': random.choice(['Beginner', 'Intermediate', 'Advanced'])
    }
    users_data.append(user)

# Generate user-course interactions
interactions_data = []
for i in range(5000):
    user = random.choice(users_data)
    course = random.choice(courses_data)
    
    # Simulate realistic interaction patterns
    completion_rate = random.uniform(0.1, 1.0)
    if course['difficulty'] == user['preferred_difficulty']:
        completion_rate *= 1.2  # Higher completion for preferred difficulty
    
    interaction = {
        'user_id': user['user_id'],
        'course_id': course['course_id'],
        'enrolled_date': (datetime.now() - timedelta(days=random.randint(1, 365))).isoformat(),
        'completion_rate': min(completion_rate, 1.0),
        'rating': random.randint(1, 5) if completion_rate > 0.3 else None,
        'time_spent_hours': course['duration_hours'] * completion_rate * random.uniform(0.8, 1.2)
    }
    interactions_data.append(interaction)

# Save data to JSON files
with open('training_data/courses.json', 'w') as f:
    json.dump(courses_data, f, indent=2)

with open('training_data/users.json', 'w') as f:
    json.dump(users_data, f, indent=2)

with open('training_data/interactions.json', 'w') as f:
    json.dump(interactions_data, f, indent=2)

# Create DataFrames for ML training
courses_df = pd.DataFrame(courses_data)
users_df = pd.DataFrame(users_data)
interactions_df = pd.DataFrame(interactions_data)

# Save as CSV for easier ML processing
courses_df.to_csv('training_data/courses.csv', index=False)
users_df.to_csv('training_data/users.csv', index=False)
interactions_df.to_csv('training_data/interactions.csv', index=False)

print(f"[v0] Generated {len(courses_data)} courses, {len(users_data)} users, and {len(interactions_data)} interactions")
print("[v0] Training data saved to training_data/ directory")
