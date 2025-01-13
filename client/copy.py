import pyperclip

def copy_file_to_clipboard(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()
            pyperclip.copy(content)
            print("File content copied to clipboard!")
    except Exception as e:
        print("Error:", e)

# Example usage
copy_file_to_clipboard("src/pages/ChatBot.jsx")
