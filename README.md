# 🎵 Song Scraper - Selenium-based MP3 Download Automation

This project is a Python-based automation tool that scrapes and downloads Bollywood MP3 songs from [downloadming.ws](https://downloadming.ws). It uses Selenium to navigate pages, collect song links, and trigger downloads directly.

---

## 🗂️ Project Structure

```
Keenjal_Bhai/
├── all_music_links.txt       # File containing extracted song page URLs
├── helpers.js                # JavaScript helper functions (optional)
├── samepleJsCode.js          # Sample JavaScript code for experimentation
├── selenium_dnms.py          # Main Selenium scraping script
├── package.json              # Node package setup (optional, for JS code)
├── package-lock.json         # Node dependency lock (optional)
├── requirements.txt          # Python requirements
```

---

## 🚀 Features

- 💾 Automatically downloads individual songs (ignores ZIP links)
- 🧠 Skips alert popups and handles download confirmations
- 🛠️ Configured to work with Chrome (via `chromedriver`)
- 🧹 Modular and extendable for batch scraping

---

## 🧰 Requirements

- Python 3.x
- Google Chrome
- `chromedriver` (place it in `../testing/chromedriver` as per script)

Install Python dependencies:

```bash
pip install -r requirements.txt
```

---

## 🧪 How It Works

1. **Phase 1 (Optional)**: Collects all music page links from the Bollywood category.
2. **Phase 2**: Opens each music page from `all_music_links.txt` and clicks on every downloadable track link (ignoring the "Download All Songs (Zip File)" option).

All files are saved to the default download directory configured in the script.

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up ChromeDriver

Download and place the appropriate `chromedriver` binary inside the `../testing/` directory relative to the script.

You can get it from: https://sites.google.com/a/chromium.org/chromedriver/

### 3. Run the Script

```bash
python selenium_dnms.py
```

---

## ⚙️ Configuration

Edit the following in `selenium_dnms.py` if needed:

```python
download_directory = "/home/pragnakalpl40/Downloads/1/"
driver = webdriver.Chrome(executable_path="../testing/chromedriver", options=chrome_options)
```

---

## ⚠️ Disclaimer

This project is for educational purposes only. Download content responsibly and only from sites that allow it.

---

## 🧑‍💻 Author

**Deep Patel**  
👨‍💻 GitHub: [PatelDeepB](https://github.com/PatelDeepB)  
📬 Email: deepbpatel9898@gmail.com
