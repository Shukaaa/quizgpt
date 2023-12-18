🧐 quizgpt 🧐

![Logo](src/assets/icon.png)

> First thing first, this is a just for fun project. It's not meant to be as polished and as good as a real game and may have some bugs or stupid code. I'm not a professional developer, and I'm still learning. I'm open to any suggestions, improvements and feedback.

## Description

This is a simple quiz game that uses the OpenAI API to generate questions and answers using the ChatGPT models. The game is played by a user who can choose any topic they want. The user must select the correct answer to score a point. The game ends when the user selects an incorrect answer.

## Installation

You can install the project by cloning the repository and installing the dependencies or by using the Docker image.

### Cloning the repository

1. Clone the repository

```bash
git clone https://github.com/Shukaaa/quizgpt.git
```

2. Install the dependencies

```bash
npm install
```

3. Run the project

```bash
npm start
```

### Using the Docker image

```bash
docker run -d -p 4200:80 --name quiz-gpt shukaaa/quizzgpt:latest
```

## Usage

1. Open the browser and go to http://localhost:4200
2. Enter a topic
3. Choose your ChatGPT model
4. Put in your API key (You can get one from https://platform.openai.com/api-keys)
5. Click on the "Start" button

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
