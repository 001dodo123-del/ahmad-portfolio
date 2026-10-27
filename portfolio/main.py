"""M.Ahmad portfolio - run with:  python main.py   then open http://127.0.0.1:5000"""
from flask import Flask, render_template

# "public" is where Vercel serves static files from (Flask also serves it locally)
app = Flask(__name__, static_folder="public", static_url_path="")

# ---- EDIT YOUR DETAILS HERE -------------------------------------------------
CONFIG = {
    "name": "M.Ahmad",
    "initials": "MA",
    "location": "Lahore, Pakistan",
    "whatsapp_number": "923001234567",   # country code + number, digits only (no + or spaces)
    "whatsapp_message": "Hi M.Ahmad, I found your portfolio and would like to connect.",
    "instagram_username": "your_username",  # without the @
    "email": "",                          # e.g. "you@example.com" (leave "" to hide the email button)
    # Add a real "url" to a project once it is finished; otherwise it shows "Coming Soon".
    "projects": [
        {"title": "HTML/CSS Web Page", "tag_line": "Frontend Website",
         "desc": "A responsive static page built with HTML and CSS.",
         "tags": ["HTML", "CSS", "Responsive"], "url": ""},
        {"title": "Botpress Automation Bot", "tag_line": "Digital Design / AI Workflow",
         "desc": "A chatbot flow that answers common questions automatically.",
         "tags": ["Botpress", "Automation", "AI"], "url": ""},
        {"title": "Social Media Designs", "tag_line": "Digital Design",
         "desc": "Post designs and content planning for social media pages.",
         "tags": ["Post Design", "Social Media", "Prompt Writing"], "url": ""},
    ],
    # Videos live in public/media/ (file name without extension; needs a matching .mp4 and .jpg poster)
    "videos": [
        {"file": "saffron-leaf-website", "title": "Saffron & Leaf website", "desc": "Restaurant homepage walkthrough."},
        {"file": "apex-horizon-website", "title": "Apex Horizon website", "desc": "Business homepage walkthrough."},
        {"file": "brand-guideline", "title": "Brand guideline presentation", "desc": "Animated brand guideline slide."},
        {"file": "gaming-pc-presentation", "title": "Gaming PC presentation", "desc": "Product presentation design."},
        {"file": "sale-promo", "title": "End of season sale promo", "desc": "Short social media promo."},
    ],
}
# -----------------------------------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html", c=CONFIG)

if __name__ == "__main__":
    app.run(debug=True)
