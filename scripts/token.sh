PROJECT=shoppatracka
G_DIR=$HOME/.$PROJECT/google
cd code/$PROJECT

# Google
google_token="$G_DIR/token.json" \
google_secret="$G_DIR/secret.json" \
node helpers/google-new-token.js
