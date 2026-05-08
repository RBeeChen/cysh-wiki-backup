import os
import sys
import argparse
import urllib.parse
import re
import shutil
import cloudscraper
from bs4 import BeautifulSoup
from markdownify import markdownify as md

SOURCE_DIR = "backup_cysh.cywiki.win"
OUTPUT_DIR = "docs"
WIKI_BASE_URL = "https://cysh.cywiki.win"

def escape_mdx(text):
    text = text.replace('{', '&#123;').replace('}', '&#125;')
    text = text.replace('<', '&lt;').replace('>', '&gt;')
    text = text.replace('$', '&#36;')
    text = re.sub(r'!\[.*?\]\(\s*#.*?\)', '', text)
    text = re.sub(r'!\[.*?\]\(\s*\.?/\s*\)', '', text)
    text = re.sub(r'\[(.*?)\]\(\s*\.?/\s*\)', r'\1', text)
    return text

def fix_wiki_elements(soup):
    for a in soup.find_all("a", href=True):
        href = a['href']
        if href.startswith('#'):
            continue
        if "index.php/" in href:
            new_href = href.split("index.php/")[-1]
            try:
                new_href = urllib.parse.unquote(new_href)
            except:
                pass
            new_href = new_href.strip().rstrip('/')
            if not new_href or new_href in [".", "./", "/"]:
                a.replace_with(a.get_text())
            else:
                a['href'] = new_href
        elif href.strip() in [".", "./", "/", ""]:
            a.replace_with(a.get_text())
    for a in soup.find_all("a"):
        if not a.get_text(strip=True):
            a.decompose()
    for img in soup.find_all("img"):
        img.decompose()

def html_to_markdown(html_content, title):
    soup = BeautifulSoup(html_content, "html.parser")
    main_content = (
        soup.find(id="mw-content-text")
        or soup.find(class_="mw-parser-output")
        or soup.find("body")
    )
    if not main_content:
        return None
    for el in main_content.find_all(class_=[
        "mw-editsection", "toc", "navbox",
        "catlinks", "printfooter", "mw-jump-link"
    ]):
        el.decompose()
    fix_wiki_elements(main_content)
    markdown_text = md(str(main_content), heading_style="ATX")
    markdown_text = escape_mdx(markdown_text)
    return f"---\ntitle: {title}\n---\n\n{markdown_text}"

def safe_filename(title):
    safe = title.replace("/", "_").replace(":", "_").replace("\\", "_")
    return safe

def run_overwrite_only():
    if not os.path.exists(SOURCE_DIR):
        print(f"❌ 找不到來源資料夾: {SOURCE_DIR}")
        sys.exit(1)
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    existing_docs = set()
    for f in os.listdir(OUTPUT_DIR):
        if f.endswith(".md"):
            existing_docs.add(os.path.splitext(f)[0])
    print(f"📂 目前 docs/ 中有 {len(existing_docs)} 個條目")
    print(f"🔄 模式：overwrite-only（只覆蓋已存在的檔案）")
    updated = 0
    skipped = 0
    for root, dirs, files in os.walk(SOURCE_DIR):
        for file in files:
            if not (file.lower().endswith(".html") and file.lower() != "index.html"):
                continue
            html_path = os.path.join(root, file)
            title = os.path.splitext(file)[0]
            try:
                title = urllib.parse.unquote(title)
            except:
                pass
            safe = safe_filename(title)
            if safe not in existing_docs:
                skipped += 1
                continue
            try:
                with open(html_path, "r", encoding="utf-8") as f:
                    content = f.read()
                final_md = html_to_markdown(content, title)
                if not final_md:
                    continue
                output_path = os.path.join(OUTPUT_DIR, f"{safe}.md")
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(final_md)
                print(f"✅ 已更新：{safe}.md")
                updated += 1
            except Exception as e:
                print(f"⚠️  處理 {file} 時出錯: {e}")
    print(f"\n✅ 全站同步完成！更新 {updated} 個，跳過 {skipped} 個。")

def run_single(page_title):
    safe = safe_filename(page_title)
    output_path = os.path.join(OUTPUT_DIR, f"{safe}.md")
    if not os.path.exists(output_path):
        print(f"NOT_FOUND")
        sys.exit(2)
    print(f"🌐 正在從旭陵維基抓取：{page_title}")
    encoded = urllib.parse.quote(page_title)
    url = f"{WIKI_BASE_URL}/index.php/{encoded}"
    scraper = cloudscraper.create_scraper(
        browser={'browser': 'chrome', 'platform': 'windows', 'desktop': True}
    )
    try:
        response = scraper.get(url, timeout=20)
        if response.status_code != 200:
            print(f"❌ 無法取得頁面，狀態碼：{response.status_code}")
            sys.exit(1)
    except Exception as e:
        print(f"❌ 網路錯誤：{e}")
        sys.exit(1)
    final_md = html_to_markdown(response.text, page_title)
    if not final_md:
        print(f"❌ 無法解析頁面內容")
        sys.exit(1)
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(final_md)
    print(f"✅ 單頁同步完成：{safe}.md")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["overwrite-only", "single", "full"], default="full")
    parser.add_argument("--page", type=str, default="")
    args = parser.parse_args()

    if args.mode == "overwrite-only":
        run_overwrite_only()
    elif args.mode == "single":
        if not args.page:
            print("❌ 單頁模式必須提供 --page 參數")
            sys.exit(1)
        run_single(args.page)
    else:
        if not os.path.exists(SOURCE_DIR):
            print(f"❌ 找不到來源資料夾: {SOURCE_DIR}")
            sys.exit(1)
        if os.path.exists(OUTPUT_DIR):
            print(f"🧹 清理舊的 {OUTPUT_DIR} 資料夾...")
            shutil.rmtree(OUTPUT_DIR)
        os.makedirs(OUTPUT_DIR)
        count = 0
        for root, dirs, files in os.walk(SOURCE_DIR):
            for file in files:
                if file.lower().endswith(".html") and file.lower() != "index.html":
                    html_path = os.path.join(root, file)
                    title = os.path.splitext(file)[0]
                    try:
                        title = urllib.parse.unquote(title)
                    except:
                        pass
                    try:
                        with open(html_path, "r", encoding="utf-8") as f:
                            content = f.read()
                        final_md = html_to_markdown(content, title)
                        if not final_md:
                            continue
                        safe = safe_filename(title)
                        output_path = os.path.join(OUTPUT_DIR, f"{safe}.md")
                        with open(output_path, "w", encoding="utf-8") as f:
                            f.write(final_md)
                        count += 1
                    except Exception as e:
                        print(f"處理 {file} 時出錯: {e}")
        print(f"\n✅ 轉換完成！共生成 {count} 個檔案。")
