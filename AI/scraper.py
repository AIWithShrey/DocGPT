import requests
from bs4 import BeautifulSoup
import html2text
from urllib.parse import urlparse, urljoin
import os
import re

# Define the base URL of the website you want to scrape
BASE_URL = "https://www.tensorflow.org/api_docs"  # Replace with the URL of the website to scrape

# Function to fetch and parse a webpage
def fetch_and_parse(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup
    except requests.exceptions.RequestException as e:
        print(f"Error fetching page {url}: {e}")
        return None

# Function to extract text from a BeautifulSoup object, excluding images and other non-textual content
def extract_text(soup):
    if soup is not None:
        # Convert the HTML to plain text using html2text
        h = html2text.HTML2Text()
        h.ignore_links = True
        h.ignore_images = True
        h.ignore_emphasis = True
        text = h.handle(str(soup))

        # Normalize and clean up the text
        text = re.sub(r'\n+', '\n', text)  # Remove multiple line breaks
        text = text.strip()  # Remove leading/trailing whitespace
        return text
    else:
        return ""

# Function to recursively scrape text from a website and save it to a file
def scrape_website_and_save(url, visited_links=set(), output_file="scraped_text.txt"):
    # Parse the base URL and the current URL
    base_domain = urlparse(BASE_URL).netloc
    current_domain = urlparse(url).netloc

    # Check if the current URL is within the same domain
    if current_domain != base_domain:
        return

    if url not in visited_links:
        visited_links.add(url)
        print(f"Scraping: {url}")

        # Fetch and parse the webpage
        soup = fetch_and_parse(url)

        if soup:
            # Extract text from the current page, excluding images and non-textual content
            text = extract_text(soup)
            if text:
                # Save the extracted text to the output file
                with open(output_file, 'a', encoding='utf-8') as file:
                    file.write(text + '\n')

            # Find all links on the current page and scrape them recursively
            links = soup.find_all('a', href=True)
            for link in links:
                if link['href'].endswith('.pdf'):
                    continue
                next_url = urljoin(url, link['href'])
                scrape_website_and_save(next_url, visited_links, output_file)

# Example usage:
if __name__ == "__main__":
    output_file = "scraped_text.txt"   # The name of the output text file
    scrape_website_and_save(BASE_URL, output_file=output_file)
