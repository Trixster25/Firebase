import tkinter as tk
from tkinter import PhotoImage, messagebox
from PIL import Image, ImageTk
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin
cred = credentials.Certificate("public/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def update_feedback_count(feedback_type):
    doc_ref = db.collection('feedback').document('stats')
    doc = doc_ref.get()
    if doc.exists:
        current_data = doc.to_dict()
        if feedback_type in current_data:
            current_data[feedback_type] += 1
        else:
            current_data[feedback_type] = 1
        doc_ref.set(current_data)
    else:
        doc_ref.set({feedback_type: 1})

def handle_satisfied():
    update_feedback_count('satisfied')
    messagebox.showinfo("Feedback", "Thank you for your feedback!")
    root.after(1000, go_back)

def handle_unsatisfied():
    update_feedback_count('unsatisfied')
    messagebox.showinfo("Feedback", "Thank you for your feedback!")
    root.after(1000, go_back)

# def go_back():
#     root.destroy()
#     os.system(r'python "C:/Users/loren/Music/Codes/New Back-up/Others/Landing page GUI.py"')

# Create the main window
root = tk.Tk()
root.title("Evaluation Program")
root.geometry("1920x1080")  # Full HD resolution
root.configure(bg="medium sea green")

# Title label
title_label = tk.Label(root, text="Please rate your Experience", bg="medium sea green", fg="white", font=("Arial", 48, "bold"))
title_label.pack(pady=40)

# Load and resize images using Pillow
satisfied_img_path = "C:/Users/loren/Music/Codes/New Back-up/Others/Satisfied.png"
unsatisfied_img_path = "C:/Users/loren/Music/Codes/New Back-up/Others/Unsatisfied.png"

satisfied_img = Image.open(satisfied_img_path)
unsatisfied_img = Image.open(unsatisfied_img_path)

# Resize images to be larger
satisfied_img = satisfied_img.resize((400, 400), Image.LANCZOS)
unsatisfied_img = unsatisfied_img.resize((400, 400), Image.LANCZOS)

# Convert images to PhotoImage
satisfied_img_tk = ImageTk.PhotoImage(satisfied_img)
unsatisfied_img_tk = ImageTk.PhotoImage(unsatisfied_img)

# Create a frame to hold the buttons
button_frame = tk.Frame(root, bg="medium sea green")
button_frame.pack(expand=True, fill="both", pady=50)

# Create the "Satisfied" button with image and text
satisfied_button = tk.Button(button_frame, image=satisfied_img_tk, text="Satisfied", compound=tk.TOP, bg="medium sea green", bd=0, command=handle_satisfied, font=("Arial", 36, "bold"))
satisfied_button.grid(row=0, column=0, padx=50, pady=20)
satisfied_button.image = satisfied_img_tk  # Keep a reference to avoid garbage collection

# Create the "Unsatisfied" button with image and text
unsatisfied_button = tk.Button(button_frame, image=unsatisfied_img_tk, text="Unsatisfied", compound=tk.TOP, bg="medium sea green", bd=0, command=handle_unsatisfied, font=("Arial", 36, "bold"))
unsatisfied_button.grid(row=0, column=1, padx=50, pady=20)
unsatisfied_button.image = unsatisfied_img_tk  # Keep a reference to avoid garbage collection

# Center the buttons in the frame
button_frame.columnconfigure(0, weight=1)
button_frame.columnconfigure(1, weight=1)
button_frame.rowconfigure(0, weight=1)

root.mainloop()