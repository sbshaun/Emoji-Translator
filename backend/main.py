from revChatGPT.V1 import Chatbot
from flask import *

app = Flask(__name__); 

# Access to ChatGPT
chatbot = Chatbot(config={
    "email":"ohmavihingsanon@gmail.com",
    "password":"ohmavihingsanon@gmail.com"
}) 

prev_text = ""


for data in chatbot.ask(
    "I want you to act as an emoji translator, I will provide you sentence that does not contain emojis, and it is your job to provide rewrite the sentence with suited emojis, You will keep the original text, and you may replace words with emojis if necessary, you may not change anything if no emoji is needed. Do not convert everything inito emojis, only add the minimum number amount of emojis if you connsider necessary and suit the context. You will only provide the translated sentence and nothing else, no explanations.",):
    message = data["message"][len(prev_text) :]

    prev_text = data["message"]

conversation_id = chatbot.get_conversations()[0]["id"]

@app.route('/', methods=['POST', 'GET'])
def index():

    if request.method == 'POST':
        if request.form['submit'] == 'Transalte':

            # Get a user input to ask chatGPT
            user_input = request.form['user_input']

            # Declare array to store all values from chatGPT
            test_arr = ""

            # test_arr.append()
            
            # Access to ChatGPT and Get a response from
            prev_text = ""
            for data in chatbot.ask(
                user_input, conversation_id
            ):

                message = data["message"][len(prev_text) :]
                test_arr += message 
                print(message, end="", flush=True)
                prev_text = data["message"] 

            # print("Hello!!!!" + test_arr)

            return render_template('index.html', test_arr = test_arr)

    else: 
        return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)