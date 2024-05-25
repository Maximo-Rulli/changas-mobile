# Variables
REPO_URL="https://github.com/Maximo-Rulli/changas-actions"
TARGET_DIR="actions"

# Navigate to the main project directory
cd ..

# Push changes to the subtree repository
git subtree push --prefix=$TARGET_DIR  $REPO_URL main
