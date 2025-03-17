import { SITE, SOCIALS } from "@config";

export const prerender = true;

export async function GET() {
  // Find the email from SOCIALS
  const emailSocial = SOCIALS.find(social => social.name === "Mail");
  const email = emailSocial && emailSocial.href 
    ? emailSocial.href.replace("mailto:", "") 
    : "wongjingping@gmail.com";

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0">
  <channel>
    <title>JP's Audio Library</title>
    <link>${SITE.website}audio_library</link>
    <language>en-us</language>
    <copyright>&#169; ${new Date().getFullYear()} ${SITE.author}</copyright>
    <itunes:subtitle>JP's personal information repository</itunes:subtitle>
    <itunes:author>${SITE.author}</itunes:author>
    <itunes:summary>Various AI-generated podcasts on topics that interest me</itunes:summary>
    <description>Various AI-generated podcasts on topics that interest me</description>
    <itunes:owner>
      <itunes:name>${SITE.author}</itunes:name>
      <itunes:email>${email}</itunes:email>
    </itunes:owner>
    <itunes:image href="${SITE.website}podcast-logo.svg"/>
    <itunes:category text="History"/>
    <itunes:explicit>no</itunes:explicit>
    
    <!-- First Episode -->
    <item>
      <title>Diving into Josephus's Antiquities of the Jews</title>
      <itunes:subtitle>An exploration of Josephus's historical account</itunes:subtitle>
      <itunes:summary>In this episode, we explore Josephus's Antiquities of the Jews, discussing his approach to Jewish history, biblical narratives, and his philosophical interpretations.</itunes:summary>
      <description>In this episode, we explore Josephus's Antiquities of the Jews, discussing his approach to Jewish history, biblical narratives, and his philosophical interpretations.</description>
      <link>${SITE.website}podcast/episode1</link>
      <enclosure url="https://storage.googleapis.com/jp_experiments/podcast_antiquities_of_the_jews.mp3" length="0" type="audio/mpeg"/>
      <pubDate>Mon, 17 Jun 2024 12:00:00 GMT</pubDate>
      <itunes:author>${SITE.author}</itunes:author>
      <itunes:duration>00:25:06</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
      <guid isPermaLink="false">jp-podcast-001</guid>
    </item>
  </channel>
</rss>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
} 