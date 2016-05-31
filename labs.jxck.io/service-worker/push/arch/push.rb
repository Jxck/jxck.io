#!/usr/bin/env ruby

API_KEY = ""
GCM_ENDPOINT = "https://android.googleapis.com/gcm/send/"
REGISTRATION_IDS = "APA91bGlFtoaTI2C8uXVgtJ15dX9taT6MyQj2SaKlmFIcWCRlLOEAmf2IROvHJB_gUCe8bauBryCFC9yMOxX7P2J6nOmampisCt3rxE6HC0AVMnenNV7Ys9LlShiyUs2LKpIpLMeEZ6R"
puts('curl --header "Authorization: key=' + API_KEY + '" --header Content-Type:"application/json" ' + GCM_ENDPOINT + ' -d "{\\"registration_ids\\":[\\"' + REGISTRATION_IDS + '\\"]}"')
