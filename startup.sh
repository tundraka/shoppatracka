PROJECT=shoppatracka
cd code/$PROJECT
pm2 stop $PROJECT
git pull

google_token='path/to/file' \
    google_secret='path/to/file' \
    google_calendarid='cal@id.id' \
    slack_token=token \
    forecastiokey=token \
    upsAccessKey=token \
    upsUserName=username \
    upsPassword='token' \
pm2 start ${PROJECT}.js
