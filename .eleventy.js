module.exports = function (eleventyConfig) {
  // Copy images and the Decap CMS admin folder straight through to the built site
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("dateFormat", function (value) {
    var d = value === "now" ? new Date() : new Date(value);
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }).toUpperCase();
  });

  // "stories" collection: every markdown file in src/stories, newest first
  eleventyConfig.addCollection("stories", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/stories/*.md").sort(function (a, b) {
      return b.date - a.date;
    });
  });

  // The single front-page lead: whichever story has featured: true, else the newest
  eleventyConfig.addCollection("leadStory", function (collectionApi) {
    var stories = collectionApi.getFilteredByGlob("src/stories/*.md").sort(function (a, b) {
      return b.date - a.date;
    });
    var featured = stories.find(function (s) { return s.data.featured; }) || stories[0];
    return featured ? [featured] : [];
  });

  // Every story except the lead, for the front-page grid
  eleventyConfig.addCollection("restStories", function (collectionApi) {
    var stories = collectionApi.getFilteredByGlob("src/stories/*.md").sort(function (a, b) {
      return b.date - a.date;
    });
    var featured = stories.find(function (s) { return s.data.featured; }) || stories[0];
    return stories.filter(function (s) { return s !== featured; });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
