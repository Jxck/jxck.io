curl -X POST 'https://api.jxck.io/translate' \
--header 'Authorization: DeepL-Auth-Key f08d4a50-6425-bd68-11ab-9d4049568e43' \
--header 'Content-Type: application/json' \
--data '{
  "text": [
    "Hello, world!"
  ],
  "target_lang": "JA"
}'