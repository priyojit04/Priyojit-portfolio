# Priyojit Chowdhury — Developer Portfolio

A responsive, full-width, dark navy / neon-blue personal portfolio built with plain HTML, CSS and JavaScript. Includes an education timeline with WBJEE, Higher Secondary and Madhyamik details. The project includes the two photos supplied in the chat and has no package installation or build step.

## Run the website

### Option A — simplest
1. Extract the ZIP file.
2. Open the `Priyojit-Portfolio-EmailJS` folder.
3. Double-click `index.html` to open it in your browser.

### Option B — VS Code + Live Server
1. In VS Code choose **File → Open Folder** and select the extracted `Priyojit-Portfolio-EmailJS` folder.
2. Open `index.html` and choose **Open with Live Server**.
3. This project includes `.vscode/settings.json`, which sets Live Server to port **5501** so it does not reuse the old Smart Home Manager tab that was running on port 5500.
4. The address should look like `http://127.0.0.1:5501/`.

## Folder structure

```text
Priyojit-Portfolio-EmailJS/
├── index.html
├── style.css
├── script.js
├── README.md
├── EMAILJS-SETUP.md
├── .vscode/
│   └── settings.json
└── assets/
    ├── profile.jpg
    ├── about.jpg
    └── Priyojit-Chowdhury-CV.pdf  (add your CV here)
```

## Personalise before publishing

Your public contact details are already configured in `script.js`:

- Email: `priyojitchowdhury2001@gmail.com`
- GitHub: `https://github.com/priyojit04`
- LinkedIn: `https://www.linkedin.com/in/priyojit-chowdhury-506694252/`

The contact form sends messages directly from the website through EmailJS after you configure the EmailJS Public Key in `script.js` (the Service ID and Template ID are already filled in). Follow `EMAILJS-SETUP.md` to connect your inbox and create the matching template; visitors do not need to open an email app. The form does not store messages in a database. Instagram is optional and is left out until you provide a profile URL.

The hero section includes a **Download CV** button. To activate it, place your final PDF at `assets/Priyojit-Chowdhury-CV.pdf`. Once that file exists at this exact path, visitors who click the button will download it directly; no backend is required for a static portfolio. The button is already wired with the HTML `download` attribute.

The project cards are marked **In progress** or **Planned** where appropriate. Change their status and add GitHub / live-demo links only after the projects are genuinely built and tested.

## Typography system

All content uses one shared scale defined at the top of `style.css`:

- 12px — labels and metadata
- 14px — secondary text and tags
- 16px — body copy and paragraph text
- 18px — introductory copy
- 22px — card titles
- 32–48px — section headings (responsive)
- 52–76px — hero heading (responsive)

## Additional creative skills

- Online Art
- Canva
- Photo Editing
- Video Editing

## Education details included

- WBJEE 2023: GMR Rank 10,335; SC Category Rank 674
- Higher Secondary (WBCHSE), 2021: Bolpur N.N.B. High School — 78.6%
- Madhyamik (WBBSE), 2019: Bolpur High School — 66.86%
- B.Tech CSE: Government College of Engineering and Leather Technology, Kolkata — currently in 4th Year, 7th Semester

The page also includes responsive sizes for mobile, keyboard-friendly navigation, visible focus states, a reduced-motion fallback, theme toggle, scroll progress, typing text, background stars and scroll reveal animations.


## Download CV
The hero section has a **Download CV** button. The PDF is stored at `assets/Priyojit-Chowdhury-CV.pdf`; clicking the button downloads it directly.
