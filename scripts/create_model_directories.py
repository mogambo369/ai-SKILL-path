import os

print("[v0] Creating directories for AI models and training data...")

# Create directories
directories = ['models', 'training_data']

for directory in directories:
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"[v0] Created directory: {directory}")
    else:
        print(f"[v0] Directory already exists: {directory}")

print("[v0] Directory setup complete!")
