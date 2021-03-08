# Project Structure

* /src/ -> source code of the project
    * ./main.js -> main entry off the application (MainProcress)
    * ./files.js -> handles the file read and write operations
    * ./preview.js -> handles the preview tab for editing the transcriptions
    * ./settings.js -> loading and configuring the users presets
    * ./transcription.js -> deals with formatting of the transcription and also synchronizes the transcriptions
    * ./data/ -> files that the application needs to save a users settings(./configs.json),logs(./logs/)and unexported projects(./projects).
    * ./static/ -> images, css, scss files
    * ./templates/ -> html documents for the project   

* /docs/ ->documentation about the project

* /assets/ -> these are the commonly used assests that the repository needs(logos and screenshots of the product)
