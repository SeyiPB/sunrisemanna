import axios from 'axios';
import * as cheerio from 'cheerio';
import { Devotional, ScraperResult } from './types';

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchHtml(url: string): Promise<string> {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.google.com/',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-User': '?1',
        }
    });
    return response.data as string;
}

// 1. My Utmost for His Highest
async function scrapeUtmost(): Promise<ScraperResult> {
    try {
        const url = 'https://utmost.org/';
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);

        const title = $('h1').first().text().trim();
        const contentContainer = $('.elementor-widget-theme-post-content').first();
        const content = contentContainer.text().trim();
        const author = 'Oswald Chambers';

        if (!title) throw new Error('Could not find title');

        return {
            success: true,
            data: {
                source: 'My Utmost for His Highest',
                title,
                date: new Date().toISOString(),
                content: content.substring(0, 500) + '...',
                author,
                url
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 2. Proverbs 31 Ministries
async function scrapeProverbs31(): Promise<ScraperResult> {
    try {
        const url = 'https://proverbs31.org/read/devotions';
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);

        const title = $('h1').first().text().trim();
        const content = $('.entry-content').text().trim() || $('article p').text().trim();

        if (!title) throw new Error('Could not find title');

        return {
            success: true,
            data: {
                source: 'Proverbs 31 Ministries',
                title,
                date: new Date().toISOString(),
                content: content.substring(0, 500) + '...',
                url
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 3. Crosswalk
async function scrapeCrosswalk(): Promise<ScraperResult> {
    try {
        const url = 'https://www.crosswalk.com/devotionals/your-daily-prayer/';
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);

        const title = $('h1').first().text().trim();
        const content = $('.article-content').text().trim() || $('div[itemprop="articleBody"]').text().trim();

        if (!title) throw new Error('Could not find title');

        return {
            success: true,
            data: {
                source: 'Crosswalk',
                title,
                date: new Date().toISOString(),
                content: content.substring(0, 500) + '...',
                url
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 4. BibleGateway (Morning & Evening)
async function scrapeBibleGateway(): Promise<ScraperResult> {
    try {
        const url = 'https://www.biblegateway.com/devotionals/morning-and-evening/today/';
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);

        const title = $('h1').first().text().trim() || 'Morning and Evening';

        // Fallback: Grab all paragraphs in the main column if specific class fails
        let content = $('div.devotional-text').text().trim();

        if (!content) {
            // Try to find the container with the most text
            $('div').each((i, el) => {
                const text = $(el).text().trim();
                if (text.length > content.length && text.length < 10000) { // Avoid huge footer/nav blocks
                    content = text;
                }
            });
        }

        const author = 'Charles Spurgeon';

        if (!content) throw new Error('Could not find content');

        return {
            success: true,
            data: {
                source: 'BibleGateway',
                title,
                date: new Date().toISOString(),
                content: content.substring(0, 500) + '...',
                author,
                url
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 5. Christianity.com
async function scrapeChristianityCom(): Promise<ScraperResult> {
    try {
        // Step 1: Get the main devotionals page
        const mainUrl = 'https://www.christianity.com/devotionals/';
        const mainHtml = await fetchHtml(mainUrl);
        const $main = cheerio.load(mainHtml);

        // Find the first devotional link (adjust selector as needed, usually in a feed)
        // Trying generic article link or specific class
        const firstLink = $main('a[href*="/devotionals/"]').first().attr('href');

        if (!firstLink) throw new Error('Could not find latest devotional link');

        const url = firstLink.startsWith('http') ? firstLink : `https://www.christianity.com${firstLink}`;

        // Step 2: Get the devotional page
        const html = await fetchHtml(url);
        const $ = cheerio.load(html);

        const title = $('h1').first().text().trim();
        const content = $('.article-content').text().trim() || $('div.text-content').text().trim() || $('article').text().trim();

        if (!title) throw new Error('Could not find title');

        return {
            success: true,
            data: {
                source: 'Christianity.com',
                title,
                date: new Date().toISOString(),
                content: content.substring(0, 500) + '...',
                url
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 6. Flatimes (Open Heaven)
async function scrapeFlatimes(): Promise<ScraperResult> {
    try {
        // Step 1: Get the homepage to find the latest Open Heaven link
        const mainUrl = 'https://flatimes.com/';
        const mainHtml = await fetchHtml(mainUrl);
        const $main = cheerio.load(mainHtml);

        // Find the first link containing "open-heaven"
        const link = $main('a[href*="open-heaven-"]').first().attr('href');

        if (!link) throw new Error('Could not find latest Open Heaven link');

        // Step 2: Get the devotional page
        const html = await fetchHtml(link);
        const $ = cheerio.load(html);

        const title = $('h1.entry-title').first().text().trim();

        // Extract full content preserving structure
        const contentParts: string[] = [];

        // Add title as the first line
        contentParts.push(title);

        $('div.entry-content').children().each((i, el) => {
            const $el = $(el);

            // Ignore social share buttons, ads, or related posts
            if ($el.hasClass('sharedaddy') || $el.hasClass('jp-relatedposts')) return;

            // Replace <br> with newlines to fix Hymn formatting
            $el.find('br').replaceWith('\n');

            let text = $el.text().trim();

            // Filter out specific unwanted lines
            if (text === 'Share' || text.startsWith('Also Read') || text.startsWith('Click HERE for the Previous')) return;

            // Stop if we reach the footer section
            if (text.includes('Accessing the Devotional') || text.includes('Flatimes Notice Board')) return false;

            if (text) {
                contentParts.push(text);
            }
        });

        const fullContent = contentParts.join('\n\n');

        // Try to extract scripture for metadata
        const scripture = $('div.entry-content blockquote').first().text().trim() ||
            $('div.entry-content em').first().text().trim();

        if (!title) throw new Error('Could not find title');

        return {
            success: true,
            data: {
                source: 'Flatimes (Open Heaven)',
                title,
                date: new Date().toISOString(),
                content: fullContent,
                scripture,
                url: link
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Main Runner
async function scrapeAll() {
    console.log('Starting scraper...');

    const results = await Promise.all([
        scrapeUtmost(),
        scrapeProverbs31(),
        scrapeCrosswalk(),
        scrapeBibleGateway(),
        scrapeChristianityCom(),
        scrapeFlatimes()
    ]);

    console.log('\n--- Scraper Results ---\n');

    results.forEach(result => {
        if (result.success && result.data) {
            console.log(`✅ ${result.data.source}`);
            console.log(`   Title: ${result.data.title}`);
            console.log(`   Scripture: ${result.data.scripture || 'N/A'}`);
            console.log(`   Preview: ${result.data.content.substring(0, 100).replace(/\n/g, ' ')}...`);
            console.log('-----------------------------------');
        } else {
            console.log(`❌ Error: ${result.error}`);
            console.log('-----------------------------------');
        }
    });
}

scrapeAll();
