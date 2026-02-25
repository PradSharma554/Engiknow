import * as cheerio from "cheerio";

export const extractTextFromHtml = (html) => {
  const $ = cheerio.load(html);

  // Remove unwanted elements
  $(
    "script, style, noscript, nav, footer, header, aside, .sidebar, .menu, svg, img, iframe",
  ).remove();

  // Replace block elements with line breaks so text doesn't run together
  $("div, p, h1, h2, h3, h4, h5, h6, li, br, hr").each(function () {
    $(this).append(" ");
  });

  // Extract text and condense whitespace
  const text = $("body").text();
  return text.replace(/\s+/g, " ").trim();
};
