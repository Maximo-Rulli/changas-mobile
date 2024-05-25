# Variables
REPO_URL="https://github.com/Maximo-Rulli/changas-actions"
TARGET_DIR="actions"

# Navigate to the main project directory
cd ..

# Remove the existing content of the subfolder
rm -rf $TARGET_DIR

# The only way to update is to copy the subtree again
git subtree add --prefix=$TARGET_DIR  $REPO_URL main --squash

# Commit the changes
git add $TARGET_DIR
git commit -m "Updated actions from subtree"
