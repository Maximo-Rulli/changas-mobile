# Variables
REPO_URL="https://github.com/Maximo-Rulli/changas-actions"
TARGET_DIR="actions"

# Navigate to the main project directory
cd ..

# Remove the existing content of the subfolder
rm -rf $TARGET_DIR

# Clone the updated subtree repository into the target subfolder
git clone $REPO_URL $TARGET_DIR

# Commit the changes
git add $TARGET_DIR
git commit -m "Updated actions from subtree"
