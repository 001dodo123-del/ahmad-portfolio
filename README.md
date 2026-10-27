# M.Ahmad Portfolio (single-page homepage)

Structure
  main.py                 Flask server + all editable details (CONFIG)
  templates/index.html    Page markup
  static/css/style.css    Styles, palette, aurora, marquee
  static/js/script.js     WhatsApp/Instagram links, nav, rotating text

Run in VS Code terminal
  pip install -r requirements.txt
  python main.py
  open http://127.0.0.1:5000

Edit
  Name, WhatsApp number, Instagram username, email, projects: CONFIG at the top of main.py
  WhatsApp number format: country code + number, digits only (Pakistan example: 923001234567)
  Colors (black, white, blue): the :root block at the top of static/css/style.css
